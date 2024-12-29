// src/app/api/yfinance/historical/route.ts
import { NextResponse } from 'next/server'
import { spawn } from 'child_process'
import { join } from 'path'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const isin = searchParams.get('isin')

    if (!isin) {
      return NextResponse.json(
        { error: 'ISIN required' }, 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Get absolute path to Python script
    const scriptPath = join(process.cwd(), 'src', 'lib', 'yfinance_historical.py')
    console.log('Executing script:', scriptPath)

    // Use the Python interpreter from the virtual environment
    const pythonPath = join(process.cwd(), '.venv', 'bin', 'python')
    console.log('Using Python interpreter:', pythonPath)

    const pythonProcess = spawn(pythonPath, [scriptPath, isin], {
      env: {
        ...process.env,
        VIRTUAL_ENV: join(process.cwd(), '.venv'),
        PATH: `${join(process.cwd(), '.venv', 'bin')}:${process.env.PATH}`
      }
    })
    
    let dataChunks = ''
    let errorChunks = ''

    pythonProcess.stdout.on('data', (chunk) => {
      dataChunks += chunk.toString()
      console.log('Python stdout:', chunk.toString())
    })

    pythonProcess.stderr.on('data', (chunk) => {
      errorChunks += chunk.toString()
      console.error('Python stderr:', chunk.toString())
    })

    const result = await new Promise((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        console.log('Python process exited with code:', code)
        if (code !== 0) {
          reject(new Error(`Process failed with code ${code}: ${errorChunks}`))
        }
        try {
          const parsedData = JSON.parse(dataChunks)
          resolve(parsedData)
        } catch (e) {
          reject(new Error(`Failed to parse Python output: ${dataChunks}`))
        }
      })
    })

    return NextResponse.json(result, {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: String(error) },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
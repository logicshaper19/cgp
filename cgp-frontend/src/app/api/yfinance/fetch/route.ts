import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isin = searchParams.get('isin');

  if (!isin) {
    return NextResponse.json(
      { error: "ISIN parameter is required" },
      { status: 400 }
    );
  }

  return new Promise((resolve) => {
    exec(
      `/Users/elisha/yfinance/cgp-frontend/.venv/bin/python src/lib/yfinance_wrapper.py ${isin}`,
      (error, stdout, stderr) => {
        if (error) {
          resolve(
            NextResponse.json(
              { error: stderr },
              { status: 500 }
            )
          );
        } else {
          try {
            const result = JSON.parse(stdout);  // Parse the JSON output
            resolve(
              NextResponse.json(result, { status: 200 })
            );
          } catch (e) {
            resolve(
              NextResponse.json(
                { error: "Failed to parse Python output" },
                { status: 500 }
              )
            );
          }
        }
      }
    );
  });
}
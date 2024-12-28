// src/app/api/test-db/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    // Query existing table with proper name
    const { data, error } = await supabase
      .from('financial_products_extended')
      .select(`
        id,
        isin,
        nav_value,
        nav_date,
        sri_rating,
        currency,
        company_name,
        manager_name,
        category,
        is_etf
      `)
      .limit(5)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
      timestamp: new Date().toISOString()
    })

  } catch (err) {
    console.error('Connection error:', err)
    return NextResponse.json({
      error: {
        message: 'Failed to connect to database',
        details: err
      }
    }, { status: 500 })
  }
}
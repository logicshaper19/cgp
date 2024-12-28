// src/app/api/products/search/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {
  try {
    // Verify credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Missing Supabase credentials')
    }

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    
    console.log('Search query:', query)
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

    const { data, error } = await supabase
      .from('financial_products_extended')
      .select(`
        id,
        isin,
        company_name,
        nav_value,
        currency,
        sri_rating
      `)
      .ilike('company_name', `%${query}%`)
      .limit(10)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({
        error: error.message,
        details: error
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      query,
      count: data?.length || 0,
      data
    })

  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}
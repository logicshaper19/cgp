// src/app/api/products/[isin]/route.ts
import { NextResponse } from 'next/server'
import { getProductByIsin } from '@/lib/api-handlers'

export async function GET(
  request: Request,
  { params }: { params: { isin: string } }
) {
  try {
    const product = await getProductByIsin(params.isin)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ data: product })
  } catch (error) {
    console.error('Product fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
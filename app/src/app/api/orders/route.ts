import { NextRequest, NextResponse } from 'next/server'
import { getPool, initDb } from '@/lib/db'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { firstName, lastName, address, city, state, zip, cardLast4, items, total } = body
  const orderNumber = 'PB-' + Date.now().toString(36).toUpperCase()

  try {
    await initDb()
    const db = getPool()
    await db.query(
      `INSERT INTO orders (order_number, first_name, last_name, address, city, state, zip, card_last4, items, total)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [orderNumber, firstName, lastName, address, city, state, zip, cardLast4, JSON.stringify(items), total]
    )
  } catch (err) {
    console.error('DB error (order still confirmed):', err)
  }

  return NextResponse.json({ success: true, orderNumber })
}

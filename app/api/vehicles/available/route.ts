import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
  noStore();
  try {
    const vehicles = await sql`
      SELECT v.* 
      FROM vehicles v
      WHERE NOT EXISTS (
        SELECT 1 
        FROM vehicle_assignments va 
        WHERE va.vehicle_id = v.id 
        AND va.status = 'Activa'
      )
      ORDER BY v.make, v.model
    `;
    return NextResponse.json(vehicles.rows, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
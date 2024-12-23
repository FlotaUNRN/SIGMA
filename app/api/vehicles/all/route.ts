import { Vehicle } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
  noStore();
  try {
    const vehicles = await sql<Vehicle>`
      SELECT 
        id,
        make,
        model,
        year,
        license_plate,
        photo_url
      FROM vehicles
      ORDER BY make, model
    `;
    console.log('Vehicles fetched:', vehicles.rows.length); // Para debug
    return NextResponse.json(vehicles.rows, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
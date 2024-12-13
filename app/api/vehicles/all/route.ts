import { Vehicle } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
  noStore();
  try {
    const vehicles = await sql<Vehicle>`
      SELECT id, make, model, license_plate
      FROM vehicles
      ORDER BY make, model
    `;
    return NextResponse.json(vehicles.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
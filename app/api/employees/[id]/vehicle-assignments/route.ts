import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  noStore();
  try {
    const assignments = await sql`
      SELECT 
        va.*,
        v.make,
        v.model,
        v.license_plate,
        v.photo_url
      FROM vehicle_assignments va
      JOIN vehicles v ON va.vehicle_id = v.id
      WHERE va.employee_id = ${params.id}
      ORDER BY va.start_date DESC
    `;
    return NextResponse.json(assignments.rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener asignaciones de vehículos' },
      { status: 500 }
    );
  }
}
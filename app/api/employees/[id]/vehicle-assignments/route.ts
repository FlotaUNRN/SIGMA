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
      ORDER BY 
        CASE va.status 
          WHEN 'Activa' THEN 1 
          WHEN 'Finalizada' THEN 2 
          ELSE 3 
        END,
        va.start_date DESC
    `;

    const formattedAssignments = assignments.rows.map(assignment => ({
      ...assignment,
      vehicle: {
        make: assignment.make,
        model: assignment.model,
        license_plate: assignment.license_plate,
        photo_url: assignment.photo_url
      }
    }));

    return NextResponse.json(formattedAssignments);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener asignaciones de vehículos' },
      { status: 500 }
    );
  }
}
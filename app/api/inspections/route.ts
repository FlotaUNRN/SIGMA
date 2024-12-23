import { Inspection } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(request: Request) {
  noStore();
  const ITEMS_PER_PAGE = 6;
  const { searchParams } = new URL(request.url);
  const currentPage = searchParams.get('page');
  const query = searchParams.get('query');
  const id = searchParams.get('id');
  const offset = (Number(currentPage) - 1) * ITEMS_PER_PAGE;

  try {
    if (id) {
      const inspection = await sql<Inspection>`SELECT * FROM inspections WHERE id=${id}`;
      return NextResponse.json(inspection.rows[0], { status: 200 });
    } else if (!query && currentPage) {
      const inspections = await sql<Inspection>`
        SELECT 
          i.*,
          v.make, 
          v.model, 
          v.license_plate
        FROM inspections i
        LEFT JOIN vehicles v ON i.vehicle_id = v.id
        ORDER BY i.inspection_date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return NextResponse.json(inspections.rows, { status: 200 });
    } else if (query && currentPage) {
      const inspections = await sql<Inspection>`
        SELECT 
          i.*,
          v.make, 
          v.model, 
          v.license_plate
        FROM inspections i
        LEFT JOIN vehicles v ON i.vehicle_id = v.id
        WHERE
          i.reference_code ILIKE ${`%${query}%`} OR
          i.status ILIKE ${`%${query}%`} OR
          v.license_plate ILIKE ${`%${query}%`} OR
          v.make ILIKE ${`%${query}%`} OR
          v.model ILIKE ${`%${query}%`}
        ORDER BY i.inspection_date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return NextResponse.json(inspections.rows, { status: 200 });
    } else {
      const inspections = await sql<Inspection>`
        SELECT 
          i.*,
          v.make, 
          v.model, 
          v.license_plate
        FROM inspections i
        LEFT JOIN vehicles v ON i.vehicle_id = v.id
        ORDER BY i.inspection_date DESC
      `;
      return NextResponse.json(inspections.rows, { status: 200 });
    }
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Error al obtener las inspecciones' }, { status: 500 });
  }
}

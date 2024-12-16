import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(request: Request) {
  noStore();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const ITEMS_PER_PAGE = 6;

  try {
    if (!query) {
      const data = await sql`SELECT COUNT(*) FROM inspections`;
      const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE);
      return NextResponse.json(totalPages, { status: 200 });
    } else {
      const data = await sql`
        SELECT COUNT(*) 
        FROM inspections i
        LEFT JOIN vehicles v ON i.vehicle_id = v.id
        WHERE
          i.reference_code ILIKE ${`%${query}%`} OR
          i.status ILIKE ${`%${query}%`} OR
          v.license_plate ILIKE ${`%${query}%`} OR
          v.make ILIKE ${`%${query}%`} OR
          v.model ILIKE ${`%${query}%`}
      `;
      const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE);
      return NextResponse.json(totalPages, { status: 200 });
    }
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Error al calcular las páginas' }, { status: 500 });
  }
}
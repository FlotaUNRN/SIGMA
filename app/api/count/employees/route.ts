import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(request: Request) {
  noStore();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  try {
    if (!query) {
      const data = await sql`SELECT COUNT(*) FROM employees`;
      return NextResponse.json(Number(data.rows[0].count), { status: 200 });
    } else {
      const data = await sql`
        SELECT COUNT(*) FROM employees
        WHERE
          first_name ILIKE ${`%${query}%`} OR
          last_name ILIKE ${`%${query}%`} OR
          dni ILIKE ${`%${query}%`} OR
          license_number ILIKE ${`%${query}%`} OR
          email ILIKE ${`%${query}%`} OR
          department ILIKE ${`%${query}%`} OR
          position ILIKE ${`%${query}%`}
      `;
      return NextResponse.json(Number(data.rows[0].count), { status: 200 });
    }
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Error al contar empleados' }, { status: 500 });
  }
}
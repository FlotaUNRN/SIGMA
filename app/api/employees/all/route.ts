import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
  noStore();
  try {
    const employees = await sql`
      SELECT 
        id,
        first_name,
        last_name,
        dni,
        license_number,
        license_type,
        license_expiry_date,
        department,
        position,
        status,
        photo_url
      FROM employees
      ORDER BY first_name, last_name
    `;
    
    return NextResponse.json(employees.rows, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener la lista de empleados' }, 
      { status: 500 }
    );
  }
}
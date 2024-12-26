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
      const employee = await sql`
        SELECT * FROM employees WHERE id=${id}
      `;
      return NextResponse.json(employee.rows[0], { status: 200 });
    } else if (!query && currentPage) {
      const employees = await sql`
        SELECT *
        FROM employees
        ORDER BY created_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return NextResponse.json(employees.rows, { status: 200 });
    } else if (query && currentPage) {
      const employees = await sql`
        SELECT *
        FROM employees
        WHERE
          first_name ILIKE ${`%${query}%`} OR
          last_name ILIKE ${`%${query}%`} OR
          dni ILIKE ${`%${query}%`} OR
          license_number ILIKE ${`%${query}%`} OR
          email ILIKE ${`%${query}%`} OR
          department ILIKE ${`%${query}%`} OR
          position ILIKE ${`%${query}%`}
        ORDER BY created_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return NextResponse.json(employees.rows, { status: 200 });
    } else {
      const employees = await sql`
        SELECT *
        FROM employees
        ORDER BY created_at DESC
      `;
      return NextResponse.json(employees.rows, { status: 200 });
    }
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Error al obtener empleados' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const result = await sql`
      INSERT INTO employees (
        first_name, last_name, dni, license_number, 
        license_type, license_expiry_date, email, phone,
        department, position, status, photo_url
      ) VALUES (
        ${body.first_name}, ${body.last_name}, ${body.dni}, 
        ${body.license_number}, ${body.license_type}, 
        ${body.license_expiry_date}, ${body.email}, ${body.phone},
        ${body.department}, ${body.position}, ${body.status}, 
        ${body.photo_url}
      ) RETURNING *
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error al crear empleado' }, 
      { status: 500 }
    );
  }
}
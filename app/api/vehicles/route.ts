import { Vehicle } from '@/app/lib/definitions';
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
      const vehicle = await sql<Vehicle>`SELECT * FROM vehicles WHERE id=${id}`;
      return NextResponse.json(vehicle.rows[0], { status: 200 });
    } else if (!query && currentPage) {
      const vehicles = await sql<Vehicle>`
        SELECT *
        FROM (
          SELECT
            id,
            vin,
            make,
            model,
            year,
            color,
            license_plate,
            photo_url
          FROM vehicles
        ) AS subquery
        ORDER BY id DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return NextResponse.json(vehicles.rows, { status: 200 });
    } else if (query && currentPage) {
      const vehicles = await sql<Vehicle>`
        SELECT *
        FROM (
          SELECT
            id,
            vin,
            make,
            model,
            year,
            color,
            license_plate,
            photo_url
          FROM vehicles
        ) AS subquery
        WHERE
            vin ILIKE ${`%${query}%`} OR
            make ILIKE ${`%${query}%`} OR
            model ILIKE ${`%${query}%`} OR
            year::text ILIKE ${`%${query}%`} OR
            color ILIKE ${`%${query}%`} OR
            license_plate ILIKE ${`%${query}%`}
        ORDER BY id DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return NextResponse.json(vehicles.rows, { status: 200 });
    } else if (query && !currentPage) {
      const vehicles = await sql<Vehicle>`
        SELECT *
        FROM (
          SELECT
            id,
            vin,
            make,
            model,
            year,
            color,
            license_plate,
            photo_url
          FROM vehicles
        ) AS subquery
        WHERE
            vin ILIKE ${`%${query}%`} OR
            make ILIKE ${`%${query}%`} OR
            model ILIKE ${`%${query}%`} OR
            year::text ILIKE ${`%${query}%`} OR
            color ILIKE ${`%${query}%`} OR
            license_plate ILIKE ${`%${query}%`}
        ORDER BY id DESC
      `;
      return NextResponse.json(vehicles.rows, { status: 200 });
    } else {
      const vehicles = await sql<Vehicle>`
    SELECT
        id,
        vin,
        make,
        model,
        year,
        color,
        license_plate,
        photo_url
    FROM vehicles
    ORDER BY id DESC
    `;
      return NextResponse.json(vehicles.rows, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

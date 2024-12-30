import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await sql`
      DELETE FROM vehicle_assignments 
      WHERE id = ${params.id}
    `;
    
    return NextResponse.json({ message: 'Asignación eliminada con éxito' });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la asignación' },
      { status: 500 }
    );
  }
}
/* eslint-disable indent */
'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { sql } from '@vercel/postgres';

// Autenticación de usuario
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales invalidas';
        default:
          return 'Algo salió mal :(';
      }
    }
    throw error;
  }
}

const VehicleFormSchema = z.object({
  id: z.string(),
  vin: z.string().min(1, 'El VIN es requerido'),
  make: z.string().min(1, 'La marca es requerida'),
  model: z.string().min(1, 'El modelo es requerido'),
  year: z.string().min(1, 'El año es requerido'),
  color: z.string().min(1, 'El color es requerido'),
  license_plate: z.string().min(1, 'La patente es requerida'),
  photo_url: z.string().min(1, 'La foto es requerida'),
});

const CreateVehicle = VehicleFormSchema.omit({ id: true });

export async function createVehicle(formData: FormData): Promise<string> {
  const validatedFields = CreateVehicle.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return Promise.reject({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan datos. Error al crear vehicle.',
    });
  }
  const { vin, make, model, year, color, license_plate, photo_url } =
    validatedFields.data;

  try {
    const result = await sql`
      INSERT INTO vehicles (license_plate, make, model, year, vin, color, photo_url)
      VALUES (${license_plate}, ${make}, ${model}, ${year}, ${vin}, ${color}, ${photo_url})
  `;

    if (result.rows[0].result === 1) {
      return Promise.reject({ message: 'El vehículo ya existe.' });
    } else {
      revalidatePath('/dashboard/vehicles');
      return 'Vehículo creado con éxito';
    }
  } catch (error) {
    revalidatePath('/dashboard/vehicles');
    return Promise.reject({
      message: 'Error en la base de datos: No se pudo crear el vehículo.',
    });
  }
}

export async function updateVehicle(
  id: string,
  formData: FormData,
): Promise<string> {
  const validatedFields = VehicleFormSchema.safeParse({
    vin: formData.get('vin'),
    make: formData.get('make'),
    model: formData.get('model'),
    year: formData.get('year'),
    color: formData.get('color'),
    license_plate: formData.get('license_plate'),
    photo_url: formData.get('photo_url'),
  });

  if (!validatedFields.success) {
    return Promise.reject({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan datos. Error al actualizar el vehículo.',
    });
  }

  const { vin, make, model, year, color, license_plate, photo_url } =
    validatedFields.data;

  try {
    await sql`
      UPDATE vehicles
      SET license_plate = ${license_plate},
          make = ${make},
          model = ${model},
          year = ${year},
          vin = ${vin},
          color = ${color},
          photo_url = ${photo_url}
      WHERE id = ${id}
    `;
    revalidatePath(`/dashboard/vehicles/${id}`);
    return 'Vehículo actualizado con éxito';
  } catch (error) {
    return Promise.reject({
      message: 'Error en la base de datos: No se pudo actualizar el vehículo.',
    });
  }
}

export async function deleteVehicle(id: string): Promise<{ message: string }> {
  try {
    await sql`DELETE FROM vehicles WHERE id = ${id}`;
    revalidatePath('/dashboard/vehicles');
    return { message: 'Vehículo eliminado con éxito.' };
  } catch (error) {
    return {
      message: 'Error en la base de datos: No se pudo eliminar el vehículo.',
    };
  }
}

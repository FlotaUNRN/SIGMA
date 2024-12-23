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

const InspectionFormSchema = z.object({
  id: z.string(),
  vehicle_id: z.string(),
  reference_code: z.string().min(1, 'El código de referencia es requerido'),
  inspection_date: z.string().min(1, 'La fecha es requerida'),
  odometer_reading: z.preprocess(
    (val) => Number(val), // convertir a número
    z.number().min(0, 'La lectura del odómetro debe ser positiva')
  ),
  status: z.enum(['Completado', 'Pendiente', 'En Proceso']),
  front_image_url: z.string().optional(),
  driver_side_image_url: z.string().optional(),
  passenger_side_image_url: z.string().optional(),
  back_image_url: z.string().optional(),
  dashboard_alerts: z.array(z.string()).optional(),
  engine_oil_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura', 'Lleno']),
  transmission_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura', 'Lleno']),
  differential_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura', 'Lleno']),
  coolant_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura', 'Lleno']),
  brake_fluid_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura', 'Lleno']),
  power_steering_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura', 'Lleno']),
  wiper_fluid_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura', 'Lleno']),
  steering_hose_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura']),
  heater_hose_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura']),
  serpentine_belt_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura']),
  alternator_belt_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura']),
  air_filter_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura']),
  fuel_filter_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura']),
  oil_filter_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura']),
  front_left_tire_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura']),
  front_right_tire_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura']),
  rear_left_tire_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura']),
  rear_right_tire_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura']),
  emergency_brake_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura']),
  front_wiper_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura']),
  rear_wiper_status: z.enum(['OK', 'Requiere Atención', 'Atención Futura']),
  notes: z.string().optional(),
});

const CreateInspection = InspectionFormSchema.omit({ id: true });

export async function createInspection(formData: FormData): Promise<string> {
  const validatedFields = CreateInspection.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return Promise.reject({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan datos. Error al crear inspección.',
    });
  }

  try {
    await sql`
      INSERT INTO inspections (
        vehicle_id, reference_code, inspection_date, odometer_reading, status,
        engine_oil_status, transmission_status, differential_status, coolant_status,
        brake_fluid_status, power_steering_status, wiper_fluid_status, steering_hose_status,
        heater_hose_status, serpentine_belt_status, alternator_belt_status, air_filter_status,
        fuel_filter_status, oil_filter_status, front_left_tire_status, front_right_tire_status,
        rear_left_tire_status, rear_right_tire_status, emergency_brake_status, front_wiper_status,
        rear_wiper_status, notes
      ) VALUES (
        ${validatedFields.data.vehicle_id}, ${validatedFields.data.reference_code}, ${validatedFields.data.inspection_date},
        ${validatedFields.data.odometer_reading}, ${validatedFields.data.status}, ${validatedFields.data.engine_oil_status},
        ${validatedFields.data.transmission_status}, ${validatedFields.data.differential_status}, ${validatedFields.data.coolant_status},
        ${validatedFields.data.brake_fluid_status}, ${validatedFields.data.power_steering_status}, ${validatedFields.data.wiper_fluid_status},
        ${validatedFields.data.steering_hose_status}, ${validatedFields.data.heater_hose_status}, ${validatedFields.data.serpentine_belt_status},
        ${validatedFields.data.alternator_belt_status}, ${validatedFields.data.air_filter_status}, ${validatedFields.data.fuel_filter_status},
        ${validatedFields.data.oil_filter_status}, ${validatedFields.data.front_left_tire_status}, ${validatedFields.data.front_right_tire_status},
        ${validatedFields.data.rear_left_tire_status}, ${validatedFields.data.rear_right_tire_status}, ${validatedFields.data.emergency_brake_status},
        ${validatedFields.data.front_wiper_status}, ${validatedFields.data.rear_wiper_status}, ${validatedFields.data.notes}
      )
    `;
    revalidatePath('/dashboard/inspections');
    return 'Inspección creada con éxito';
  } catch (error) {
    return Promise.reject({
      message: 'Error en la base de datos: No se pudo crear la inspección.',
    });
  }
}

export async function updateInspection(
  id: string,
  formData: FormData,
): Promise<string> {
  const validatedFields = InspectionFormSchema.safeParse({
    id,
    ...Object.fromEntries(formData.entries()),
  });

  if (!validatedFields.success) {
    return Promise.reject({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan datos. Error al actualizar la inspección.',
    });
  }

  const { 
    vehicle_id,
    reference_code,
    inspection_date,
    odometer_reading,
    status,
    engine_oil_status,
    transmission_status,
    differential_status,
    coolant_status,
    brake_fluid_status,
    power_steering_status,
    wiper_fluid_status,
    steering_hose_status,
    heater_hose_status,
    serpentine_belt_status,
    alternator_belt_status,
    air_filter_status,
    fuel_filter_status,
    oil_filter_status,
    front_left_tire_status,
    front_right_tire_status,
    rear_left_tire_status,
    rear_right_tire_status,
    emergency_brake_status,
    front_wiper_status,
    rear_wiper_status,
    notes
  } = validatedFields.data;

  try {
    await sql`
      UPDATE inspections
      SET 
        vehicle_id = ${vehicle_id},
        reference_code = ${reference_code},
        inspection_date = ${inspection_date},
        odometer_reading = ${odometer_reading},
        status = ${status},
        engine_oil_status = ${engine_oil_status},
        transmission_status = ${transmission_status},
        differential_status = ${differential_status},
        coolant_status = ${coolant_status},
        brake_fluid_status = ${brake_fluid_status},
        power_steering_status = ${power_steering_status},
        wiper_fluid_status = ${wiper_fluid_status},
        steering_hose_status = ${steering_hose_status},
        heater_hose_status = ${heater_hose_status},
        serpentine_belt_status = ${serpentine_belt_status},
        alternator_belt_status = ${alternator_belt_status},
        air_filter_status = ${air_filter_status},
        fuel_filter_status = ${fuel_filter_status},
        oil_filter_status = ${oil_filter_status},
        front_left_tire_status = ${front_left_tire_status},
        front_right_tire_status = ${front_right_tire_status},
        rear_left_tire_status = ${rear_left_tire_status},
        rear_right_tire_status = ${rear_right_tire_status},
        emergency_brake_status = ${emergency_brake_status},
        front_wiper_status = ${front_wiper_status},
        rear_wiper_status = ${rear_wiper_status},
        notes = ${notes}
      WHERE id = ${id}
    `;
    revalidatePath(`/dashboard/inspections/${id}`);
    return 'Inspección actualizada con éxito';
  } catch (error) {
    return Promise.reject({
      message: 'Error en la base de datos: No se pudo actualizar la inspección.',
    });
  }
}

export async function deleteInspection(id: string): Promise<{ message: string }> {
  try {
    await sql`DELETE FROM inspections WHERE id = ${id}`;
    revalidatePath('/dashboard/inspections');
    return { message: 'Inspección eliminada con éxito.' };
  } catch (error) {
    return {
      message: 'Error en la base de datos: No se pudo eliminar la inspección.',
    };
  }
}
'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { sql } from '@vercel/postgres';

// Authentication
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

// Vehicle actions
const VehicleSchema = z.object({
  id: z.string(),
  vin: z.string().min(1, 'El VIN es requerido'),
  make: z.string().min(1, 'La marca es requerida'),
  model: z.string().min(1, 'El modelo es requerido'),
  year: z.string().min(1, 'El año es requerido'),
  color: z.string().min(1, 'El color es requerido'),
  license_plate: z.string().min(1, 'La patente es requerida'),
  photo_url: z.string().min(1, 'La foto es requerida'),
});

const CreateVehicle = VehicleSchema.omit({ id: true });

export async function createVehicle(formData: FormData): Promise<string> {
  const validatedFields = CreateVehicle.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return Promise.reject({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan datos. Error al crear vehículo.',
    });
  }

  const { vin, make, model, year, color, license_plate, photo_url } = validatedFields.data;

  try {
    await sql`
      INSERT INTO vehicles (license_plate, make, model, year, vin, color, photo_url)
      VALUES (${license_plate}, ${make}, ${model}, ${year}, ${vin}, ${color}, ${photo_url})
    `;
    revalidatePath('/dashboard/vehicles');
    return 'Vehículo creado con éxito';
  } catch (error) {
    return Promise.reject({
      message: 'Error en la base de datos: No se pudo crear el vehículo.',
    });
  }
}

export async function updateVehicle(id: string, formData: FormData): Promise<string> {
  const validatedFields = VehicleSchema.safeParse({
    id,
    ...Object.fromEntries(formData.entries()),
  });

  if (!validatedFields.success) {
    return Promise.reject({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan datos. Error al actualizar el vehículo.',
    });
  }

  const { vin, make, model, year, color, license_plate, photo_url } = validatedFields.data;

  try {
    await sql`
      UPDATE vehicles
      SET 
        license_plate = ${license_plate},
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

// Employee actions
const EmployeeSchema = z.object({
  id: z.string().optional(),
  first_name: z.string().min(1, 'El nombre es requerido'),
  last_name: z.string().min(1, 'El apellido es requerido'),
  dni: z.string().min(1, 'El DNI es requerido'),
  license_number: z.string().min(1, 'El número de licencia es requerido'),
  license_type: z.string().min(1, 'El tipo de licencia es requerido'),
  license_expiry_date: z.string().min(1, 'La fecha de vencimiento es requerida'),
  email: z.string().email('Email inválido').optional().nullable(),
  phone: z.string().optional().nullable(),
  department: z.string().min(1, 'El departamento es requerido'),
  position: z.string().min(1, 'El cargo es requerido'),
  status: z.enum(['Activo', 'Inactivo', 'Licencia']),
  photo_url: z.string().optional().nullable(),
});

export async function createEmployee(formData: FormData): Promise<string> {
  const validatedFields = EmployeeSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return Promise.reject({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan datos. Error al crear empleado.',
    });
  }

  try {
    await sql`
      INSERT INTO employees (
        first_name, last_name, dni, license_number, 
        license_type, license_expiry_date, email, phone,
        department, position, status, photo_url
      ) VALUES (
        ${validatedFields.data.first_name},
        ${validatedFields.data.last_name},
        ${validatedFields.data.dni},
        ${validatedFields.data.license_number},
        ${validatedFields.data.license_type},
        ${validatedFields.data.license_expiry_date},
        ${validatedFields.data.email},
        ${validatedFields.data.phone},
        ${validatedFields.data.department},
        ${validatedFields.data.position},
        ${validatedFields.data.status},
        ${validatedFields.data.photo_url}
      )
    `;
    revalidatePath('/dashboard/employees');
    return 'Empleado creado con éxito';
  } catch (error) {
    return Promise.reject({
      message: 'Error en la base de datos: No se pudo crear el empleado.',
    });
  }
}

export async function updateEmployee(id: string, formData: FormData): Promise<string> {
  const validatedFields = EmployeeSchema.safeParse({
    id,
    ...Object.fromEntries(formData.entries()),
  });

  if (!validatedFields.success) {
    return Promise.reject({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan datos. Error al actualizar el empleado.',
    });
  }

  try {
    await sql`
      UPDATE employees
      SET 
        first_name = ${validatedFields.data.first_name},
        last_name = ${validatedFields.data.last_name},
        dni = ${validatedFields.data.dni},
        license_number = ${validatedFields.data.license_number},
        license_type = ${validatedFields.data.license_type},
        license_expiry_date = ${validatedFields.data.license_expiry_date},
        email = ${validatedFields.data.email},
        phone = ${validatedFields.data.phone},
        department = ${validatedFields.data.department},
        position = ${validatedFields.data.position},
        status = ${validatedFields.data.status},
        photo_url = ${validatedFields.data.photo_url}
      WHERE id = ${id}
    `;
    revalidatePath(`/dashboard/employees/${id}`);
    return 'Empleado actualizado con éxito';
  } catch (error) {
    return Promise.reject({
      message: 'Error en la base de datos: No se pudo actualizar el empleado.',
    });
  }
}

export async function deleteEmployee(id: string): Promise<{ message: string }> {
  try {
    await sql`DELETE FROM employees WHERE id = ${id}`;
    revalidatePath('/dashboard/employees');
    return { message: 'Empleado eliminado con éxito.' };
  } catch (error) {
    return {
      message: 'Error en la base de datos: No se pudo eliminar el empleado.',
    };
  }
}

// Inspection actions
const InspectionSchema = z.object({
  id: z.string().optional(),
  vehicle_id: z.string(),
  reference_code: z.string().min(1, 'El código de referencia es requerido'),
  inspection_date: z.string().min(1, 'La fecha es requerida'),
  odometer_reading: z.preprocess(
    (val) => Number(val),
    z.number().min(0, 'La lectura del odómetro debe ser positiva')
  ),
  status: z.enum(['Completado', 'Pendiente', 'En Proceso']),
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

export async function createInspection(formData: FormData): Promise<string> {
  const validatedFields = InspectionSchema.safeParse(Object.fromEntries(formData.entries()));

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
        ${validatedFields.data.vehicle_id},
        ${validatedFields.data.reference_code},
        ${validatedFields.data.inspection_date},
        ${validatedFields.data.odometer_reading},
        ${validatedFields.data.status},
        ${validatedFields.data.engine_oil_status},
        ${validatedFields.data.transmission_status},
        ${validatedFields.data.differential_status},
        ${validatedFields.data.coolant_status},
        ${validatedFields.data.brake_fluid_status},
        ${validatedFields.data.power_steering_status},
        ${validatedFields.data.wiper_fluid_status},
        ${validatedFields.data.steering_hose_status},
        ${validatedFields.data.heater_hose_status},
        ${validatedFields.data.serpentine_belt_status},
        ${validatedFields.data.alternator_belt_status},
        ${validatedFields.data.air_filter_status},
        ${validatedFields.data.fuel_filter_status},
        ${validatedFields.data.oil_filter_status},
        ${validatedFields.data.front_left_tire_status},
        ${validatedFields.data.front_right_tire_status},
        ${validatedFields.data.rear_left_tire_status},
        ${validatedFields.data.rear_right_tire_status},
        ${validatedFields.data.emergency_brake_status},
        ${validatedFields.data.front_wiper_status},
        ${validatedFields.data.rear_wiper_status},
        ${validatedFields.data.notes}
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
  const validatedFields = InspectionSchema.safeParse({
    id,
    ...Object.fromEntries(formData.entries()),
  });

  if (!validatedFields.success) {
    return Promise.reject({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan datos. Error al actualizar la inspección.',
    });
  }

  try {
    await sql`
      UPDATE inspections
      SET 
        vehicle_id = ${validatedFields.data.vehicle_id},
        reference_code = ${validatedFields.data.reference_code},
        inspection_date = ${validatedFields.data.inspection_date},
        odometer_reading = ${validatedFields.data.odometer_reading},
        status = ${validatedFields.data.status},
        engine_oil_status = ${validatedFields.data.engine_oil_status},
        transmission_status = ${validatedFields.data.transmission_status},
        differential_status = ${validatedFields.data.differential_status},
        coolant_status = ${validatedFields.data.coolant_status},
        brake_fluid_status = ${validatedFields.data.brake_fluid_status},
        power_steering_status = ${validatedFields.data.power_steering_status},
        wiper_fluid_status = ${validatedFields.data.wiper_fluid_status},
        steering_hose_status = ${validatedFields.data.steering_hose_status},
        heater_hose_status = ${validatedFields.data.heater_hose_status},
        serpentine_belt_status = ${validatedFields.data.serpentine_belt_status},
        alternator_belt_status = ${validatedFields.data.alternator_belt_status},
        air_filter_status = ${validatedFields.data.air_filter_status},
        fuel_filter_status = ${validatedFields.data.fuel_filter_status},
        oil_filter_status = ${validatedFields.data.oil_filter_status},
        front_left_tire_status = ${validatedFields.data.front_left_tire_status},
        front_right_tire_status = ${validatedFields.data.front_right_tire_status},
        rear_left_tire_status = ${validatedFields.data.rear_left_tire_status},
        rear_right_tire_status = ${validatedFields.data.rear_right_tire_status},
        emergency_brake_status = ${validatedFields.data.emergency_brake_status},
        front_wiper_status = ${validatedFields.data.front_wiper_status},
        rear_wiper_status = ${validatedFields.data.rear_wiper_status},
        notes = ${validatedFields.data.notes}
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

// Vehicle Assignment actions
const VehicleAssignmentSchema = z.object({
  vehicle_id: z.string().min(1, 'El vehículo es requerido'),
  employee_id: z.string().min(1, 'El empleado es requerido'),
  start_date: z.string().min(1, 'La fecha de inicio es requerida'),
  end_date: z.string().optional(),
  status: z.enum(['Activa', 'Finalizada', 'Cancelada']),
  notes: z.string().optional()
});

export async function createVehicleAssignment(formData: FormData): Promise<string> {
  const validatedFields = VehicleAssignmentSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return Promise.reject({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan datos. Error al crear asignación.',
    });
  }

  try {
    await sql`
      INSERT INTO vehicle_assignments (
        vehicle_id, employee_id, start_date, end_date, status, notes
      ) VALUES (
        ${validatedFields.data.vehicle_id},
        ${validatedFields.data.employee_id},
        ${validatedFields.data.start_date},
        ${validatedFields.data.end_date || null},
        ${validatedFields.data.status},
        ${validatedFields.data.notes || null}
      )
    `;
    revalidatePath('/dashboard/employees');
    return 'Asignación creada con éxito';
  } catch (error) {
    return Promise.reject({
      message: 'Error en la base de datos: No se pudo crear la asignación.',
    });
  }
}

export async function updateVehicleAssignment(
  id: string,
  formData: FormData
): Promise<string> {
  const validatedFields = VehicleAssignmentSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return Promise.reject({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan datos. Error al actualizar asignación.',
    });
  }

  try {
    await sql`
      UPDATE vehicle_assignments
      SET 
        vehicle_id = ${validatedFields.data.vehicle_id},
        employee_id = ${validatedFields.data.employee_id},
        start_date = ${validatedFields.data.start_date},
        end_date = ${validatedFields.data.end_date || null},
        status = ${validatedFields.data.status},
        notes = ${validatedFields.data.notes || null}
      WHERE id = ${id}
    `;
    revalidatePath('/dashboard/employees');
    return 'Asignación actualizada con éxito';
  } catch (error) {
    return Promise.reject({
      message: 'Error en la base de datos: No se pudo actualizar la asignación.',
    });
  }
}

export async function deleteVehicleAssignment(id: string): Promise<{ message: string }> {
  try {
    await sql`DELETE FROM vehicle_assignments WHERE id = ${id}`;
    revalidatePath('/dashboard/employees');
    return { message: 'Asignación eliminada con éxito.' };
  } catch (error) {
    return {
      message: 'Error en la base de datos: No se pudo eliminar la asignación.',
    };
  }
}
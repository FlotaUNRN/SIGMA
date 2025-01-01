import React, { useState } from 'react';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { Employee } from '@/app/lib/definitions';
import { updateEmployee } from '@/app/lib/actions';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface EmployeeEditFormProps {
  employee: Employee;
  onClose: () => void;
  onSuccess: () => void;
}

export function EmployeeEditForm({ employee, onClose, onSuccess }: EmployeeEditFormProps) {
  const [formData, setFormData] = useState({
    id: employee.id,
    first_name: employee.first_name,
    last_name: employee.last_name,
    dni: employee.dni,
    license_number: employee.license_number,
    license_type: employee.license_type,
    license_expiry_date: format(new Date(employee.license_expiry_date), 'yyyy-MM-dd'),
    email: employee.email || '',
    phone: employee.phone || '',
    department: employee.department,
    position: employee.position,
    status: employee.status,
    photo_url: employee.photo_url || ''
  });

  const licenseTypes = ['A', 'B', 'C', 'D', 'E'];
  const departments = ['Operaciones', 'Mantenimiento', 'Administrativo'];
  const positions = ['Conductor', 'Mecánico', 'Supervisor', 'Administrativo'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      await updateEmployee(employee.id, form);
      toast.success('Empleado actualizado con éxito');
      onSuccess();
    } catch (error) {
      toast.error('Error al actualizar empleado');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 rounded-lg bg-lightPaper p-6 shadow-xl dark:bg-darkPaper">
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Input
            label="Nombre"
            name="first_name"
            value={formData.first_name}
            onChange={(e) => setFormData({...formData, first_name: e.target.value})}
            variant="bordered"
            labelPlacement="outside"
            placeholder=" "
            isRequired
            classNames={{
              label: 'text-default-600 font-normal',
              input: 'font-normal'
            }}
          />

          <Input
            label="Apellido"
            name="last_name"
            value={formData.last_name}
            onChange={(e) => setFormData({...formData, last_name: e.target.value})}
            variant="bordered"
            labelPlacement="outside"
            placeholder=" "
            isRequired
            classNames={{
              label: 'text-default-600 font-normal',
              input: 'font-normal'
            }}
          />

          <Input
            label="DNI"
            name="dni"
            value={formData.dni}
            onChange={(e) => setFormData({...formData, dni: e.target.value})}
            variant="bordered"
            labelPlacement="outside"
            placeholder=" "
            isRequired
            classNames={{
              label: 'text-default-600 font-normal',
              input: 'font-normal'
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Input
            label="Número de Licencia"
            name="license_number"
            value={formData.license_number}
            onChange={(e) => setFormData({...formData, license_number: e.target.value})}
            variant="bordered"
            labelPlacement="outside"
            placeholder=" "
            isRequired
            classNames={{
              label: 'text-default-600 font-normal',
              input: 'font-normal'
            }}
          />

          <Select
            label="Tipo de Licencia"
            name="license_type"
            selectedKeys={[formData.license_type]}
            onChange={(e) => setFormData({...formData, license_type: e.target.value})}
            variant="bordered"
            labelPlacement="outside"
            placeholder="Seleccionar tipo"
            isRequired
            classNames={{
              label: 'text-default-600 font-normal',
              value: 'font-normal'
            }}
          >
            {licenseTypes.map((type) => (
              <SelectItem key={type} value={type}>
                Clase {type}
              </SelectItem>
            ))}
          </Select>

          <Input
            type="date"
            label="Vencimiento de Licencia"
            name="license_expiry_date"
            value={formData.license_expiry_date}
            onChange={(e) => setFormData({...formData, license_expiry_date: e.target.value})}
            variant="bordered"
            labelPlacement="outside"
            isRequired
            classNames={{
              label: 'text-default-600 font-normal',
              input: 'font-normal'
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Input
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            variant="bordered"
            labelPlacement="outside"
            placeholder=" "
            classNames={{
              label: 'text-default-600 font-normal',
              input: 'font-normal'
            }}
          />

          <Input
            label="Teléfono"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            variant="bordered"
            labelPlacement="outside"
            placeholder=" "
            classNames={{
              label: 'text-default-600 font-normal',
              input: 'font-normal'
            }}
          />

          <Input
            label="URL de Foto"
            name="photo_url"
            value={formData.photo_url}
            onChange={(e) => setFormData({...formData, photo_url: e.target.value})}
            variant="bordered"
            labelPlacement="outside"
            placeholder=" "
            classNames={{
              label: 'text-default-600 font-normal',
              input: 'font-normal'
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Select
            label="Departamento"
            name="department"
            selectedKeys={[formData.department]}
            onChange={(e) => setFormData({...formData, department: e.target.value})}
            variant="bordered"
            labelPlacement="outside"
            placeholder="Seleccionar departamento"
            isRequired
            classNames={{
              label: 'text-default-600 font-normal',
              value: 'font-normal'
            }}
          >
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Cargo"
            name="position"
            selectedKeys={[formData.position]}
            onChange={(e) => setFormData({...formData, position: e.target.value})}
            variant="bordered"
            labelPlacement="outside"
            placeholder="Seleccionar cargo"
            isRequired
            classNames={{
              label: 'text-default-600 font-normal',
              value: 'font-normal'
            }}
          >
            {positions.map((pos) => (
              <SelectItem key={pos} value={pos}>
                {pos}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Estado"
            name="status"
            selectedKeys={[formData.status]}
            onChange={(e) => setFormData({...formData, status: e.target.value as Employee['status']})}
            variant="bordered"
            labelPlacement="outside"
            placeholder="Seleccionar estado"
            isRequired
            classNames={{
              label: 'text-default-600 font-normal',
              value: 'font-normal'
            }}
          >
            <SelectItem key="Activo" value="Activo">Activo</SelectItem>
            <SelectItem key="Inactivo" value="Inactivo">Inactivo</SelectItem>
            <SelectItem key="Licencia" value="Licencia">Licencia</SelectItem>
          </Select>
        </div>
      </div>

      <div className="flex items-end justify-end pt-6">
        <div className="ml-2 flex flex-col gap-1 md:flex-row">
          <Button
            size="sm"
            color="success"
            variant="bordered"
            type="submit"
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            }
          />
          <Button
            size="sm"
            color="danger"
            variant="bordered"
            onClick={onClose}
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            }
          />
        </div>
      </div>
    </form>
  );
}
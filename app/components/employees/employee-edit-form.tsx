'use client';

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
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-lightPaper p-6 shadow-xl dark:bg-darkPaper">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Nombre"
          value={formData.first_name}
          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
          required
        />
        <Input
          label="Apellido"
          value={formData.last_name}
          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
          required
        />
        <Input
          label="DNI"
          value={formData.dni}
          onChange={(e) => setFormData({...formData, dni: e.target.value})}
          required
        />
        <Input
          label="Número de Licencia"
          value={formData.license_number}
          onChange={(e) => setFormData({...formData, license_number: e.target.value})}
          required
        />
        <Select
          label="Tipo de Licencia"
          selectedKeys={[formData.license_type]}
          onChange={(e) => setFormData({...formData, license_type: e.target.value})}
          required
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
          value={formData.license_expiry_date}
          onChange={(e) => setFormData({...formData, license_expiry_date: e.target.value})}
          required
        />
        <Input
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <Input
          label="Teléfono"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
        <Select
          label="Departamento"
          selectedKeys={[formData.department]}
          onChange={(e) => setFormData({...formData, department: e.target.value})}
          required
        >
          {departments.map((dept) => (
            <SelectItem key={dept} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Cargo"
          selectedKeys={[formData.position]}
          onChange={(e) => setFormData({...formData, position: e.target.value})}
          required
        >
          {positions.map((pos) => (
            <SelectItem key={pos} value={pos}>
              {pos}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Estado"
          selectedKeys={[formData.status]}
          onChange={(e) => setFormData({...formData, status: e.target.value as Employee['status']})}
          required
        >
          <SelectItem key="Activo" value="Activo">Activo</SelectItem>
          <SelectItem key="Inactivo" value="Inactivo">Inactivo</SelectItem>
          <SelectItem key="Licencia" value="Licencia">Licencia</SelectItem>
        </Select>
        <Input
          label="URL de Foto"
          value={formData.photo_url}
          onChange={(e) => setFormData({...formData, photo_url: e.target.value})}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button color="danger" variant="light" onClick={onClose}>
          Cancelar
        </Button>
        <Button color="success" type="submit">
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
}
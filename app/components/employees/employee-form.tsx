import React, { useState } from 'react';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';

interface EmployeeData {
  first_name: string;
  last_name: string;
  dni: string;
  license_number: string;
  license_type: string;
  license_expiry_date: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: string;
  photo_url: string;
}

export function EmployeeForm({ 
  onSubmit, 
  onCancel 
}: { 
  onSubmit: (data: EmployeeData) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    dni: '',
    license_number: '',
    license_type: '',
    license_expiry_date: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    status: 'Activo',
    photo_url: ''
  });

  const licenseTypes = [
    { key: 'A', label: 'Clase A' },
    { key: 'B', label: 'Clase B' },
    { key: 'C', label: 'Clase C' },
    { key: 'D', label: 'Clase D' },
    { key: 'E', label: 'Clase E' }
  ];

  const departments = [
    { key: 'Operaciones', label: 'Operaciones' },
    { key: 'Mantenimiento', label: 'Mantenimiento' },
    { key: 'Administrativo', label: 'Administrativo' }
  ];

  const positions = [
    { key: 'Conductor', label: 'Conductor' },
    { key: 'Mecánico', label: 'Mecánico' },
    { key: 'Supervisor', label: 'Supervisor' },
    { key: 'Administrativo', label: 'Administrativo' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const commonClassNames = {
    base: "max-w-full",
    label: "pb-1",
    inputWrapper: "pb-0"
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-lightPaper p-6 shadow-xl dark:bg-darkPaper">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Nombre"
          labelPlacement="outside"
          value={formData.first_name}
          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
          required
          isRequired
          classNames={commonClassNames}
        />
        <Input
          label="Apellido"
          labelPlacement="outside"
          value={formData.last_name}
          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
          required
          isRequired
          classNames={commonClassNames}
        />
        <Input
          label="DNI"
          labelPlacement="outside"
          value={formData.dni}
          onChange={(e) => setFormData({...formData, dni: e.target.value})}
          required
          isRequired
          classNames={commonClassNames}
        />
        <Input
          label="Número de Licencia"
          labelPlacement="outside"
          value={formData.license_number}
          onChange={(e) => setFormData({...formData, license_number: e.target.value})}
          required
          isRequired
          classNames={commonClassNames}
        />
        <Select
          label="Tipo de Licencia"
          labelPlacement="outside"
          value={formData.license_type}
          onChange={(e) => setFormData({...formData, license_type: e.target.value})}
          required
          isRequired
          classNames={commonClassNames}
        >
          {licenseTypes.map((type) => (
            <SelectItem key={type.key} value={type.key}>
              {type.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Tipo de Licencia"
          labelPlacement="outside"
          placeholder="Seleccionar tipo"
          value={formData.license_type}
          onChange={(e) => setFormData({...formData, license_type: e.target.value})}
          required
          isRequired
          classNames={commonClassNames}
        >
          {licenseTypes.map((type) => (
            <SelectItem key={type.key} value={type.key}>
              {type.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          type="date"
          label="Vencimiento de Licencia"
          placeholder="Seleccionar fecha"
          labelPlacement="outside"
          value={formData.license_expiry_date}
          onChange={(e) => setFormData({...formData, license_expiry_date: e.target.value})}
          required
          isRequired
          classNames={{
            base: "max-w-full",
            label: "pb-1",
            inputWrapper: "pb-0"
          }}
        />
        <Input
          type="email"
          label="Email"
          labelPlacement="outside"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          classNames={commonClassNames}
        />
        <Input
          label="Teléfono"
          labelPlacement="outside"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          classNames={commonClassNames}
        />
        <Select
          label="Departamento"
          labelPlacement="outside"
          value={formData.department}
          onChange={(e) => setFormData({...formData, department: e.target.value})}
          required
          isRequired
          classNames={commonClassNames}
        >
          {departments.map((dept) => (
            <SelectItem key={dept.key} value={dept.key}>
              {dept.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Cargo"
          labelPlacement="outside"
          value={formData.position}
          onChange={(e) => setFormData({...formData, position: e.target.value})}
          required
          isRequired
          classNames={commonClassNames}
        >
          {positions.map((pos) => (
            <SelectItem key={pos.key} value={pos.key}>
              {pos.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Estado"
          labelPlacement="outside"
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
          required
          isRequired
          classNames={commonClassNames}
        >
          <SelectItem key="Activo" value="Activo">Activo</SelectItem>
          <SelectItem key="Inactivo" value="Inactivo">Inactivo</SelectItem>
          <SelectItem key="Licencia" value="Licencia">Licencia</SelectItem>
        </Select>
        <Input
          label="URL de Foto"
          labelPlacement="outside"
          value={formData.photo_url}
          onChange={(e) => setFormData({...formData, photo_url: e.target.value})}
          classNames={commonClassNames}
        />
      </div>

      <div className="flex items-end justify-end">
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
            onClick={onCancel}
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
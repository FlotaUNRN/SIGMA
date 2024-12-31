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
          value={formData.license_type}
          onChange={(e) => setFormData({...formData, license_type: e.target.value})}
          required
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
          value={formData.department}
          onChange={(e) => setFormData({...formData, department: e.target.value})}
          required
        >
          {departments.map((dept) => (
            <SelectItem key={dept.key} value={dept.key}>
              {dept.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Cargo"
          value={formData.position}
          onChange={(e) => setFormData({...formData, position: e.target.value})}
          required
        >
          {positions.map((pos) => (
            <SelectItem key={pos.key} value={pos.key}>
              {pos.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Estado"
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
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
        <Button color="danger" variant="light" onClick={onCancel}>
          Cancelar
        </Button>
        <Button color="primary" type="submit">
          Guardar Empleado
        </Button>
      </div>
    </form>
  );
}
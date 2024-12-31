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
    <form onSubmit={handleSubmit} className='mt-2 rounded-lg bg-lightPaper p-6 shadow-xl dark:bg-darkPaper'>
      <div className='flex flex-col gap-3 md:flex-row md:justify-between md:pb-3'>
        <Input
          label='Nombre'
          name='first_name'
          type='text'
          variant='bordered'
          labelPlacement='outside'
          value={formData.first_name}
          onValueChange={(value) => setFormData({...formData, first_name: value})}
          placeholder='Ingresar nombre'
          errorMessage='Ingresa un nombre válido'
          isRequired
          classNames={{
            label: 'text-default-600 font-normal',
            input: 'font-normal'
          }}
        />
        <Input
          label='Apellido'
          name='last_name'
          type='text'
          variant='bordered'
          labelPlacement='outside'
          value={formData.last_name}
          onValueChange={(value) => setFormData({...formData, last_name: value})}
          placeholder='Ingresar apellido'
          errorMessage='Ingresa un apellido válido'
          isRequired
          classNames={{
            label: 'text-default-600 font-normal',
            input: 'font-normal'
          }}
        />
        <Input
          label='DNI'
          name='dni'
          type='text'
          variant='bordered'
          labelPlacement='outside'
          value={formData.dni}
          onValueChange={(value) => setFormData({...formData, dni: value})}
          placeholder='Ingresar DNI'
          errorMessage='Ingresa un DNI válido'
          isRequired
          classNames={{
            label: 'text-default-600 font-normal',
            input: 'font-normal'
          }}
        />
      </div>
      
      <div className='flex flex-col gap-3 md:flex-row md:justify-between md:pb-3'>
        <Input
          label='Número de Licencia'
          name='license_number'
          type='text'
          variant='bordered'
          labelPlacement='outside'
          value={formData.license_number}
          onValueChange={(value) => setFormData({...formData, license_number: value})}
          placeholder='Ingresar número de licencia'
          errorMessage='Ingresa un número de licencia válido'
          isRequired
          classNames={{
            label: 'text-default-600 font-normal',
            input: 'font-normal'
          }}
        />
        <Select
          label='Tipo de Licencia'
          name='license_type'
          variant='bordered'
          labelPlacement='outside'
          placeholder='Seleccionar tipo de licencia'
          selectedKeys={formData.license_type ? [formData.license_type] : []}
          onChange={(e) => setFormData({...formData, license_type: e.target.value})}
          isRequired
          classNames={{
            label: 'text-default-600 font-normal',
            trigger: 'h-12'
          }}
        >
          {licenseTypes.map((type) => (
            <SelectItem key={type.key} value={type.key}>
              {type.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          type='date'
          label='Vencimiento de Licencia'
          name='license_expiry_date'
          variant='bordered'
          labelPlacement='outside'
          placeholder='Seleccionar fecha'
          value={formData.license_expiry_date}
          onChange={(e) => setFormData({...formData, license_expiry_date: e.target.value})}
          isRequired
          classNames={{
            label: 'text-default-600 font-normal',
            input: 'font-normal'
          }}
        />
      </div>

      <div className='flex flex-col gap-3 md:flex-row md:justify-between md:pb-3'>
        <Input
          type='email'
          label='Email'
          name='email'
          variant='bordered'
          labelPlacement='outside'
          value={formData.email}
          onValueChange={(value) => setFormData({...formData, email: value})}
          placeholder='Ingresar email'
          classNames={{
            label: 'text-default-600 font-normal',
            input: 'font-normal'
          }}
        />
        <Input
          label='Teléfono'
          name='phone'
          type='text'
          variant='bordered'
          labelPlacement='outside'
          value={formData.phone}
          onValueChange={(value) => setFormData({...formData, phone: value})}
          placeholder='Ingresar teléfono'
          classNames={{
            label: 'text-default-600 font-normal',
            input: 'font-normal'
          }}
        />
        <Select
          label='Departamento'
          name='department'
          variant='bordered'
          labelPlacement='outside'
          placeholder='Seleccionar departamento'
          selectedKeys={formData.department ? [formData.department] : []}
          onChange={(e) => setFormData({...formData, department: e.target.value})}
          isRequired
          classNames={{
            label: 'text-default-600 font-normal',
            trigger: 'h-12'
          }}
        >
          {departments.map((dept) => (
            <SelectItem key={dept.key} value={dept.key}>
              {dept.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className='flex flex-col gap-3 md:flex-row md:justify-between md:pb-3'>
        <Select
          label='Cargo'
          name='position'
          variant='bordered'
          labelPlacement='outside'
          placeholder='Seleccionar cargo'
          selectedKeys={formData.position ? [formData.position] : []}
          onChange={(e) => setFormData({...formData, position: e.target.value})}
          isRequired
          classNames={{
            label: 'text-default-600 font-normal',
            trigger: 'h-12'
          }}
        >
          {positions.map((pos) => (
            <SelectItem key={pos.key} value={pos.key}>
              {pos.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label='Estado'
          name='status'
          variant='bordered'
          labelPlacement='outside'
          placeholder='Seleccionar estado'
          selectedKeys={[formData.status]}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
          isRequired
          classNames={{
            label: 'text-default-600 font-normal',
            trigger: 'h-12'
          }}
        >
          <SelectItem key='Activo' value='Activo'>Activo</SelectItem>
          <SelectItem key='Inactivo' value='Inactivo'>Inactivo</SelectItem>
          <SelectItem key='Licencia' value='Licencia'>Licencia</SelectItem>
        </Select>
        <Input
          label='URL de Foto'
          name='photo_url'
          type='text'
          variant='bordered'
          labelPlacement='outside'
          value={formData.photo_url}
          onValueChange={(value) => setFormData({...formData, photo_url: value})}
          placeholder='Ingresar URL de la foto'
          classNames={{
            label: 'text-default-600 font-normal',
            input: 'font-normal'
          }}
        />
      </div>

      <div className='flex items-end justify-end'>
        <div className='ml-2 flex flex-col gap-1 md:flex-row'>
          <Button
            size='sm'
            color='success'
            variant='bordered'
            type='submit'
            endContent={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m4.5 12.75 6 6 9-13.5'
                />
              </svg>
            }
          />
          <Button
            size='sm'
            color='danger'
            variant='bordered'
            onClick={onCancel}
            endContent={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18 18 6M6 6l12 12'
                />
              </svg>
            }
          />
        </div>
      </div>
    </form>
  );
}
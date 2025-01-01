import React, { useState } from 'react';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { Input } from '@/app/components/form/input';
import { createEmployee } from '@/app/lib/actions';
import { toast } from 'sonner';
import {
  useEmployees,
  useTotalEmployeesPages,
  useTotalEmployees,
} from '@/hooks/useEmployees';

interface EmployeeFormProps {
  setActiveForm: (activeForm: boolean) => void;
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export function EmployeeForm({ setActiveForm, searchParams }: EmployeeFormProps) {
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;
  const { mutateEmployees } = useEmployees(query, currentPage);
  const { totalEmployeesPages, mutateTotalEmployeesPages } = useTotalEmployeesPages();
  const { totalEmployees, mutateTotalEmployees } = useTotalEmployees();
  const [loading, setLoading] = useState(false);
  const [trySubmit, setTrySubmit] = useState(false);

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

  // Estados de error
  const [formErrors, setFormErrors] = useState({
    first_name: false,
    last_name: false,
    dni: false,
    license_number: false,
    license_type: false,
    license_expiry_date: false,
    email: false,
    phone: false,
    department: false,
    position: false,
    photo_url: false
  });

  const licenseTypes = ['A', 'B', 'C', 'D', 'E'];
  const departments = ['Operaciones', 'Mantenimiento', 'Administrativo'];
  const positions = ['Conductor', 'Mecánico', 'Supervisor', 'Administrativo'];
  const statuses = ['Activo', 'Inactivo', 'Licencia'];

  const validateField = (name: string, value: string) => {
    switch (name) {
    case 'email':
      return value ? /\S+@\S+\.\S+/.test(value) : true; // Opcional pero válido si se proporciona
    case 'dni':
      return /^\d{7,8}$/.test(value);
    case 'license_number':
      return value.length >= 5;
    case 'phone':
      return value ? /^\d{10}$/.test(value) : true; // Opcional pero válido si se proporciona
    default:
      return value.trim().length > 0;
    }
  };

  const validateForm = () => {
    const newErrors = {} as typeof formErrors;
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (key === 'email' || key === 'phone' || key === 'photo_url') {
        // Estos campos son opcionales
        newErrors[key as keyof typeof formErrors] = false;
      } else {
        const isFieldValid = validateField(key, formData[key as keyof typeof formData]);
        newErrors[key as keyof typeof formErrors] = !isFieldValid;
        if (!isFieldValid) isValid = false;
      }
    });

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrySubmit(true);

    if (!validateForm()) {
      toast.error('Por favor complete todos los campos requeridos correctamente');
      return;
    }

    setLoading(true);
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    toast.promise(
      createEmployee(form)
        .then(() => {
          mutateEmployees();
          mutateTotalEmployees(totalEmployees + 1, false);
          if (totalEmployees % 6 === 0) {
            mutateTotalEmployeesPages(totalEmployeesPages + 1, false);
          }
          setActiveForm(false);
        })
        .catch((error) => {
          console.error('Error creating employee:', error);
          throw error;
        })
        .finally(() => {
          setLoading(false);
        }),
      {
        loading: 'Creando empleado...',
        success: 'Empleado creado exitosamente',
        error: 'Error al crear el empleado'
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 rounded-lg bg-lightPaper p-6 shadow-xl dark:bg-darkPaper">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Input
          label="Nombre"
          name="first_name"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          value={formData.first_name}
          onValueChange={(value) => setFormData({...formData, first_name: value})}
          placeholder="Ingrese el nombre"
          isRequired
          isInvalid={trySubmit && formErrors.first_name}
          errorMessage={formErrors.first_name && 'El nombre es requerido'}
        />

        <Input
          label="Apellido"
          name="last_name"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          value={formData.last_name}
          onValueChange={(value) => setFormData({...formData, last_name: value})}
          placeholder="Ingrese el apellido"
          isRequired
          isInvalid={trySubmit && formErrors.last_name}
          errorMessage={formErrors.last_name && 'El apellido es requerido'}
        />

        <Input
          label="DNI"
          name="dni"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          value={formData.dni}
          onValueChange={(value) => setFormData({...formData, dni: value})}
          placeholder="Ingrese el DNI"
          isRequired
          isInvalid={trySubmit && formErrors.dni}
          errorMessage={formErrors.dni && 'Ingrese un DNI válido'}
        />

        <Input
          label="Número de Licencia"
          name="license_number"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          value={formData.license_number}
          onValueChange={(value) => setFormData({...formData, license_number: value})}
          placeholder="Ingrese el número de licencia"
          isRequired
          isInvalid={trySubmit && formErrors.license_number}
          errorMessage={formErrors.license_number && 'Ingrese un número de licencia válido'}
        />

        <Select
          label="Tipo de Licencia"
          name="license_type"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Seleccione el tipo de licencia"
          selectedKeys={formData.license_type ? [formData.license_type] : []}
          onChange={(e) => setFormData({...formData, license_type: e.target.value})}
          isRequired
          isInvalid={trySubmit && formErrors.license_type}
          errorMessage={formErrors.license_type && 'Seleccione un tipo de licencia'}
        >
          {licenseTypes.map((type) => (
            <SelectItem key={type} value={type}>
              Clase {type}
            </SelectItem>
          ))}
        </Select>

        <Input
          label="Vencimiento de Licencia"
          name="license_expiry_date"
          type="date"
          variant="bordered"
          labelPlacement="outside"
          value={formData.license_expiry_date}
          onValueChange={(value) => setFormData({...formData, license_expiry_date: value})}
          isRequired
          isInvalid={trySubmit && formErrors.license_expiry_date}
          errorMessage={formErrors.license_expiry_date && 'Seleccione una fecha válida'}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          variant="bordered"
          labelPlacement="outside"
          value={formData.email}
          onValueChange={(value) => setFormData({...formData, email: value})}
          placeholder="Ingrese el email"
          isInvalid={trySubmit && formErrors.email}
          errorMessage={formErrors.email && 'Ingrese un email válido'}
        />

        <Input
          label="Teléfono"
          name="phone"
          type="tel"
          variant="bordered"
          labelPlacement="outside"
          value={formData.phone}
          onValueChange={(value) => setFormData({...formData, phone: value})}
          placeholder="Ingrese el teléfono"
          isInvalid={trySubmit && formErrors.phone}
          errorMessage={formErrors.phone && 'Ingrese un teléfono válido'}
        />

        <Select
          label="Departamento"
          name="department"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Seleccione el departamento"
          selectedKeys={formData.department ? [formData.department] : []}
          onChange={(e) => setFormData({...formData, department: e.target.value})}
          isRequired
          isInvalid={trySubmit && formErrors.department}
          errorMessage={formErrors.department && 'Seleccione un departamento'}
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
          variant="bordered"
          labelPlacement="outside"
          placeholder="Seleccione el cargo"
          selectedKeys={formData.position ? [formData.position] : []}
          onChange={(e) => setFormData({...formData, position: e.target.value})}
          isRequired
          isInvalid={trySubmit && formErrors.position}
          errorMessage={formErrors.position && 'Seleccione un cargo'}
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
          variant="bordered"
          labelPlacement="outside"
          placeholder="Seleccione el estado"
          selectedKeys={[formData.status]}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
          isRequired
        >
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </Select>

        <Input
          label="URL de Foto"
          name="photo_url"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          value={formData.photo_url}
          onValueChange={(value) => setFormData({...formData, photo_url: value})}
          placeholder="Ingrese la URL de la foto"
        />
      </div>

      {/* Botones de acción */}
      <div className="mt-6 flex items-end justify-end">
        <div className="ml-2 flex flex-col gap-1 md:flex-row">
          <Button
            size="sm"
            color="success"
            variant="bordered"
            type="submit"
            isLoading={loading}
            isDisabled={loading}
            onClick={() => {
              setTrySubmit(true);
            }}
            aria-label="Guardar"
          >
            {!loading && (
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
            )}
          </Button>
          <Button
            size="sm"
            color="danger"
            variant="bordered"
            onClick={() => {
              setTrySubmit(false);
              setActiveForm(false);
            }}
            aria-label="Cancelar"
          >
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
          </Button>
        </div>
      </div>
    </form>
  );
}


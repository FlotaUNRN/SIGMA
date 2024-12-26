'use client';

import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@nextui-org/react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Employee } from '@/app/lib/definitions';
import { DeleteEmployeeButton } from './delete-button';

interface EmployeeCardProps {
  employee: Employee;
  searchParams?: {
    query?: string;
    page?: string;
  };
  setPending: (pending: boolean) => void;
  pending: boolean;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  searchParams,
  setPending,
  pending
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
    case 'Activo':
      return 'text-success bg-success-50';
    case 'Inactivo':
      return 'text-danger bg-danger-50';
    case 'Licencia':
      return 'text-warning bg-warning-50';
    default:
      return 'text-default bg-default-50';
    }
  };

  const isLicenseExpired = new Date(employee.license_expiry_date) < new Date();

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3 px-4 pb-0 pt-4">
        <img
          alt={`${employee.first_name} ${employee.last_name}`}
          className="h-12 w-12 rounded-full object-cover"
          src={employee.photo_url || '/api/placeholder/48/48'}
        />
        <div className="flex flex-col">
          <p className="text-md font-medium">{employee.first_name} {employee.last_name}</p>
          <p className="text-small text-default-500">{employee.position}</p>
        </div>
      </CardHeader>
      <CardBody className="px-4 py-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium">DNI:</span>
            <span className="text-sm">{employee.dni}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Licencia:</span>
            <span className="text-sm">{employee.license_number}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Vence:</span>
            <span className={`text-sm ${isLicenseExpired ? 'text-danger' : ''}`}>
              {format(new Date(employee.license_expiry_date), 'dd/MM/yyyy')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Estado:</span>
            <span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(employee.status)}`}>
              {employee.status}
            </span>
          </div>
        </div>
      </CardBody>
      <CardFooter className="justify-between gap-2 px-4 pt-2">
        <Link href={`/dashboard/employees/${employee.id}`}>
          <Button 
            color="success" 
            variant="light"
            size="sm"
            className="min-w-20"
          >
            Ver detalles
          </Button>
        </Link>
        <DeleteEmployeeButton
          employee={employee}
          searchParams={searchParams}
          setPending={setPending}
          isDisabled={pending}
        />
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
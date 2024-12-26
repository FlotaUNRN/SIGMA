'use client';

import { Key, useState } from 'react';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { VehicleAssignmentForm } from '@/app/components/employees/vehicle-assignment-form';
import { format } from 'date-fns';
import { useEmployeeById, useEmployeeVehicleAssignments } from '@/hooks/useEmployees';
import Link from 'next/link';

export default function EmployeePage({ params }: { params: { id: string } }) {
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const { employee, isLoading } = useEmployeeById(params.id);
  const { assignments } = useEmployeeVehicleAssignments(params.id);

  if (isLoading || !employee) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {employee.first_name} {employee.last_name}
        </h1>
        <Link href="/dashboard/employees">
          <Button color="primary" variant="ghost">Volver</Button>
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Información del empleado */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Información Personal</h2>
          </CardHeader>
          <CardBody>
            {/* ... resto de la información del empleado ... */}
          </CardBody>
        </Card>

        {/* Asignaciones de vehículos */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Vehículos Asignados</h2>
            <Button 
              color="primary"
              size="sm"
              onClick={() => setShowAssignmentForm(true)}
            >
              Asignar Vehículo
            </Button>
          </CardHeader>
          <CardBody>
            {showAssignmentForm ? (
              <VehicleAssignmentForm 
                employeeId={params.id}
                onClose={() => setShowAssignmentForm(false)}
              />
            ) : (
              <div className="space-y-4">
                {assignments?.map((assignment: {
                  id: Key;
                  vehicle: {
                    make: string;
                    model: string;
                    license_plate: string;
                  };
                  status: string;
                  start_date: string | Date;
                  end_date?: string | Date;
                  notes?: string;
                }) => (
                  <div 
                    key={assignment.id} 
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-medium">
                          {assignment.vehicle?.make} {assignment.vehicle?.model}
                        </p>
                        <p className="text-sm text-default-500">
                          {assignment.vehicle?.license_plate}
                        </p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-sm ${
                        assignment.status === 'Activa' ? 'bg-success-100 text-success-700' :
                          assignment.status === 'Finalizada' ? 'bg-default-100 text-default-700' :
                            'bg-danger-100 text-danger-700'
                      }`}>
                        {assignment.status}
                      </span>
                    </div>
                    <div className="text-sm">
                      <p>Inicio: {format(new Date(assignment.start_date), 'dd/MM/yyyy')}</p>
                      {assignment.end_date && (
                        <p>Fin: {format(new Date(assignment.end_date), 'dd/MM/yyyy')}</p>
                      )}
                      {assignment.notes && <p className="mt-2">{assignment.notes}</p>}
                    </div>
                  </div>
                ))}
                {(!assignments || assignments.length === 0) && (
                  <p className="text-default-500">No hay vehículos asignados</p>
                )}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
'use client';

import { Card, CardHeader, CardBody, Button, Divider, Spinner } from '@nextui-org/react';
import { format } from 'date-fns';
import { useState } from 'react';
import { useEmployeeById, useEmployeeVehicleAssignments } from '@/hooks/useEmployees';
import { VehicleAssignmentForm } from './vehicle-assignment-form';
import { EmployeeEditForm } from './employee-edit-form';
import { VehicleAssignment } from '@/app/lib/definitions';
import { toast } from 'sonner';
import Link from 'next/link';

export function EmployeeDetails({ id }: { id: string }) {
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const { employee, isLoading: isLoadingEmployee, mutateEmployee } = useEmployeeById(id);
  const { assignments, isLoading: isLoadingAssignments, mutateAssignments } = useEmployeeVehicleAssignments(id);

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      const response = await fetch(`/api/vehicle-assignments/${assignmentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la asignación');
      }

      await mutateAssignments();
      toast.success('Asignación eliminada con éxito');
    } catch (error) {
      toast.error('Error al eliminar la asignación');
      console.error('Error:', error);
    }
  };

  if (isLoadingEmployee || isLoadingAssignments) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg">No se encontró el empleado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Detalles del Empleado</h1>
          <Link href="/dashboard/employees">
            <Button color="primary" variant="ghost">Volver</Button>
          </Link>
        </div>
        <Button 
          color="primary" 
          variant="ghost"
          onClick={() => setShowEditForm(true)}
        >
          Editar
        </Button>
      </div>

      {showEditForm ? (
        <EmployeeEditForm 
          employee={employee}
          onClose={() => setShowEditForm(false)}
          onSuccess={() => {
            setShowEditForm(false);
            mutateEmployee();
          }}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex gap-4">
              <img
                src={employee.photo_url || '/api/placeholder/80/80'}
                alt={`${employee.first_name} ${employee.last_name}`}
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">
                  {employee.first_name} {employee.last_name}
                </h2>
                <p className="text-default-500">{employee.position}</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Información Personal</h3>
                  <Divider className="my-2" />
                  <div className="space-y-2">
                    <p><span className="font-medium">DNI:</span> {employee.dni}</p>
                    <p><span className="font-medium">Email:</span> {employee.email}</p>
                    <p><span className="font-medium">Teléfono:</span> {employee.phone}</p>
                    <p><span className="font-medium">Departamento:</span> {employee.department}</p>
                    <p>
                      <span className="font-medium">Estado:</span>
                      <span className={`ml-2 rounded-full px-2 py-1 text-sm ${
                        employee.status === 'Activo' ? 'bg-success-100 text-success-700' :
                          employee.status === 'Licencia' ? 'bg-warning-100 text-warning-700' :
                            'bg-danger-100 text-danger-700'
                      }`}>
                        {employee.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Información de Licencia</h3>
                  <Divider className="my-2" />
                  <div className="space-y-2">
                    <p><span className="font-medium">Número:</span> {employee.license_number}</p>
                    <p><span className="font-medium">Tipo:</span> Clase {employee.license_type}</p>
                    <p>
                      <span className="font-medium">Vencimiento:</span>{' '}
                      {format(new Date(employee.license_expiry_date), 'dd/MM/yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Asignaciones de Vehículos</h3>
              <Button 
                color="primary"
                onClick={() => setShowAssignmentForm(true)}
              >
                Nueva Asignación
              </Button>
            </CardHeader>
            <CardBody>
              {showAssignmentForm ? (
                <VehicleAssignmentForm 
                  employeeId={id}
                  onClose={() => setShowAssignmentForm(false)}
                />
              ) : (
                <div className="space-y-4">
                  {assignments?.map((assignment: VehicleAssignment) => (
                    <div key={assignment.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {assignment.vehicle?.make} {assignment.vehicle?.model}
                          </p>
                          <p className="text-sm text-default-500">
                            Patente: {assignment.vehicle?.license_plate}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className={`rounded-full px-2 py-1 text-sm ${
                            assignment.status === 'Activa' ? 'bg-success-100 text-success-700' :
                              assignment.status === 'Finalizada' ? 'bg-default-100 text-default-700' :
                                'bg-danger-100 text-danger-700'
                          }`}>
                            {assignment.status}
                          </span>
                          {assignment.status === 'Activa' && (
                            <Button
                              color="danger"
                              variant="light"
                              size="sm"
                              onClick={() => handleDeleteAssignment(assignment.id)}
                            >
                              Eliminar
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <p>
                          <span className="font-medium">Inicio:</span>{' '}
                          {format(new Date(assignment.start_date), 'dd/MM/yyyy')}
                        </p>
                        {assignment.end_date && (
                          <p>
                            <span className="font-medium">Fin:</span>{' '}
                            {format(new Date(assignment.end_date), 'dd/MM/yyyy')}
                          </p>
                        )}
                        {assignment.notes && (
                          <p className="mt-1 text-default-500 italic">
                            Nota: {assignment.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!assignments || assignments.length === 0) && (
                    <p className="text-default-500 text-center">No hay vehículos asignados</p>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
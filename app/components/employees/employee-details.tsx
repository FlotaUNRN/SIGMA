import { Card, CardHeader, CardBody, Button, Divider } from '@nextui-org/react';
import { format } from 'date-fns';

export function EmployeeDetails({ id: _id }: { id: string }) {
  const employee = {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    dni: '12345678',
    license_number: 'ABC123',
    license_type: 'B',
    license_expiry_date: new Date(),
    email: 'john@example.com',
    phone: '123-456-7890',
    department: 'Operaciones',
    position: 'Conductor',
    status: 'Activo',
    photo_url: '/api/placeholder/200/200'
  };

  console.log('Employee id:', _id);

  const vehicleAssignments = [
    {
      id: '1',
      vehicle: { make: 'Toyota', model: 'Hilux', license_plate: 'ABC123' },
      start_date: new Date(),
      end_date: null,
      status: 'Activa'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Detalles del Empleado</h1>
        <Button color="primary" variant="ghost">
          Editar
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex gap-4">
            <img
              src={employee.photo_url}
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
                    <span className="ml-2 rounded-full bg-success-100 px-2 py-1 text-sm text-success-700">
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
                    {format(employee.license_expiry_date, 'dd/MM/yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">Asignaciones de Vehículos</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {vehicleAssignments.map((assignment) => (
                <div key={assignment.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {assignment.vehicle.make} {assignment.vehicle.model}
                      </p>
                      <p className="text-sm text-default-500">
                        Patente: {assignment.vehicle.license_plate}
                      </p>
                    </div>
                    <span className="rounded-full bg-primary-100 px-2 py-1 text-sm text-primary-700">
                      {assignment.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>
                      <span className="font-medium">Inicio:</span>{' '}
                      {format(assignment.start_date, 'dd/MM/yyyy')}
                    </p>
                    {assignment.end_date && (
                      <p>
                        <span className="font-medium">Fin:</span>{' '}
                        {format(assignment.end_date, 'dd/MM/yyyy')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              
              <Button color="primary" className="w-full">
                Nueva Asignación
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
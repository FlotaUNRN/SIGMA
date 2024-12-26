import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Divider } from '@nextui-org/react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Inspection } from '@/app/lib/definitions';
import { DeleteInspectionButton } from './delete-button';

interface InspectionCardProps {
  inspection: Inspection;
  searchParams?: {
    query?: string;
    page?: string;
  };
  setPending: (pending: boolean) => void;
  pending: boolean;
}

const InspectionCard: React.FC<InspectionCardProps> = ({
  inspection,
  searchParams,
  setPending,
  pending
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
    case 'Completado':
      return 'text-success bg-success-50';
    case 'En Proceso':
      return 'text-warning bg-warning-50';
    case 'Pendiente':
      return 'text-danger bg-danger-50';
    default:
      return 'text-default bg-default-50';
    }
  };

  const getComponentStatus = (status: string) => {
    switch (status) {
    case 'OK':
      return 'text-success bg-success-50';
    case 'Requiere Atención':
      return 'text-danger bg-danger-50';
    case 'Atención Futura':
      return 'text-warning bg-warning-50';
    default:
      return 'text-default bg-default-50';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
          <div>
            <h3 className="text-small font-semibold">Código: {inspection.reference_code}</h3>
            <p className="text-tiny text-default-500">Vehículo: {inspection.license_plate}</p>
          </div>
          <div className={`rounded-full px-3 py-1 text-tiny ${getStatusColor(inspection.status)}`}>
            {inspection.status}
          </div>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className="space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:justify-between">
            <div className="text-small">
              <span className="font-medium">Fecha: </span>
              {format(new Date(inspection.inspection_date), 'dd/MM/yyyy HH:mm')}
            </div>
            <div className="text-small">
              <span className="font-medium">Odómetro: </span>
              {inspection.odometer_reading.toLocaleString()} km
            </div>
          </div>

          <div>
            <p className="text-small font-medium mb-2">Estado de Componentes Críticos:</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                { label: 'Aceite', status: inspection.engine_oil_status },
                { label: 'Frenos', status: inspection.brake_fluid_status },
                { label: 'Refrigerante', status: inspection.coolant_status },
                { label: 'Transmisión', status: inspection.transmission_status }
              ].map(({ label, status }) => (
                <div 
                  key={label}
                  className={`flex items-center justify-between rounded-lg p-2 ${getComponentStatus(status)}`}
                >
                  <span className="text-tiny">{label}</span>
                  <span className="text-tiny font-medium">{status}</span>
                </div>
              ))}
            </div>
          </div>

          {inspection.notes && (
            <div>
              <p className="text-small font-medium">Notas:</p>
              <p className="text-tiny text-default-500 line-clamp-2">{inspection.notes}</p>
            </div>
          )}
        </div>
      </CardBody>
      <Divider/>
      <CardFooter className="flex justify-between gap-2">
        <Link href={`/dashboard/inspections/${inspection.id}`}>
          <Button 
            color="success" 
            variant="light" 
            size="sm"
            className="min-w-20"
          >
            Ver detalles
          </Button>
        </Link>
        <DeleteInspectionButton
          inspection={inspection}
          searchParams={searchParams}
          setPending={setPending}
          isDisabled={pending}
        />
      </CardFooter>
    </Card>
  );
};

export default InspectionCard;
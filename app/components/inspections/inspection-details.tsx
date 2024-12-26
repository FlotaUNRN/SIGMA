'use client';
import { useInspectionById, useVehicleById } from '@/hooks/swr-hooks';
import { Spinner, Button, Card, CardBody } from '@nextui-org/react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function InspectionDetails({ id }: { id: string }) {
  const { inspection, isLoading } = useInspectionById(id);
  const { vehicle, isLoading: isLoadingVehicle } = useVehicleById(inspection?.vehicle_id || '');

  if (isLoading || isLoadingVehicle) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!inspection) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg">No se encontró la inspección</p>
      </div>
    );
  }

  const renderStatus = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-sm';
    let statusClasses = '';

    switch (status) {
      case 'OK':
        statusClasses = 'bg-success-100 text-success-700';
        break;
      case 'Requiere Atención':
        statusClasses = 'bg-danger-100 text-danger-700';
        break;
      case 'Atención Futura':
        statusClasses = 'bg-warning-100 text-warning-700';
        break;
      case 'Lleno':
        statusClasses = 'bg-primary-100 text-primary-700';
        break;
      default:
        statusClasses = 'bg-gray-100 text-gray-700';
    }

    return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex items-center justify-between gap-4 md:flex-1">
            <div>
              <h1 className="text-xl font-bold md:text-2xl">
                Inspección #{inspection.reference_code}
                <Link href="/dashboard/inspections" className="ml-3 inline-flex">
                  <Button
                    isIconOnly
                    color="danger"
                    variant="ghost"
                    size="sm"
                    aria-label="Volver"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </Button>
                </Link>
              </h1>
              {vehicle && (
                <p className="mt-1 text-sm text-foreground/80 md:text-lg">
                  {vehicle.make} {vehicle.model} - {vehicle.license_plate}
                </p>
              )}
            </div>
          </div>
          <span className={`self-start rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap md:self-center ${
            inspection.status === 'Completado' ? 'bg-success-100 text-success-700' :
              inspection.status === 'En Proceso' ? 'bg-primary-100 text-primary-700' :
                'bg-warning-100 text-warning-700'
          }`}>
            {inspection.status}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardBody>
            <h2 className="mb-4 text-xl font-semibold">Información General</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Fecha de Inspección:</span>{' '}
                {format(new Date(inspection.inspection_date), 'dd/MM/yyyy HH:mm')}
              </p>
              <p>
                <span className="font-medium">Lectura del Odómetro:</span>{' '}
                {inspection.odometer_reading.toLocaleString()} km
              </p>
            </div>
          </CardBody>
        </Card>

        {(inspection.front_image_url || 
          inspection.back_image_url || 
          inspection.driver_side_image_url || 
          inspection.passenger_side_image_url) && (
          <Card>
            <CardBody>
              <h2 className="mb-4 text-xl font-semibold">Imágenes</h2>
              <div className="grid grid-cols-2 gap-4">
                {inspection.front_image_url && (
                  <div>
                    <p className="mb-2 font-medium">Vista Frontal</p>
                    <img 
                      src={inspection.front_image_url} 
                      alt="Vista frontal" 
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                {inspection.back_image_url && (
                  <div>
                    <p className="mb-2 font-medium">Vista Trasera</p>
                    <img 
                      src={inspection.back_image_url} 
                      alt="Vista trasera" 
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                {inspection.driver_side_image_url && (
                  <div>
                    <p className="mb-2 font-medium">Lado del Conductor</p>
                    <img 
                      src={inspection.driver_side_image_url} 
                      alt="Lado del conductor" 
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                {inspection.passenger_side_image_url && (
                  <div>
                    <p className="mb-2 font-medium">Lado del Pasajero</p>
                    <img 
                      src={inspection.passenger_side_image_url} 
                      alt="Lado del pasajero" 
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        )}

        <Card>
          <CardBody>
            <h2 className="mb-4 text-xl font-semibold">Estado de Fluidos</h2>
            <div className="grid gap-3">
              {[
                { label: 'Aceite de Motor', value: inspection.engine_oil_status },
                { label: 'Transmisión', value: inspection.transmission_status },
                { label: 'Diferencial', value: inspection.differential_status },
                { label: 'Refrigerante', value: inspection.coolant_status },
                { label: 'Líquido de Frenos', value: inspection.brake_fluid_status },
                { label: 'Dirección Hidráulica', value: inspection.power_steering_status },
                { label: 'Limpiaparabrisas', value: inspection.wiper_fluid_status },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="font-medium">{label}</span>
                  {renderStatus(value)}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-4 text-xl font-semibold">Mangueras y Correas</h2>
            <div className="grid gap-3">
              {[
                { label: 'Manguera de Dirección', value: inspection.steering_hose_status },
                { label: 'Manguera del Calefactor', value: inspection.heater_hose_status },
                { label: 'Correa Serpentina', value: inspection.serpentine_belt_status },
                { label: 'Correa del Alternador', value: inspection.alternator_belt_status },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="font-medium">{label}</span>
                  {renderStatus(value)}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-4 text-xl font-semibold">Filtros</h2>
            <div className="grid gap-3">
              {[
                { label: 'Filtro de Aire', value: inspection.air_filter_status },
                { label: 'Filtro de Combustible', value: inspection.fuel_filter_status },
                { label: 'Filtro de Aceite', value: inspection.oil_filter_status },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="font-medium">{label}</span>
                  {renderStatus(value)}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-4 text-xl font-semibold">Estado de Neumáticos</h2>
            <div className="grid gap-3">
              {[
                { label: 'Delantero Izquierdo', value: inspection.front_left_tire_status },
                { label: 'Delantero Derecho', value: inspection.front_right_tire_status },
                { label: 'Trasero Izquierdo', value: inspection.rear_left_tire_status },
                { label: 'Trasero Derecho', value: inspection.rear_right_tire_status },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="font-medium">{label}</span>
                  {renderStatus(value)}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-4 text-xl font-semibold">Seguridad</h2>
            <div className="grid gap-3">
              {[
                { label: 'Freno de Emergencia', value: inspection.emergency_brake_status },
                { label: 'Limpiaparabrisas Delantero', value: inspection.front_wiper_status },
                { label: 'Limpiaparabrisas Trasero', value: inspection.rear_wiper_status },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="font-medium">{label}</span>
                  {renderStatus(value)}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {inspection.notes && (
          <Card className="md:col-span-2">
            <CardBody>
              <h2 className="mb-4 text-xl font-semibold">Notas</h2>
              <p className="whitespace-pre-wrap">{inspection.notes}</p>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
'use client';
import { Card, CardHeader, CardBody, CardFooter, Button, Image } from '@nextui-org/react';
import { useState } from 'react';
import { useAllVehicles } from '@/hooks/useAllVehicles';
import { InspectionForm } from './inspection-form';

export const CreateInspectionForm = ({
  setActiveForm,
  searchParams,
}: {
  setActiveForm: (activeForm: boolean) => void;
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [step, setStep] = useState<'select-vehicle' | 'fill-form'>('select-vehicle');
  const { vehicles, isLoading } = useAllVehicles();

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setStep('fill-form'); // Cambia directamente al formulario cuando se selecciona un vehículo
  };

  if (isLoading) {
    return <div className="flex justify-center p-4">Cargando vehículos...</div>;
  }

  return (
    <div className="mt-4 space-y-6 rounded-lg bg-lightPaper p-6 shadow-xl dark:bg-darkPaper">
      {step === 'select-vehicle' ? (
        <>
          <h3 className="mb-4 text-xl font-semibold">Selecciona un vehículo para inspeccionar</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vehicles?.map((vehicle) => (
              <Card 
                key={vehicle.id} 
                className={`py-4 cursor-pointer transition-all ${
                  selectedVehicleId === vehicle.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
                  <p className="text-tiny font-bold uppercase">
                    {vehicle.make} {vehicle.model}
                  </p>
                  <small className="text-default-500">{vehicle.year}</small>
                  <h4 className="text-large font-bold">{vehicle.license_plate}</h4>
                </CardHeader>

                <CardBody className="flex items-center justify-center overflow-visible py-2">
                  <Image
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="max-h-40 w-full rounded-lg object-contain"
                    src={vehicle.photo_url}
                  />
                </CardBody>

                <CardFooter className="justify-center">
                  <Button
                    color="primary"
                    variant={selectedVehicleId === vehicle.id ? 'solid' : 'bordered'}
                    size="sm"
                    onClick={() => handleVehicleSelect(vehicle.id)}
                  >
                    Seleccionar para Inspección
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              color="danger"
              variant="light"
              onClick={() => setActiveForm(false)}
            >
              Cancelar
            </Button>
          </div>
        </>
      ) : (
        <InspectionForm 
          vehicleId={selectedVehicleId!}
          setActiveForm={setActiveForm}
          searchParams={searchParams}
        />
      )}
    </div>
  );
};
'use client';
import { Card, CardHeader, CardBody, CardFooter, Button, Image } from '@nextui-org/react';
import { useState } from 'react';
import { useAllVehicles } from '@/hooks/useAllVehicles';

export function VehicleSelectionGrid({ onVehicleSelect }: { onVehicleSelect: (vehicleId: string) => void }) {
  const { vehicles, isLoading } = useAllVehicles();
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  if (isLoading) {
    return <div className="flex justify-center p-4">Cargando vehículos...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {vehicles?.map((vehicle) => (
        <Card 
          key={vehicle.id} 
          className={`py-4 cursor-pointer transition-all ${
            selectedVehicleId === vehicle.id ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => {
            setSelectedVehicleId(vehicle.id);
            onVehicleSelect(vehicle.id);
          }}
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
            >
              {selectedVehicleId === vehicle.id ? 'Seleccionado' : 'Seleccionar'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
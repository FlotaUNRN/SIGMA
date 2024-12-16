'use client';
import { useVehicleById } from '@/hooks/swr-hooks';
import { Spinner } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import LicensePlate from '@/app/components/vehicles/license_plate';

export const VehicleDetails = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query;

  const { vehicle, isLoading } = useVehicleById(id || '');

  const colors = [
    { key: 'Blanco', label: 'Blanco', hex: '#FFFFFF' },
    { key: 'Plateado', label: 'Plateado', hex: '#C0C0C0' },
    { key: 'Gris', label: 'Gris', hex: '#808080' },
    { key: 'Negro', label: 'Negro', hex: '#000000' },
    { key: 'Verde', label: 'Verde', hex: '#008000' },
    { key: 'Celeste', label: 'Celeste', hex: '#00FFFF' },
    { key: 'Azul', label: 'Azul', hex: '#0000FF' },
    { key: 'Amarillo', label: 'Amarillo', hex: '#FFFF00' },
    { key: 'Dorado', label: 'Dorado', hex: '#FFD700' },
    { key: 'Naranja', label: 'Naranja', hex: '#FFA500' },
    { key: 'Bronze', label: 'Bronze', hex: '#CD7F32' },
    { key: 'Marrón', label: 'Marrón', hex: '#A52A2A' },
    { key: 'Rojo', label: 'Rojo', hex: '#FF0000' },
  ];

  if (isLoading) {
    return <Spinner className="mt-5 w-full justify-center" />;
  }

  return (
    <>
      <p>Query: {query}</p>
      <p>Page: {currentPage}</p>
      <div
        key={vehicle.vin}
        className="flex flex-col items-center justify-center gap-3 px-3 py-6 md:flex-row md:gap-8 md:px-6 md:py-12"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-row items-center justify-center gap-3 flex-wrap">
            <img
              src={vehicle.photo_url}
              alt={vehicle.label}
              className="h-50 w-80 object-cover"
            />
            <LicensePlate plateNumber={vehicle.license_plate} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold md:text-4xl">{vehicle.label}</h1>
          <p className="text-sm md:text-lg">
            <b>VIN:</b> {vehicle.vin}
          </p>
          <p className="flex flex-row items-center gap-2 text-sm md:text-lg">
            <b>Fabricante:</b> {vehicle.make}{' '}
            <img
              src={`/assets/${vehicle.make}.png`}
              alt={vehicle.make}
              className="h-5 object-contain md:h-6"
            />
          </p>
          <p className="text-sm md:text-lg">
            <b>Modelo:</b> {vehicle.model}
          </p>
          <p className="text-sm md:text-lg">
            <b>Año:</b> {vehicle.year}
          </p>
          <p className="flex flex-row items-center gap-2 text-sm md:text-lg">
            <b>Color:</b> {vehicle.color}{' '}
            <div
              className="h-4 w-4 rounded-full"
              style={{
                backgroundColor: colors.find((c) => c.key === vehicle.color)
                  ?.hex,
              }}
            ></div>
          </p>
        </div>
      </div>
    </>
  );
};

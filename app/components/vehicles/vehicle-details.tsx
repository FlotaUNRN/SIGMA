'use client';
import { useVehicleById } from '@/hooks/swr-hooks';
import { Spinner } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

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

  if (isLoading) {
    return <Spinner className='mt-5 w-full justify-center'/>;
  }

  return (
    <>
      <p>Query: {query}</p>
      <p>Page: {currentPage}</p>
      <div
        key={vehicle.vin}
        className="flex flex-col items-center justify-center gap-3 px-3 py-6 md:flex-row md:gap-8 md:px-6 md:py-12"
      >
        <img
          src={vehicle.photo_url}
          alt={vehicle.label}
          className="h-50 w-80 object-cover"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold md:text-4xl">{vehicle.label}</h1>
          <p className="text-sm md:text-lg">
            <b>Fabricante:</b> {vehicle.make}
          </p>
          <p className="text-sm md:text-lg">
            <b>Modelo:</b> {vehicle.model}
          </p>
          <p className="text-sm md:text-lg">
            <b>Año:</b> {vehicle.year}
          </p>
          <p className="text-sm md:text-lg">
            <b>Color:</b> {vehicle.color}
          </p>
          <p className="text-sm md:text-lg">
            <b>Patente:</b> {vehicle.license_plate}
          </p>
        </div>
      </div>
    </>
  );
};

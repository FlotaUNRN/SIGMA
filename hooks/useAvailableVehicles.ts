import useSWR from 'swr';
import { Vehicle } from '@/app/lib/definitions';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }
  return response.json();
};

export function useAvailableVehicles() {
  const { data: vehicles, error, isLoading, mutate } = useSWR<Vehicle[]>(
    '/api/vehicles/available',
    fetcher
  );

  return {
    vehicles,
    isLoading,
    isError: error,
    mutateVehicles: mutate
  };
}
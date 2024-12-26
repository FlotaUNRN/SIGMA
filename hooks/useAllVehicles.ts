import useSWR from 'swr';
import { Vehicle } from '@/app/lib/definitions';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }
  const data = await response.json();
  return data;
};

export function useAllVehicles() {
  const { data: vehicles, error, isLoading } = useSWR<Vehicle[]>(
    '/api/vehicles/all',
    fetcher
  );

  return {
    vehicles,
    isLoading,
    isError: error
  };
}
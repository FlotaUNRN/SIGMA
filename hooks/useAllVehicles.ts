import useSWR from 'swr';
import { Vehicle } from '@/app/lib/definitions';

const fetcher = async (url: string) => {
  console.log('Fetching vehicles from:', url);
  const response = await fetch(url);
  if (!response.ok) {
    console.error('Error fetching vehicles:', response.status, response.statusText);
    throw new Error('Failed to fetch vehicles');
  }
  const data = await response.json();
  console.log('Vehicles data received:', data);
  return data;
};

export function useAllVehicles() {
  const { data: vehicles, error, isLoading } = useSWR<Vehicle[]>(
    '/api/vehicles/all',
    fetcher
  );

  if (error) {
    console.error('Error in useAllVehicles:', error);
  }

  return {
    vehicles,
    isLoading,
    isError: error
  };
}
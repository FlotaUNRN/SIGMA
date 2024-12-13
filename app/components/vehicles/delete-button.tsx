'use client';
import { deleteVehicle } from '@/app/lib/actions';
import { Button } from '@nextui-org/react';
import { useContext } from 'react';
import ThemeContext from '@/context/theme-context';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  useVehicles,
  useTotalVehicles,
  useTotalVehiclesPages,
} from '../../../hooks/swr-hooks';
import { Vehicle } from '@/app/lib/definitions';

export const DeleteVehicleButton = ({
  vehicle,
  searchParams,
  isDisabled,
  setPending,
}: {
  vehicle: Vehicle;
  searchParams?: {
    query?: string;
    page?: string;
  };
  isDisabled: boolean;
  setPending: (pending: boolean) => void;
}) => {
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;
  const { vehicles, mutateVehicles } = useVehicles(query, currentPage);
  const { totalVehicles, mutateTotalVehicles } = useTotalVehicles();
  const { totalVehiclesPages, mutateTotalVehiclesPages } =
    useTotalVehiclesPages();
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  return (
    <Button
      color="danger"
      variant="light"
      size="sm"
      isDisabled={isDisabled}
      onClick={() => {
        Swal.fire({
          title: `Eliminar "${vehicle.model} ${vehicle.license_plate}"?`,
          icon: 'warning',
          showCancelButton: true,
          iconColor: 'red',
          background: theme === 'dark' ? '#17222e' : '#FCF6F5',
          color: theme === 'dark' ? '#FCF6F5' : '#101820',
          confirmButtonColor: 'red',
          confirmButtonText: 'Si, eliminarlo!',
          cancelButtonColor: theme === 'dark' ? '#17222e' : '#FCF6F5',
          cancelButtonText: `<span style="color: ${theme === 'dark' ? '#FCF6F5' : '#101820'}">Cancelar</span>`,
        }).then((result) => {
          if (result.isConfirmed) {
            setPending(true);
            toast.promise(
              deleteVehicle(vehicle.id)
                .then(() => {
                  mutateTotalVehicles(totalVehicles - 1, false);
                  if (totalVehicles % 6 === 5 && totalVehiclesPages > 1) {
                    mutateTotalVehiclesPages(totalVehiclesPages - 1, false);
                  }
                  if (vehicles.length === 1 && currentPage > 1) {
                    const newPage = currentPage - 1;
                    const newPath = `/dashboard/vehicles?page=${newPage}${query ? `&query=${query}` : ''}`;
                    router.push(newPath);
                  }
                  mutateVehicles();
                })
                .catch((error) => {
                  console.error('Failed to delete vehicle:', error);
                })
                .finally(() => {
                  setPending(false);
                }),
              {
                loading: 'Eliminando vehículo...',
                success: 'Vehículo eliminado exitosamente!',
                error: 'Error al eliminar vehículo',
              },
            );
          }
        });
      }}
    >
      Eliminar
    </Button>
  );
};

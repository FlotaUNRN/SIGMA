'use client';
import { Button } from '@nextui-org/react';
import { useContext } from 'react';
import ThemeContext from '@/context/theme-context';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const DeleteEmployeeButton = ({
  employee,
  //   searchParams,
  isDisabled,
  setPending,
}: {
  employee: {
    id: string;
    first_name: string;
    last_name: string;
  };
  searchParams?: {
    query?: string;
    page?: string;
  };
  isDisabled: boolean;
  setPending: (pending: boolean) => void;
}) => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/employees/${employee.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar empleado');

      router.refresh();
      return 'Empleado eliminado con éxito';
    } catch (error) {
      console.error('Failed to delete employee:', error);
      throw error;
    }
  };

  return (
    <Button
      color="danger"
      variant="light"
      size="sm"
      isDisabled={isDisabled}
      onClick={() => {
        Swal.fire({
          title: `¿Eliminar a "${employee.first_name} ${employee.last_name}"?`,
          icon: 'warning',
          showCancelButton: true,
          iconColor: 'red',
          background: theme === 'dark' ? '#17222e' : '#FCF6F5',
          color: theme === 'dark' ? '#FCF6F5' : '#101820',
          confirmButtonColor: 'red',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonColor: theme === 'dark' ? '#17222e' : '#FCF6F5',
          cancelButtonText: `<span style="color: ${
            theme === 'dark' ? '#FCF6F5' : '#101820'
          }">Cancelar</span>`,
        }).then((result) => {
          if (result.isConfirmed) {
            setPending(true);
            toast.promise(
              handleDelete()
                .catch((error) => {
                  console.error('Failed to delete employee:', error);
                })
                .finally(() => {
                  setPending(false);
                }),
              {
                loading: 'Eliminando empleado...',
                success: 'Empleado eliminado exitosamente',
                error: 'Error al eliminar empleado',
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
'use client';
import { deleteInspection } from '@/app/lib/actions';
import { Button } from '@nextui-org/react';
import { useContext } from 'react';
import ThemeContext from '@/context/theme-context';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  useInspections,
  useTotalInspections,
  useTotalInspectionsPages,
} from '@/hooks/swr-hooks';
import { Inspection } from '@/app/lib/definitions';

export const DeleteInspectionButton = ({
  inspection,
  searchParams,
  isDisabled,
  setPending,
}: {
  inspection: Inspection;
  searchParams?: {
    query?: string;
    page?: string;
  };
  isDisabled: boolean;
  setPending: (pending: boolean) => void;
}) => {
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;
  const { inspections, mutateInspections } = useInspections(query, currentPage);
  const { totalInspections, mutateTotalInspections } = useTotalInspections();
  const { totalInspectionsPages, mutateTotalInspectionsPages } =
    useTotalInspectionsPages();
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
          title: `Eliminar inspección "${inspection.reference_code}"?`,
          icon: 'warning',
          showCancelButton: true,
          iconColor: 'red',
          background: theme === 'dark' ? '#17222e' : '#FCF6F5',
          color: theme === 'dark' ? '#FCF6F5' : '#101820',
          confirmButtonColor: 'red',
          confirmButtonText: 'Si, eliminar!',
          cancelButtonColor: theme === 'dark' ? '#17222e' : '#FCF6F5',
          cancelButtonText: `<span style="color: ${
            theme === 'dark' ? '#FCF6F5' : '#101820'
          }">Cancelar</span>`,
        }).then((result) => {
          if (result.isConfirmed) {
            setPending(true);
            toast.promise(
              deleteInspection(inspection.id)
                .then(() => {
                  mutateTotalInspections(totalInspections - 1, false);
                  if (totalInspections % 6 === 5 && totalInspectionsPages > 1) {
                    mutateTotalInspectionsPages(totalInspectionsPages - 1, false);
                  }
                  if (inspections.length === 1 && currentPage > 1) {
                    const newPage = currentPage - 1;
                    const newPath = `/dashboard/inspections?page=${newPage}${
                      query ? `&query=${query}` : ''
                    }`;
                    router.push(newPath);
                  }
                  mutateInspections();
                })
                .catch((error) => {
                  console.error('Failed to delete inspection:', error);
                })
                .finally(() => {
                  setPending(false);
                }),
              {
                loading: 'Eliminando inspección...',
                success: 'Inspección eliminada exitosamente!',
                error: 'Error al eliminar inspección',
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
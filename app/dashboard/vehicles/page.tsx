import { Metadata } from 'next';
import { Toaster } from 'sonner';
import FilterCreateVehicle from '@/app/components/vehicles/filter-create-vehicle';

export const metadata: Metadata = {
  title: 'Vehículos',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  return (
    <div>
      <Toaster
        closeButton
        toastOptions={{
          classNames: {
            toast: 'bg-lightPaper dark:bg-darkPaper',
            title: 'text-foreground dark:text-[#FCF6F5]',
            description: 'text-foreground dark:text-[#FCF6F5]',
            error: 'text-danger 1px solid border-danger',
            success: 'text-success 1px solid border-success ',
            actionButton:
              'bg-lightPaper dark:bg-darkPaper text-foreground dark:text-[#FCF6F5] border-darkPaper dark:border-lightPaper',
            cancelButton:
              'bg-lightPaper dark:bg-darkPaper text-foreground dark:text-[#FCF6F5] border-darkPaper dark:border-lightPaper',
            closeButton:
              'bg-lightPaper dark:bg-darkPaper text-foreground dark:text-[#FCF6F5] border-darkPaper dark:border-lightPaper',
          },
        }}
      />
      <h1 className="text-2xl">Vehículos</h1>
      <FilterCreateVehicle searchParams={searchParams} />
    </div>
  );
}

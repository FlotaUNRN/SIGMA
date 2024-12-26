import { Metadata } from 'next';
import { EmployeeDetails } from '@/app/components/employees/employee-details';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Detalles del Empleado',
};

export default function Page({ params }: { params: { id: string } }) {
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
            success: 'text-success 1px solid border-success',
            actionButton: 'bg-lightPaper dark:bg-darkPaper text-foreground dark:text-[#FCF6F5] border-darkPaper dark:border-lightPaper',
            cancelButton: 'bg-lightPaper dark:bg-darkPaper text-foreground dark:text-[#FCF6F5] border-darkPaper dark:border-lightPaper',
            closeButton: 'bg-lightPaper dark:bg-darkPaper text-foreground dark:text-[#FCF6F5] border-darkPaper dark:border-lightPaper',
          },
        }}
      />
      <EmployeeDetails id={params.id} />
    </div>
  );
}
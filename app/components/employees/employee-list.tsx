'use client';

import { useState } from 'react';
import { Button, Pagination, Spinner } from '@nextui-org/react';
import Search from '@/app/components/search';
import { usePathname, useRouter } from 'next/navigation';
import { useEmployees, useTotalEmployeesPages } from '@/hooks/useEmployees';
import { Employee } from '@/app/lib/definitions';
import { motion, AnimatePresence } from 'framer-motion';
import EmployeeCard from './employee-card';
import { EmployeeForm } from './employee-form';

export function EmployeeList({ 
  searchParams 
}: { 
  searchParams?: { 
    query?: string; 
    page?: string; 
  } 
}) {
  const [activeForm, setActiveForm] = useState(false);
  const [pending, setPending] = useState(false);
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;
  const { employees, isLoading } = useEmployees(query, currentPage);
  const { totalEmployeesPages } = useTotalEmployeesPages(query);
  const { replace } = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <div className="w-full">
          <Search placeholder="Buscar empleados" />
        </div>
        <div className="flex w-full justify-center md:w-auto">
          <Button
            color="success"
            className="mb-2 md:m-0"
            onClick={() => setActiveForm(!activeForm)}
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            }
          >
            Nuevo empleado
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {activeForm && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <EmployeeForm 
              setActiveForm={setActiveForm}
              searchParams={searchParams}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex w-full justify-center p-6">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {employees?.map((employee: Employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              searchParams={searchParams}
              setPending={setPending}
              pending={pending}
            />
          ))}
        </div>
      )}

      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={currentPage}
          total={totalEmployeesPages}
          onChange={(page) => {
            const params = new URLSearchParams(searchParams);
            params.set('page', page.toString());
            replace(`${pathname}?${params.toString()}`);
          }}
          classNames={{
            item: 'bg-background',
            prev: 'bg-background',
            next: 'bg-background',
          }}
        />
      </div>
    </div>
  );
}

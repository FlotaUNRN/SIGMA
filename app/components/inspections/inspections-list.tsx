'use client';
import { Button, CardFooter, Pagination, Spinner } from '@nextui-org/react';
import Search from '@/app/components/search';
import { useState } from 'react';
import { CreateInspectionForm } from './create-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTotalInspectionsPages, useInspections } from '@/hooks/swr-hooks';
import { DeleteInspectionButton } from './delete-button';
import { format } from 'date-fns';
import { Inspection } from '@/app/lib/definitions';

export default function InspectionsList({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;
  const [pending, setPending] = useState(false);
  const { inspections, isLoading } = useInspections(query, currentPage);
  const { totalInspectionsPages } = useTotalInspectionsPages(query);
  const { replace } = useRouter();
  const pathname = usePathname();

  const data = inspections ?? [];
  const [activeForm, setActiveForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
    case 'Completado':
      return 'text-success bg-success-50';
    case 'En Proceso':
      return 'text-warning bg-warning-50';
    case 'Pendiente':
      return 'text-danger bg-danger-50';
    default:
      return 'text-default bg-default-50';
    }
  };
  
  const getComponentStatus = (status: string) => {
    switch (status) {
    case 'OK':
      return 'text-success bg-success-50';
    case 'Requiere Atención':
      return 'text-danger bg-danger-50';
    case 'Atención Futura':
      return 'text-warning bg-warning-50';
    default:
      return 'text-default bg-default-50';
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <Search placeholder="Buscar inspecciones" />
        <div className="mb-2 md:m-0">
          <Button
            color="success"
            onClick={() => setActiveForm(!activeForm)}
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
            }
          >
            Nueva inspección
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
            <CreateInspectionForm
              setActiveForm={setActiveForm}
              searchParams={searchParams}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {isLoading && <Spinner className='mt-5 w-full justify-center'/>}
      
      <div className="relative mt-3 grid grid-cols-1 gap-4 overflow-x-auto overflow-y-auto sm:rounded-lg md:grid-cols-2 lg:grid-cols-3">
        {data.map((inspection: Inspection) => (
          <Card className="py-4" key={inspection.id}>
            <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
              <div className="flex w-full justify-between">
                <div>
                  <p className="text-tiny font-bold uppercase">
                    {inspection.reference_code}
                  </p>
                  <small className="text-default-500">
                    ID: {inspection.vehicle_id}
                  </small>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(inspection.status)}`}>
                  {inspection.status}
                </span>
              </div>
            </CardHeader>

            <CardBody className="px-4 py-2">
              <div className="space-y-2">
                <p className="text-small">
                  <span className="font-semibold">Fecha:</span> {format(new Date(inspection.inspection_date), 'dd/MM/yyyy HH:mm')}
                </p>
                <p className="text-small">
                  <span className="font-semibold">Odómetro:</span> {inspection.odometer_reading} km
                </p>
                
                <div className="mt-2">
                  <p className="text-small font-semibold">Estado de Componentes Críticos:</p>
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    <p className="text-xs">
                      <span className={`inline-block rounded-full px-2 ${getComponentStatus(inspection.engine_oil_status)}`}>
                        Aceite: {inspection.engine_oil_status}
                      </span>
                    </p>
                    <p className="text-xs">
                      <span className={`inline-block rounded-full px-2 ${getComponentStatus(inspection.brake_fluid_status)}`}>
                        Frenos: {inspection.brake_fluid_status}
                      </span>
                    </p>
                    <p className="text-xs">
                      <span className={`inline-block rounded-full px-2 ${getComponentStatus(inspection.coolant_status)}`}>
                        Refrigerante: {inspection.coolant_status}
                      </span>
                    </p>
                    <p className="text-xs">
                      <span className={`inline-block rounded-full px-2 ${getComponentStatus(inspection.transmission_status)}`}>
                        Transmisión: {inspection.transmission_status}
                      </span>
                    </p>
                  </div>
                </div>
                
                {inspection.notes && (
                  <div className="mt-2">
                    <p className="text-small font-semibold">Notas:</p>
                    <p className="text-xs text-default-500">{inspection.notes}</p>
                  </div>
                )}
              </div>
            </CardBody>

            <CardFooter className="flex justify-between px-4 pt-2">
              <Link href={`/dashboard/inspections/${inspection.id}`}>
                <Button color="success" variant="light" size="sm">
                  Ver detalles
                </Button>
              </Link>
              <DeleteInspectionButton
                inspection={inspection}
                searchParams={searchParams}
                setPending={setPending}
                isDisabled={pending}
              />
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex w-full justify-center mt-3">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={currentPage}
          total={totalInspectionsPages}
          onChange={(page) => {
            const params = new URLSearchParams();
            if (searchParams?.query) {
              params.set('query', searchParams.query);
            }
            if (page) {
              params.set('page', page.toString());
            }
            replace(`${pathname}?${params.toString()}`);
          }}
        />
      </div>
    </>
  );
}

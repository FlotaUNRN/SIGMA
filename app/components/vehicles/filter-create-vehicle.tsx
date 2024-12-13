'use client';
import { Button, CardFooter, Pagination, Spinner } from '@nextui-org/react';
import Search from '@/app/components/search';
import { useState } from 'react';
import { CreateVehicleForm } from './create-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTotalVehiclesPages, useVehicles } from '@/hooks/swr-hooks';
import { DeleteVehicleButton } from '@/app/components/vehicles/delete-button';
import { Vehicle } from '@/app/lib/definitions';

const FilterCreateVehicle = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;
  const [pending, setPending] = useState(false);
  const { vehicles, isLoading } = useVehicles(query, currentPage);
  const { totalVehiclesPages } = useTotalVehiclesPages(query);
  const { replace } = useRouter();
  const pathname = usePathname();

  const data = vehicles ?? [];

  const [activeForm, setActiveForm] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <Search placeholder="Buscar vehiculos" />
        <div className="mb-2 md:m-0">
          <Button
            color="success"
            onClick={() => {
              setActiveForm(!activeForm);
            }}
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
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            }
          >
            Nuevo vehiculo
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
            <CreateVehicleForm
              setActiveForm={setActiveForm}
              searchParams={searchParams}
            />
          </motion.section>
        )}
      </AnimatePresence>
      {isLoading && <Spinner className='mt-5 w-full justify-center'/>}
      <div className="relative mt-3 grid grid-cols-1 gap-4 overflow-x-auto overflow-y-auto sm:rounded-lg md:grid-cols-2 lg:grid-cols-3">
        {data.map((vehicle: Vehicle) => (
          <Card className="py-4" key={vehicle.vin}>
            <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
              <p className="text-tiny font-bold uppercase">
                {vehicle.make} {vehicle.model}
              </p>
              <small className="text-default-500">{vehicle.model}</small>
              <h4 className="text-large font-bold">{vehicle.license_plate}</h4>
            </CardHeader>
            <CardBody className="items-center justify-center overflow-visible py-2">
              <Image
                alt="Card background"
                className="rounded-xl object-cover"
                src={vehicle.photo_url}
                width={270}
              />
            </CardBody>
            <CardFooter className="flex justify-between px-4 pt-2">
              <Link href={`/dashboard/vehicles/${vehicle?.id}`}>
                <Button color="success" variant="light" size="sm">
                  Ver detalles
                </Button>
              </Link>
              <DeleteVehicleButton
                vehicle={vehicle}
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
          total={totalVehiclesPages}
          classNames={{
            item: 'bg-background',
            prev: 'bg-background',
            next: 'bg-background',
          }}
          onChange={(page) => {
            const params = new URLSearchParams(searchParams);
            params.set('page', page?.toString());
            replace(`${pathname}?${params.toString()}`);
          }}
        />
      </div>
    </>
  );
};

export default FilterCreateVehicle;

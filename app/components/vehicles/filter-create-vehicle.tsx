'use client';
import { Button, CardFooter } from '@nextui-org/react';
import Search from '@/app/components/search';
import { useState } from 'react';
// import { CreateUserForm } from './create-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import Link from 'next/link';

const FilterCreateVehicle = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const search = searchParams?.query;
  console.log(search);
  const [activeForm, setActiveForm] = useState(false);
  const data = [
    {
      label: 'Toyota Corolla',
      vin: '12345678901234567',
      make: 'Toyota',
      model: 'Corolla',
      year: 1999,
      color: 'Blanco',
      licensePlate: 'AA123BB',
      photo:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.motortrend.com%2Fuploads%2Fsites%2F10%2F2015%2F11%2F2014-toyota-corolla-l-at-sedan-angular-front.png&f=1&nofb=1&ipt=2b8e3cdf150823309a5c928c58f046c7fb8708c42c9a8b120868b498bc639861&ipo=images',
    },
    {
      label: 'Ford Focus',
      vin: '98765432109876543',
      make: 'Ford',
      model: 'Focus',
      year: 2015,
      color: 'Azul',
      licensePlate: 'BB456CC',
      photo:
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.imgur.com%2FArycCWP.png&f=1&nofb=1&ipt=1861cabb3d79ba69e2c31b12ea99d80785f4d8b95676c7e371f4d493d276bb25&ipo=images',
    },
    {
      label: 'Honda Civic',
      vin: '13579246801357924',
      make: 'Honda',
      model: 'Civic',
      year: 2020,
      color: 'Naranja',
      licensePlate: 'CC789DD',
      photo:
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fst.automobilemag.com%2Fuploads%2Fsites%2F10%2F2015%2F11%2F2014-honda-civic-si-sedan-angular-front.png&f=1&nofb=1&ipt=e31439d1dfd7060e97ec5b9d2b068a9593f58231a8a5dba75c67fb7337511993&ipo=images',
    },
    {
      label: 'Fiat Cronos',
      vin: '24681357902468135',
      make: 'Fiat',
      model: 'Cronos',
      year: 2018,
      color: 'Gris',
      licensePlate: 'DD321EE',
      photo:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcronos.fiat.com.ar%2Fassets%2Fimages%2Fimg-version-cronos-drive-13-mt-2.png&f=1&nofb=1&ipt=92d4b07357f4b4273e68015213bea393e99803cfdcb34fedc301a92bc2d99509&ipo=images',
    },
    {
      label: 'Toyota Hilux',
      vin: '31415926535897932',
      make: 'Toyota',
      model: 'Hilux',
      year: 2022,
      color: 'Rojo',
      licensePlate: 'EE654FF',
      photo:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngmart.com%2Ffiles%2F22%2FToyota-Hilux-PNG-File.png&f=1&nofb=1&ipt=82cd62675f3b3394f9254901badc4e3686e8f5f3065a1824a2f45d79ec0af99b&ipo=images',
    },
  ];
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
            {/* <CreateUserForm
              setActiveForm={setActiveForm}
              searchParams={searchParams}
            /> */}
          </motion.section>
        )}
      </AnimatePresence>

      <div className="relative mt-3 grid grid-cols-1 gap-4 overflow-x-auto overflow-y-auto shadow-xl sm:rounded-lg md:grid-cols-2 lg:grid-cols-3">
        {data.map((vehicle) => (
          <Card className="py-4" key={vehicle.vin}>
            <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
              <p className="text-tiny font-bold uppercase">{vehicle.label}</p>
              <small className="text-default-500">{vehicle.model}</small>
              <h4 className="text-large font-bold">{vehicle.licensePlate}</h4>
            </CardHeader>
            <CardBody className="items-center justify-center overflow-visible py-2">
              <Image
                alt="Card background"
                className="rounded-xl object-cover"
                src={vehicle.photo}
                width={270}
              />
            </CardBody>
            <CardFooter className="flex justify-between px-4 pt-2">
              <Link href={`/dashboard/vehicles/${vehicle?.vin}`}>
                <Button color="success" variant="light" size="sm">
                  Ver detalles
                </Button>
              </Link>
              <Button color="danger" variant="light">
                Eliminar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default FilterCreateVehicle;

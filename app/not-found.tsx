import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center p-6 ">
      <ExclamationTriangleIcon className="w-10 text-primary" />
      <h1 className="text-center text-lg mb-5">
        Por el momento no se encuentra disponible este sitio.
      </h1>
      <Link href="/">
        <Button color="primary" className="text-white">
          Volver
        </Button>
      </Link>
    </div>
  );
}
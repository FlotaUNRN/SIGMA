import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center p-6 ">
      <h1 className="text-center text-lg text-primary mb-5">
        Acá no hay nada maestro.
      </h1>
      <Link href="/">
        <Button color="primary" className="text-white">
          Volver
        </Button>
      </Link>
    </div>
  );
}
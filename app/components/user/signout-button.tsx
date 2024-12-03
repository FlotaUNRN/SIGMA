import { signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';

const SignoutButton = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button
        className="flex items-center justify-center md:w-full border-foreground px-5 py-2 text-foreground hover:border-primary hover:text-primary"
        variant="light"
        startContent={<PowerIcon className="w-6" />}
        type="submit"
        size="md"
      >
        <div className="hidden md:block text-medium">Cerrar sesión</div>
      </Button>
    </form>
  );
};

export default SignoutButton;

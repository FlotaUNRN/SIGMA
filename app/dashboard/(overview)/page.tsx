import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Dashboard() {
  return (
    <div className="flex w-full items-center justify-center h-full">
      <div className="flex flex-col justify-center align-middle">
        <span className="text-center text-xl font-bold ">SEDE ANDINA</span>
        <h1 className="text-center text-6xl font-bold text-primary md:text-9xl">
          SIGMA
        </h1>
        <span className="text-center text-lg md:text-xl">
          Sistema Integral de Gestión y Monitoreo Automotriz
        </span>
      </div>
    </div>
  );
}

// import { Button } from '@nextui-org/react';
// import Link from 'next/link';
import Footer from './components/footer';
import Header from './components/header';

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-grow flex-col items-center justify-center gap-8 p-6">
        <div className="flex flex-col justify-center align-middle">
          <span className="text-center text-xl font-bold ">SEDE ANDINA</span>
          <h1 className="text-center text-6xl md:text-9xl font-bold text-primary">SIGMA</h1>
          <span className="text-center text-lg md:text-xl">
            Sistema Integral de Gestión y Monitoreo Automotriz
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '200px',
            aspectRatio: 1,
            clipPath: 'polygon(0 100%,100% 0,100% 100%)',
            background: '#eb1f3f',
          }}
        ></div>
      </main>
      <Footer />
    </>
  );
}

'use client';

import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Search from '@/app/components/search';

interface Inspection {
  id: string;
  vehiculo: string;
  referencia: string;
  fecha: string;
  odometro: string;
  imagenes: {
    frente: string;
    ladoConductor: string;
    ladoPasajero: string;
    trasera: string;
  };
  alertasTablero: string[];
  fluidos: {
    aceiteMotor: string;
    transmision: string;
    diferencial: string;
    refrigerante: string;
    frenos: string;
    direccionHidraulica: string;
    limpiaparabrisas: string;
  };
  mangueras: {
    direccion: string;
    calefaccion: string;
  };
  correas: {
    serpentina: string;
    alternador: string;
  };
  filtros: {
    aire: string;
    combustible: string;
    aceite: string;
  };
  neumaticos: {
    delanteroDerecho: string;
    delanteroIzquierdo: string;
    traseroDerecho: string;
    traseroIzquierdo: string;
  };
  seguridad: {
    frenoEmergencia: string;
    limpiaparabrisasDelantero: string;
    limpiaparabrisasTrasero: string;
  };
  notas: string;
  estado: string;
}

export default function InspectionsList({ searchParams }) {
  const [activeForm, setActiveForm] = useState(false);
  
  const inspections: Inspection[] = [
    {
      id: '1',
      vehiculo: 'Subaru Forrester',
      referencia: 'VEH-001',
      fecha: '01/01/2021 20:04:10',
      odometro: '80.000',
      imagenes: {
        frente: '/api/placeholder/800/600',
        ladoConductor: '/api/placeholder/800/600',
        ladoPasajero: '/api/placeholder/800/600',
        trasera: '/api/placeholder/800/600'
      },
      alertasTablero: ['Presión de Neumáticos', 'ABS', 'Nivel de Aceite Bajo'],
      fluidos: {
        aceiteMotor: 'OK',
        transmision: 'OK',
        diferencial: 'OK',
        refrigerante: 'OK',
        frenos: 'Lleno',
        direccionHidraulica: 'Requiere Atención',
        limpiaparabrisas: 'Lleno'
      },
      mangueras: {
        direccion: 'OK',
        calefaccion: 'OK'
      },
      correas: {
        serpentina: 'OK',
        alternador: 'Atención Futura'
      },
      filtros: {
        aire: 'Requiere Atención',
        combustible: 'OK',
        aceite: 'OK'
      },
      neumaticos: {
        delanteroDerecho: 'OK',
        delanteroIzquierdo: 'OK',
        traseroDerecho: 'Atención Futura',
        traseroIzquierdo: 'Atención Futura'
      },
      seguridad: {
        frenoEmergencia: 'OK',
        limpiaparabrisasDelantero: 'OK',
        limpiaparabrisasTrasero: 'OK'
      },
      notas: 'El vehículo está en buen estado, pero necesita una puesta a punto. Se recomienda revisar el estado de las correas.',
      estado: 'Completado'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
    case 'Completado':
      return 'bg-success/10 text-success';
    case 'Pendiente':
      return 'bg-warning/10 text-warning';
    case 'Requiere Atención':
      return 'bg-danger/10 text-danger';
    default:
      return 'bg-default/10 text-default';
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <Search placeholder="Buscar inspecciones..." />
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
                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                />
              </svg>
            }
            className="text-black"
          >
            Nueva Inspección
          </Button>
        </div>
      </div>

      <div className="relative mt-3 grid grid-cols-1 gap-4 overflow-x-auto overflow-y-auto shadow-xl sm:rounded-lg md:grid-cols-2 lg:grid-cols-3">
        {inspections.map((inspection) => (
          <Link href={`/dashboard/inspections/${inspection.id}`} key={inspection.id}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{inspection.vehiculo}</h3>
                  <p className="text-small text-default-500">Ref: {inspection.referencia}</p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${getStatusColor(inspection.estado)}`}>
                  {inspection.estado}
                </span>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  <p className="text-small">
                    <span className="font-medium">Fecha: </span>
                    {inspection.fecha}
                  </p>
                  <p className="text-small">
                    <span className="font-medium">Odómetro: </span>
                    {inspection.odometro} km
                  </p>
                  {inspection.alertasTablero.length > 0 && (
                    <div>
                      <p className="text-small font-medium">Alertas:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {inspection.alertasTablero.map((alerta, index) => (
                          <span key={index} className="px-2 py-1 bg-danger/10 text-danger rounded text-small">
                            {alerta}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {Object.entries(inspection.fluidos).some(([_, value]) => value === 'Requiere Atención') && (
                    <div className="mt-2">
                      <span className="text-small bg-warning/10 text-warning px-2 py-1 rounded">
                        Requiere revisión de fluidos
                      </span>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
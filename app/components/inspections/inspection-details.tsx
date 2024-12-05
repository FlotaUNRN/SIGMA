'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader, Image, Button, Input, Select, SelectItem } from '@nextui-org/react';
import Link from 'next/link';

export default function InspectionDetails({ id }: { id: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inspectionData, setInspectionData] = useState({
    vehiculo: 'Subaru Forrester',
    referencia: 'VEH-001',
    fecha: '1/1/2021 20:04:10',
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
      delanteroIzquierdo: 'OK',
      traseroIzquierdo: 'OK',
      delanteroDerecho: 'Atención Futura',
      traseroDerecho: 'Atención Futura'
    },
    seguridad: {
      frenoEmergencia: 'OK',
      limpiaparabrisasDelantero: 'OK',
      limpiaparabrisasTrasero: 'OK'
    },
    notas: 'El vehículo está en buen estado, pero necesita una puesta a punto. Se recomienda revisar el estado de las correas.'
  });

  const statusOptions = ['OK', 'Requiere Atención', 'Atención Futura', 'Lleno'];

  const handleInputChange = (section, field, value) => {
    setInspectionData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'OK':
        return 'text-success';
      case 'Requiere Atención':
        return 'text-danger';
      case 'Atención Futura':
        return 'text-warning';
      default:
        return 'text-default';
    }
  };

  const renderField = (section, field, value) => {
    if (isEditing) {
      return (
        <Select
          size="sm"
          value={value}
          className="min-w-[200px]"
          onChange={(e) => handleInputChange(section, field, e.target.value)}
        >
          {statusOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </Select>
      );
    }
    return (
      <div className="min-w-[200px] px-3 py-1.5 rounded bg-default-100">
        <span className={getStatusColor(value)}>{value}</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/dashboard/inspections" className="text-primary hover:underline mb-3 block">
            ← Volver a inspecciones
          </Link>
          <h1 className="text-2xl font-bold">Inspección del {inspectionData.vehiculo}</h1>
        </div>
        <Button 
          color="primary"
          size="lg"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Guardar Cambios' : 'Editar Inspección'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-md">
          <CardHeader className="border-b border-divider">
            <h3 className="text-lg font-semibold">Información Básica</h3>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <span className="text-small text-default-500">Vehículo</span>
                {isEditing ? (
                  <Input 
                    value={inspectionData.vehiculo}
                    className="w-full"
                    size="lg"
                    onChange={(e) => setInspectionData({...inspectionData, vehiculo: e.target.value})}
                  />
                ) : (
                  <div className="w-full p-3 rounded-md bg-default-100 min-h-[44px] flex items-center">
                    {inspectionData.vehiculo}
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <span className="text-small text-default-500">Odómetro</span>
                {isEditing ? (
                  <Input 
                    value={inspectionData.odometro}
                    className="w-full"
                    size="lg"
                    endContent={<span className="text-default-400">km</span>}
                    onChange={(e) => setInspectionData({...inspectionData, odometro: e.target.value})}
                  />
                ) : (
                  <div className="w-full p-3 rounded-md bg-default-100 min-h-[44px] flex items-center">
                    {inspectionData.odometro} km
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <span className="text-small text-default-500">Fecha/Hora</span>
                <div className="w-full p-3 rounded-md bg-default-100 min-h-[44px] flex items-center">
                  {inspectionData.fecha}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="border-b border-divider">
            <h3 className="text-lg font-semibold">Imágenes del Vehículo</h3>
          </CardHeader>
          <CardBody className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(inspectionData.imagenes).map(([key, url]) => (
                <div key={key} className="aspect-video">
                  <Image
                    src={url}
                    alt={`Vista ${key}`}
                    className="object-cover rounded-lg w-full h-full"
                  />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="border-b border-divider">
            <h3 className="text-lg font-semibold">Fluidos</h3>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              {Object.entries(inspectionData.fluidos).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center gap-4">
                  <span className="capitalize min-w-[150px]">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  {renderField('fluidos', key, value)}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="border-b border-divider">
            <h3 className="text-lg font-semibold">Neumáticos</h3>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              {Object.entries(inspectionData.neumaticos).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center gap-4">
                  <span className="capitalize min-w-[150px]">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  {renderField('neumaticos', key, value)}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="border-b border-divider">
            <h3 className="text-lg font-semibold">Filtros</h3>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              {Object.entries(inspectionData.filtros).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center gap-4">
                  <span className="capitalize min-w-[150px]">{key}</span>
                  {renderField('filtros', key, value)}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="border-b border-divider">
            <h3 className="text-lg font-semibold">Seguridad</h3>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              {Object.entries(inspectionData.seguridad).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center gap-4">
                  <span className="capitalize min-w-[150px]">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  {renderField('seguridad', key, value)}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-md md:col-span-2">
          <CardHeader className="border-b border-divider">
            <h3 className="text-lg font-semibold">Mangueras y Correas</h3>
          </CardHeader>
          <CardBody className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-4">Mangueras</h4>
                <div className="space-y-4">
                  {Object.entries(inspectionData.mangueras).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center gap-4">
                      <span className="capitalize min-w-[150px]">{key}</span>
                      {renderField('mangueras', key, value)}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-4">Correas</h4>
                <div className="space-y-4">
                  {Object.entries(inspectionData.correas).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center gap-4">
                      <span className="capitalize min-w-[150px]">{key}</span>
                      {renderField('correas', key, value)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-md md:col-span-2">
          <CardHeader className="border-b border-divider">
            <h3 className="text-lg font-semibold">Notas</h3>
          </CardHeader>
          <CardBody className="p-6">
            {isEditing ? (
              <Input
                value={inspectionData.notas}
                className="w-full"
                onChange={(e) => setInspectionData({...inspectionData, notas: e.target.value})}
              />
            ) : (
              <p className="px-3 py-1.5 rounded bg-default-100">{inspectionData.notas}</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}


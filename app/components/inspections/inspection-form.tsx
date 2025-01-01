import React, { useState } from 'react';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { Input } from '@/app/components/form/input';
import { createInspection } from '@/app/lib/actions';
import { toast } from 'sonner';
import {
  useInspections,
  useTotalInspectionsPages,
  useTotalInspections,
} from '@/hooks/swr-hooks';

const statusOptions = ['Completado', 'Pendiente', 'En Proceso'];
const fluidStatusOptions = ['OK', 'Requiere Atención', 'Atención Futura', 'Lleno'];
const componentStatusOptions = ['OK', 'Requiere Atención', 'Atención Futura'];

export const InspectionForm = ({
  vehicleId,
  setActiveForm,
  searchParams,
}: {
  vehicleId: string;
  setActiveForm: (activeForm: boolean) => void;
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;
  const { mutateInspections } = useInspections(query, currentPage);
  const { totalInspectionsPages, mutateTotalInspectionsPages } = useTotalInspectionsPages();
  const { totalInspections, mutateTotalInspections } = useTotalInspections();
  const [loading, setLoading] = useState(false);
  const [trySubmit, setTrySubmit] = useState(false);

  const [formData, setFormData] = useState({
    inspection_date: '',
    odometer_reading: '',
    status: 'Pendiente',
    front_image_url: '',
    driver_side_image_url: '',
    passenger_side_image_url: '',
    back_image_url: '',
    engine_oil_status: 'OK',
    transmission_status: 'OK',
    differential_status: 'OK',
    coolant_status: 'OK',
    brake_fluid_status: 'OK',
    power_steering_status: 'OK',
    wiper_fluid_status: 'OK',
    steering_hose_status: 'OK',
    heater_hose_status: 'OK',
    serpentine_belt_status: 'OK',
    alternator_belt_status: 'OK',
    air_filter_status: 'OK',
    fuel_filter_status: 'OK',
    oil_filter_status: 'OK',
    front_left_tire_status: 'OK',
    front_right_tire_status: 'OK',
    rear_left_tire_status: 'OK',
    rear_right_tire_status: 'OK',
    emergency_brake_status: 'OK',
    front_wiper_status: 'OK',
    rear_wiper_status: 'OK',
    notes: ''
  });

  const [dateError, setDateError] = useState(false);
  const [odometerError, setOdometerError] = useState(false);

  const validateDate = (date: string) => {
    if (!date) {
      setDateError(true);
      return false;
    }
    setDateError(false);
    return true;
  };

  const validateOdometer = (odometer: string) => {
    const value = Number(odometer);
    if (isNaN(value) || value < 0) {
      setOdometerError(true);
      return false;
    }
    setOdometerError(false);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTrySubmit(true);

    if (!validateDate(formData.inspection_date) || !validateOdometer(formData.odometer_reading)) {
      return;
    }

    setLoading(true);
    const formDataObj = new FormData(e.currentTarget);
    formDataObj.set('vehicle_id', vehicleId);

    toast.promise(
      createInspection(formDataObj)
        .then(() => {
          mutateTotalInspections(totalInspections + 1, false);
          if (totalInspections % 6 === 0) {
            mutateTotalInspectionsPages(totalInspectionsPages + 1, false);
          }
          mutateInspections();
          setActiveForm(false);
        })
        .catch((error) => {
          console.error('Error creating inspection:', error);
          throw error;
        })
        .finally(() => {
          setLoading(false);
        }),
      {
        loading: 'Creando inspección...',
        success: 'Inspección creada exitosamente',
        error: 'Error al crear la inspección',
      }
    );
  };

  const commonInputClasses = {
    label: 'text-default-600 font-normal',
    input: 'font-normal'
  };

  const commonSelectClasses = {
    label: 'text-default-600 font-normal',
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 rounded-lg bg-lightPaper p-6 shadow-xl dark:bg-darkPaper">
      <div className="grid grid-cols-1 gap-6">
        {/* Información básica */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col">
            <Input
              type="datetime-loca l"
              label="Fecha y Hora"
              name="inspection_date"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Seleccionar fecha y hora"
              value={formData.inspection_date}
              onValueChange={(value) => {
                setFormData({ ...formData, inspection_date: value });
                if (trySubmit) validateDate(value);
              }}
              isRequired
              isInvalid={trySubmit && dateError}
              errorMessage={dateError ? 'Ingrese una fecha válida' : ''}
              classNames={commonInputClasses}
            />
          </div>

          <div className="flex flex-col">
            <Input
              label="Lectura del Odómetro"
              name="odometer_reading"
              type="number"
              variant="bordered"
              labelPlacement="outside"
              value={formData.odometer_reading}
              onValueChange={(value) => {
                setFormData({ ...formData, odometer_reading: value });
                if (trySubmit) validateOdometer(value);
              }}
              placeholder="Ej: 50000"
              isRequired
              isInvalid={trySubmit && odometerError}
              errorMessage={odometerError ? 'Ingrese un kilometraje válido' : ''}
              endContent={<div className="pointer-events-none text-default-400 text-small">km</div>}
              classNames={commonInputClasses}
            />
          </div>

          <div className="flex flex-col">
            <Select
              label="Estado"
              name="status"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Seleccionar estado"
              selectedKeys={[formData.status]}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              isRequired
              classNames={commonSelectClasses}
            >
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* URLs de imágenes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-default-700">Imágenes del Vehículo</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { key: 'front_image_url', label: 'Imagen Frontal' },
              { key: 'driver_side_image_url', label: 'Imagen Lateral Conductor' },
              { key: 'passenger_side_image_url', label: 'Imagen Lateral Pasajero' },
              { key: 'back_image_url', label: 'Imagen Trasera' }
            ].map(({ key, label }) => (
              <div key={key} className="flex flex-col">
                <Input
                  label={label}
                  name={key}
                  type="text"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder={`URL de la ${label.toLowerCase()}`}
                  value={formData[key as keyof typeof formData] as string}
                  onValueChange={(value) => setFormData({ ...formData, [key]: value })}
                  classNames={commonInputClasses}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Estado de Fluidos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-default-700">Estado de Fluidos</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { key: 'engine_oil_status', label: 'Aceite de Motor' },
              { key: 'transmission_status', label: 'Transmisión' },
              { key: 'differential_status', label: 'Diferencial' },
              { key: 'coolant_status', label: 'Refrigerante' },
              { key: 'brake_fluid_status', label: 'Líquido de Frenos' },
              { key: 'power_steering_status', label: 'Dirección Hidráulica' },
              { key: 'wiper_fluid_status', label: 'Limpiaparabrisas' }
            ].map(({ key, label }) => (
              <div key={key} className="flex flex-col">
                <Select
                  label={label}
                  name={key}
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder={'Seleccionar estado'}
                  selectedKeys={[formData[key as keyof typeof formData] as string]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  isRequired
                  classNames={commonSelectClasses}
                >
                  {fluidStatusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            ))}
          </div>
        </div>

        {/* Mangueras y Correas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-default-700">Mangueras y Correas</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { key: 'steering_hose_status', label: 'Manguera de Dirección' },
              { key: 'heater_hose_status', label: 'Manguera del Calefactor' },
              { key: 'serpentine_belt_status', label: 'Correa Serpentina' },
              { key: 'alternator_belt_status', label: 'Correa del Alternador' }
            ].map(({ key, label }) => (
              <div key={key} className="flex flex-col">
                <Select
                  label={label}
                  name={key}
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder={'Seleccionar estado'}
                  selectedKeys={[formData[key as keyof typeof formData] as string]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  isRequired
                  classNames={commonSelectClasses}
                >
                  {componentStatusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            ))}
          </div>
        </div>

        {/* Filtros */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-default-700">Filtros</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { key: 'air_filter_status', label: 'Filtro de Aire' },
              { key: 'fuel_filter_status', label: 'Filtro de Combustible' },
              { key: 'oil_filter_status', label: 'Filtro de Aceite' }
            ].map(({ key, label }) => (
              <div key={key} className="flex flex-col">
                <Select
                  label={label}
                  name={key}
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder={'Seleccionar estado'}
                  selectedKeys={[formData[key as keyof typeof formData] as string]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  isRequired
                  classNames={commonSelectClasses}
                >
                  {componentStatusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            ))}
          </div>
        </div>

        {/* Neumáticos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-default-700">Estado de Neumáticos</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { key: 'front_left_tire_status', label: 'Neumático Delantero Izquierdo' },
              { key: 'front_right_tire_status', label: 'Neumático Delantero Derecho' },
              { key: 'rear_left_tire_status', label: 'Neumático Trasero Izquierdo' },
              { key: 'rear_right_tire_status', label: 'Neumático Trasero Derecho' }
            ].map(({ key, label }) => (
              <Select
                key={key}
                label={label}
                name={key}
                variant="bordered"
                labelPlacement="outside"
                placeholder={`Seleccionar estado de ${label.toLowerCase()}`}
                selectedKeys={[formData[key as keyof typeof formData] as string]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                isRequired
                classNames={commonSelectClasses}
              >
                {componentStatusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </Select>
            ))}
          </div>
        </div>

        {/* Sistemas de Seguridad */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-default-700">Sistemas de Seguridad</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { key: 'emergency_brake_status', label: 'Freno de Emergencia' },
              { key: 'front_wiper_status', label: 'Limpiaparabrisas Delantero' },
              { key: 'rear_wiper_status', label: 'Limpiaparabrisas Trasero' }
            ].map(({ key, label }) => (
              <Select
                key={key}
                label={label}
                name={key}
                variant="bordered"
                labelPlacement="outside"
                placeholder={`Seleccionar estado de ${label.toLowerCase()}`}
                selectedKeys={[formData[key as keyof typeof formData] as string]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                isRequired
                classNames={commonSelectClasses}
              >
                {componentStatusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </Select>
            ))}
          </div>
        </div>

        {/* Notas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-default-700">Notas Adicionales</h3>
          <Input
            name="notes"
            type="text"
            variant="bordered"
            labelPlacement="outside"
            value={formData.notes}
            onValueChange={(value) => setFormData({ ...formData, notes: value })}
            placeholder="Ingrese notas adicionales sobre la inspección"
            classNames={commonInputClasses}
          />
        </div>

        {/* Botones de acción */}
        <div className="flex items-end justify-end">
          <div className="ml-2 flex flex-col gap-1 md:flex-row">
            <Button
              size="sm"
              color="success"
              variant="bordered"
              type="submit"
              isLoading={loading}
              onClick={() => {
                setTrySubmit(true);
              }}
              isDisabled={loading}
              endContent={
                !loading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                )
              }
            />
            <Button
              size="sm"
              color="danger"
              variant="bordered"
              onClick={() => {
                setTrySubmit(false);
                setActiveForm(false);
              }}
              endContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
};
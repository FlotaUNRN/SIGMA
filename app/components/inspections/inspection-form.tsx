import React from 'react';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { Input } from '@/app/components/form/input';
import { useState } from 'react';
import { createInspection } from '@/app/lib/actions';
import { toast } from 'sonner';
import {
  useInspections,
  useTotalInspectionsPages,
  useTotalInspections,
} from '@/hooks/swr-hooks';

type InspectionFormProps = {
  vehicleId: string;
  onCancel: () => void;
  setActiveForm: (activeForm: boolean) => void;
  searchParams?: {
    query?: string;
    page?: string;
  };
};

const statusOptions = ['Completado', 'Pendiente', 'En Proceso'];
const fluidStatusOptions = ['OK', 'Requiere Atención', 'Atención Futura', 'Lleno'];
const componentStatusOptions = ['OK', 'Requiere Atención', 'Atención Futura'];

export const InspectionForm = ({
  vehicleId,
  onCancel,
  setActiveForm,
  searchParams,
}: InspectionFormProps) => {
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

  // Estados de error
  const [dateError, setDateError] = useState(false);
  const [odometerError, setOdometerError] = useState(false);

  // Funciones de validación
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

    // Validar campos requeridos
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

  return (
    <form onSubmit={handleSubmit} className="mt-2 rounded-lg bg-lightPaper p-6 shadow-xl dark:bg-darkPaper">
      <div className="grid grid-cols-1 gap-6">
        {/* Información básica */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Input
              label="Fecha"
              name="inspection_date"
              type="datetime-local"
              variant="bordered"
              labelPlacement="outside"
              placeholder=" "
              value={formData.inspection_date}
              onValueChange={(value) => {
                setFormData({ ...formData, inspection_date: value });
                if (trySubmit) validateDate(value);
              }}
              isRequired
              isInvalid={trySubmit && dateError}
              errorMessage={dateError ? "Ingrese una fecha válida" : ""}
              description="Ingrese la fecha y hora en que se realiza la inspección"
              classNames={{
                label: "text-default-600 font-normal",
                input: "font-normal"
              }}
            />

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
            errorMessage={odometerError ? "Ingrese un kilometraje válido" : ""}
            description="Ingrese el kilometraje actual del vehículo"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">km</span>
              </div>
            }
          />

          <Select
            label="Estado"
            name="status"
            variant="bordered"
            labelPlacement="outside"
            selectedKeys={[formData.status]}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            description="Seleccione el estado actual de la inspección"
          >
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* URLs de imágenes */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Imágenes del Vehículo</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Imagen Frontal"
              name="front_image_url"
              type="text"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ingrese la URL de la imagen frontal"
              value={formData.front_image_url}
              onValueChange={(value) => setFormData({ ...formData, front_image_url: value })}
              classNames={{
                label: "text-default-600 font-normal",
                input: "font-normal"
              }}
            />
            <Input
              label="Imagen Lateral Conductor"
              name="driver_side_image_url"
              type="text"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ingrese la URL de la imagen del conductor"
              value={formData.driver_side_image_url}
              onValueChange={(value) => setFormData({ ...formData, driver_side_image_url: value })}
              classNames={{
                label: "text-default-600 font-normal",
                input: "font-normal"
              }}
            />
            <Input
              label="Imagen Lateral Pasajero"
              name="passenger_side_image_url"
              type="text"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ingrese la URL de la imagen del pasajero"
              value={formData.passenger_side_image_url}
              onValueChange={(value) => setFormData({ ...formData, passenger_side_image_url: value })}
              classNames={{
                label: "text-default-600 font-normal",
                input: "font-normal"
              }}
            />
            <Input
              label="Imagen Trasera"
              name="back_image_url"
              type="text"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ingrese la URL de la imagen trasera"
              value={formData.back_image_url}
              onValueChange={(value) => setFormData({ ...formData, back_image_url: value })}
              classNames={{
                label: "text-default-600 font-normal",
                input: "font-normal"
              }}
            />
          </div>
        </div>

        

        {/* Estado de Fluidos */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Estado de Fluidos</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { key: 'engine_oil_status', label: 'Aceite de Motor', description: 'Estado del aceite del motor' },
              { key: 'transmission_status', label: 'Transmisión', description: 'Estado del fluido de transmisión' },
              { key: 'differential_status', label: 'Diferencial', description: 'Estado del fluido del diferencial' },
              { key: 'coolant_status', label: 'Refrigerante', description: 'Estado del líquido refrigerante' },
              { key: 'brake_fluid_status', label: 'Líquido de Frenos', description: 'Estado del líquido de frenos' },
              { key: 'power_steering_status', label: 'Dirección Hidráulica', description: 'Estado del líquido de dirección hidráulica' },
              { key: 'wiper_fluid_status', label: 'Limpiaparabrisas', description: 'Estado del líquido limpiaparabrisas' },
            ].map(({ key, label, description }) => (
              <Select
                key={key}
                label={label}
                name={key}
                variant="bordered"
                labelPlacement="outside"
                selectedKeys={[formData[key as keyof typeof formData]]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                description={`Seleccione el ${description.toLowerCase()}`}
              >
                {fluidStatusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </Select>
            ))}
          </div>
        </div>

        {/* Mangueras y Correas */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Mangueras y Correas</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { key: 'steering_hose_status', label: 'Manguera de Dirección', description: 'Estado de la manguera de dirección' },
              { key: 'heater_hose_status', label: 'Manguera del Calefactor', description: 'Estado de la manguera del calefactor' },
              { key: 'serpentine_belt_status', label: 'Correa Serpentina', description: 'Estado de la correa serpentina' },
              { key: 'alternator_belt_status', label: 'Correa del Alternador', description: 'Estado de la correa del alternador' },
            ].map(({ key, label, description }) => (
              <Select
                key={key}
                label={label}
                name={key}
                variant="bordered"
                labelPlacement="outside"
                selectedKeys={[formData[key as keyof typeof formData]]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                description={`Seleccione el ${description.toLowerCase()}`}
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

        {/* Filtros */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Filtros</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { key: 'air_filter_status', label: 'Filtro de Aire', description: 'Estado del filtro de aire' },
              { key: 'fuel_filter_status', label: 'Filtro de Combustible', description: 'Estado del filtro de combustible' },
              { key: 'oil_filter_status', label: 'Filtro de Aceite', description: 'Estado del filtro de aceite' },
            ].map(({ key, label, description }) => (
              <Select
                key={key}
                label={label}
                name={key}
                variant="bordered"
                labelPlacement="outside"
                selectedKeys={[formData[key as keyof typeof formData]]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                description={`Seleccione el ${description.toLowerCase()}`}
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

        {/* Neumáticos */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Estado de Neumáticos</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { key: 'front_left_tire_status', label: 'Neumático Delantero Izquierdo', description: 'Estado del neumático delantero izquierdo' },
              { key: 'front_right_tire_status', label: 'Neumático Delantero Derecho', description: 'Estado del neumático delantero derecho' },
              { key: 'rear_left_tire_status', label: 'Neumático Trasero Izquierdo', description: 'Estado del neumático trasero izquierdo' },
              { key: 'rear_right_tire_status', label: 'Neumático Trasero Derecho', description: 'Estado del neumático trasero derecho' },
            ].map(({ key, label, description }) => (
              <Select
                key={key}
                label={label}
                name={key}
                variant="bordered"
                labelPlacement="outside"
                selectedKeys={[formData[key as keyof typeof formData]]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                description={`Seleccione el ${description.toLowerCase()}`}
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
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Sistemas de Seguridad</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { key: 'emergency_brake_status', label: 'Freno de Emergencia', description: 'Estado del freno de emergencia' },
              { key: 'front_wiper_status', label: 'Limpiaparabrisas Delantero', description: 'Estado del limpiaparabrisas delantero' },
              { key: 'rear_wiper_status', label: 'Limpiaparabrisas Trasero', description: 'Estado del limpiaparabrisas trasero' },
            ].map(({ key, label, description }) => (
              <Select
                key={key}
                label={label}
                name={key}
                variant="bordered"
                labelPlacement="outside"
                selectedKeys={[formData[key as keyof typeof formData]]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                description={`Seleccione el ${description.toLowerCase()}`}
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
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Notas Adicionales</h3>
          <Input
            label="Notas"
            name="notes"
            type="text"
            variant="bordered"
            labelPlacement="outside"
            value={formData.notes}
            onValueChange={(value) => setFormData({ ...formData, notes: value })}
            placeholder="Ingrese notas adicionales sobre la inspección"
            description="Agregue cualquier observación relevante sobre la inspección"
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
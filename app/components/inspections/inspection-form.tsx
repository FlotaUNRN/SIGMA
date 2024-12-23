'use client';
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

  const [formData, setFormData] = useState({
    vehicle_id: vehicleId,
    reference_code: '',
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
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formDataObj = new FormData(e.currentTarget);
    
    // Convertir el odometer_reading a número antes de enviarlo
    formDataObj.set('odometer_reading', String(Number(formDataObj.get('odometer_reading'))));

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="vehicle_id" value={vehicleId} />
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Input
          isRequired
          label="Código de Referencia"
          name="reference_code"
          value={formData.reference_code}
          onChange={(e) => setFormData({ ...formData, reference_code: e.target.value })}
          className="w-full"
        />
        
        <Input
          isRequired
          type="datetime-local"
          label="Fecha de Inspección"
          name="inspection_date"
          value={formData.inspection_date}
          onChange={(e) => setFormData({ ...formData, inspection_date: e.target.value })}
          className="w-full"
          classNames={{
            input: 'px-3',
            label: 'pb-2',
          }}
        />
        
        <Input
          isRequired
          type="number"
          min="0"
          step="1"
          label="Lectura del Odómetro"
          name="odometer_reading"
          value={formData.odometer_reading}
          onChange={(e) => {
            const value = e.target.value;
            if (Number(value) >= 0) {
              setFormData({ ...formData, odometer_reading: value });
            }
          }}
          className="w-full"
          placeholder="Ingrese la lectura del odómetro en kilómetros"
        />

        <Select
          label="Estado"
          name="status"
          selectedKeys={[formData.status]}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Imágenes</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="URL Imagen Frontal"
            name="front_image_url"
            value={formData.front_image_url}
            onChange={(e) => setFormData({ ...formData, front_image_url: e.target.value })}
          />
          <Input
            label="URL Imagen Lateral Conductor"
            name="driver_side_image_url"
            value={formData.driver_side_image_url}
            onChange={(e) => setFormData({ ...formData, driver_side_image_url: e.target.value })}
          />
          <Input
            label="URL Imagen Lateral Pasajero"
            name="passenger_side_image_url"
            value={formData.passenger_side_image_url}
            onChange={(e) => setFormData({ ...formData, passenger_side_image_url: e.target.value })}
          />
          <Input
            label="URL Imagen Trasera"
            name="back_image_url"
            value={formData.back_image_url}
            onChange={(e) => setFormData({ ...formData, back_image_url: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Estado de Fluidos</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { key: 'engine_oil_status', label: 'Aceite de Motor' },
            { key: 'transmission_status', label: 'Transmisión' },
            { key: 'differential_status', label: 'Diferencial' },
            { key: 'coolant_status', label: 'Refrigerante' },
            { key: 'brake_fluid_status', label: 'Líquido de Frenos' },
            { key: 'power_steering_status', label: 'Dirección Hidráulica' },
            { key: 'wiper_fluid_status', label: 'Líquido Limpiaparabrisas' },
          ].map(({ key, label }) => (
            <Select
              key={key}
              label={label}
              name={key}
              selectedKeys={[formData[key as keyof typeof formData]]}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
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

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Estado de Componentes</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { key: 'steering_hose_status', label: 'Manguera de Dirección' },
            { key: 'heater_hose_status', label: 'Manguera del Calefactor' },
            { key: 'serpentine_belt_status', label: 'Correa Serpentina' },
            { key: 'alternator_belt_status', label: 'Correa del Alternador' },
            { key: 'air_filter_status', label: 'Filtro de Aire' },
            { key: 'fuel_filter_status', label: 'Filtro de Combustible' },
            { key: 'oil_filter_status', label: 'Filtro de Aceite' },
          ].map(({ key, label }) => (
            <Select
              key={key}
              label={label}
              name={key}
              selectedKeys={[formData[key as keyof typeof formData]]}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
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

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Estado de Neumáticos</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            { key: 'front_left_tire_status', label: 'Neumático Delantero Izquierdo' },
            { key: 'front_right_tire_status', label: 'Neumático Delantero Derecho' },
            { key: 'rear_left_tire_status', label: 'Neumático Trasero Izquierdo' },
            { key: 'rear_right_tire_status', label: 'Neumático Trasero Derecho' },
          ].map(({ key, label }) => (
            <Select
              key={key}
              label={label}
              name={key}
              selectedKeys={[formData[key as keyof typeof formData]]}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
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

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Estado de Seguridad</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { key: 'emergency_brake_status', label: 'Freno de Emergencia' },
            { key: 'front_wiper_status', label: 'Limpiaparabrisas Delantero' },
            { key: 'rear_wiper_status', label: 'Limpiaparabrisas Trasero' },
          ].map(({ key, label }) => (
            <Select
              key={key}
              label={label}
              name={key}
              selectedKeys={[formData[key as keyof typeof formData]]}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
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

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Notas</h3>
        <Input
          label="Notas adicionales"
          name="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          color="danger"
          variant="light"
          onClick={onCancel}
          isDisabled={loading}
        >
          Atrás
        </Button>
        <Button
          color="success"
          type="submit"
          isLoading={loading}
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
        >
          Crear Inspección
        </Button>
      </div>
    </form>
  );
};
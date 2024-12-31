import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem } from '@nextui-org/react';
import { useAvailableVehicles } from '@/hooks/useAvailableVehicles';
import { createVehicleAssignment } from '@/app/lib/actions';
import { useEmployeeVehicleAssignments } from '@/hooks/useEmployees';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface VehicleAssignmentFormProps {
  employeeId: string;
  onClose: () => void;
}

export function VehicleAssignmentForm({ employeeId, onClose }: VehicleAssignmentFormProps) {
  const { vehicles, isLoading, mutateVehicles } = useAvailableVehicles();
  const { mutateAssignments } = useEmployeeVehicleAssignments(employeeId);
  
  const [formData, setFormData] = useState({
    vehicle_id: '',
    start_date: format(new Date(), 'yyyy-MM-dd'),
    end_date: '',
    status: 'Activa',
    notes: ''
  });

  const [validationErrors, setValidationErrors] = useState({
    vehicle_id: false,
    start_date: false
  });

  const validateForm = () => {
    const errors = {
      vehicle_id: !formData.vehicle_id,
      start_date: !formData.start_date
    };
    setValidationErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    const form = new FormData();
    form.append('employee_id', employeeId);
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    toast.promise(
      createVehicleAssignment(form)
        .then(() => {
          mutateVehicles(); 
          mutateAssignments();
          onClose();
        }),
      {
        loading: 'Asignando vehículo...',
        success: 'Vehículo asignado exitosamente',
        error: 'Error al asignar vehículo'
      }
    );
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <CardBody>
          <div className="flex justify-center">
            Cargando vehículos disponibles...
          </div>
        </CardBody>
      </Card>
    );
  }

  const availableVehicles = vehicles || [];

  return (
    <Card className="p-6">
      <CardHeader className="pb-6">
        <h3 className="text-xl font-semibold">Asignar Vehículo</h3>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-12">
            <Select
              label="Vehículo"
              labelPlacement="outside"
              placeholder="Seleccionar vehículo"
              isRequired
              selectedKeys={formData.vehicle_id ? [formData.vehicle_id] : []}
              onChange={(e) => setFormData({ ...formData, vehicle_id: e.target.value })}
              isInvalid={validationErrors.vehicle_id}
              errorMessage={validationErrors.vehicle_id && 'Selecciona un vehículo'}
              classNames={{
                label: 'pb-1',
                trigger: 'h-13'
              }}
            >
              {availableVehicles.map((vehicle) => (
                <SelectItem 
                  key={vehicle.id} 
                  value={vehicle.id}
                  textValue={`${vehicle.make} ${vehicle.model} - ${vehicle.license_plate}`}
                >
                  <div className="flex flex-col">
                    <span className="text-medium">{vehicle.make} {vehicle.model}</span>
                    <span className="text-small text-default-400">Patente: {vehicle.license_plate}</span>
                  </div>
                </SelectItem>
              ))}
            </Select>

            <Input
              type="date"
              label="Fecha de inicio"
              labelPlacement="outside"
              placeholder="Seleccionar fecha"
              isRequired
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              isInvalid={validationErrors.start_date}
              errorMessage={validationErrors.start_date && 'La fecha de inicio es requerida'}
              classNames={{
                label: 'pb-1',
                input: 'h-13'
              }}
            />

            <Input
              type="date"
              label="Fecha de fin (opcional)"
              labelPlacement="outside"
              placeholder="Seleccionar fecha"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              min={formData.start_date}
              classNames={{
                label: 'pb-1',
                input: 'h-13'
              }}
            />

            <Select
              label="Estado"
              labelPlacement="outside"
              placeholder="Seleccionar estado"
              isRequired
              selectedKeys={[formData.status]}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              classNames={{
                label: 'pb-1',
                trigger: 'h-13'
              }}
            >
              <SelectItem key="Activa" textValue="Activa">Activa</SelectItem>
              <SelectItem key="Finalizada" textValue="Finalizada">Finalizada</SelectItem>
              <SelectItem key="Cancelada" textValue="Cancelada">Cancelada</SelectItem>
            </Select>

            <Input
              label="Notas"
              labelPlacement="outside"
              placeholder="Notas adicionales sobre la asignación"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              classNames={{
                label: 'pb-1',
                input: 'h-13'
              }}
            />
          </div>

          <div className="flex items-end justify-end">
            <div className="ml-2 flex flex-col gap-1 md:flex-row">
              <Button
                size="sm"
                color="success"
                variant="bordered"
                type="submit"
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
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                }
              />
              <Button
                size="sm"
                color="danger"
                variant="bordered"
                onClick={onClose}
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
        </form>
      </CardBody>
    </Card>
  );
}
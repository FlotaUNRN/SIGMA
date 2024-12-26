'use client';

import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem } from '@nextui-org/react';
import { useAllVehicles } from '@/hooks/useAllVehicles';
import { createVehicleAssignment } from '@/app/lib/actions';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface VehicleAssignmentFormProps {
  employeeId: string;
  onClose: () => void;
}

export function VehicleAssignmentForm({ employeeId, onClose }: VehicleAssignmentFormProps) {
  const { vehicles, isLoading } = useAllVehicles();
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
      <Card className="p-4">
        <CardBody>
          <div className="flex justify-center">
            Cargando vehículos disponibles...
          </div>
        </CardBody>
      </Card>
    );
  }

  const availableVehicles = vehicles?.filter(vehicle => !vehicle.assigned);

  return (
    <Card className="p-4">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Asignar Vehículo</h3>
        <Button
          color="danger"
          variant="light"
          size="sm"
          onClick={onClose}
        >
          ✕
        </Button>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Vehículo"
            isRequired
            value={formData.vehicle_id}
            onChange={(e) => setFormData({ ...formData, vehicle_id: e.target.value })}
            isInvalid={validationErrors.vehicle_id}
            errorMessage={validationErrors.vehicle_id && 'Selecciona un vehículo'}
          >
            {(availableVehicles || []).map((vehicle) => (
              <SelectItem key={vehicle.id} value={vehicle.id}>
                {vehicle.make} {vehicle.model} - {vehicle.license_plate}
              </SelectItem>
            ))}
          </Select>

          <Input
            type="date"
            label="Fecha de inicio"
            isRequired
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            isInvalid={validationErrors.start_date}
            errorMessage={validationErrors.start_date && 'La fecha de inicio es requerida'}
          />

          <Input
            type="date"
            label="Fecha de fin (opcional)"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            min={formData.start_date}
          />

          <Select
            label="Estado"
            isRequired
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <SelectItem key="Activa" value="Activa">Activa</SelectItem>
            <SelectItem key="Finalizada" value="Finalizada">Finalizada</SelectItem>
            <SelectItem key="Cancelada" value="Cancelada">Cancelada</SelectItem>
          </Select>

          <Input
            label="Notas"
            placeholder="Notas adicionales sobre la asignación"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button
              color="danger"
              variant="light"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              color="success"
              type="submit"
            >
              Asignar Vehículo
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
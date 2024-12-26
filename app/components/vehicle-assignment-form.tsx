'use client';

import React, { useState } from 'react';
import { Button, Card, Input, Select, SelectItem } from '@nextui-org/react';
import { useAllVehicles } from '@/hooks/useAllVehicles';
import { createVehicleAssignment } from '@/app/lib/actions';
import { toast } from 'sonner';

interface VehicleAssignmentFormProps {
  employeeId: string;
  onClose: () => void;
}

export function VehicleAssignmentForm({ employeeId, onClose }: VehicleAssignmentFormProps) {
  const { vehicles } = useAllVehicles();
  const [formData, setFormData] = useState({
    vehicle_id: '',
    start_date: '',
    end_date: '',
    status: 'Activa',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append('employee_id', employeeId);
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    toast.promise(
      createVehicleAssignment(form),
      {
        loading: 'Creando asignación...',
        success: 'Vehículo asignado exitosamente',
        error: 'Error al asignar vehículo'
      }
    );
    onClose();
  };

  return (
    <Card className="p-4">
      <h3 className="mb-4 text-xl font-semibold">Asignar Vehículo</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Vehículo"
          isRequired
          value={formData.vehicle_id}
          onChange={(e) => setFormData({ ...formData, vehicle_id: e.target.value })}
        >
          {(vehicles || []).map((vehicle) => (
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
        />

        <Input
          type="date"
          label="Fecha de fin (opcional)"
          value={formData.end_date}
          onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
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
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <Button color="danger" variant="light" onClick={onClose}>
            Cancelar
          </Button>
          <Button color="success" type="submit">
            Asignar Vehículo
          </Button>
        </div>
      </form>
    </Card>
  );
}
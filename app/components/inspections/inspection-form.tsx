'use client';

import { useState } from 'react';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';

interface Fluid {
  [key: string]: string;
}

interface InspectionData {
  odometer: string;
  fluids: Fluid;
  notes: string;
}

interface InspectionFormProps {
  initialData?: Partial<InspectionData>;
  onSubmit: (data: InspectionData) => void;
  onCancel: () => void;
}

const STATUS_OPTIONS = ['OK', 'Requires Attention', 'Future Attention', 'Filled'] as const;

export default function InspectionForm({ initialData, onSubmit, onCancel }: InspectionFormProps) {
  const [formData, setFormData] = useState<InspectionData>({
    odometer: initialData?.odometer || '',
    fluids: initialData?.fluids || {},
    notes: initialData?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateFormData = (section: keyof InspectionData, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: section === 'fluids' ? { ...prev[section], [field]: value } : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Odometer"
          type="number"
          value={formData.odometer}
          onChange={(e) => updateFormData('odometer', '', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(formData.fluids).map(([key, value]) => (
          <Select
            key={key}
            label={key.replace(/([A-Z])/g, ' $1').trim()}
            selectedKeys={[value]}
            onChange={(e) => updateFormData('fluids', key, e.target.value)}
          >
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
        ))}
      </div>

      <Textarea
        label="Notes"
        value={formData.notes}
        onChange={(e) => updateFormData('notes', '', e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <Button color="danger" variant="light" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="primary" type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
}


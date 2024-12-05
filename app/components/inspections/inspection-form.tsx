import { useState } from 'react';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';

interface InspectionFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function InspectionForm({ initialData, onSubmit, onCancel }: InspectionFormProps) {
  const [formData, setFormData] = useState(initialData || {});

  const statusOptions = ['OK', 'Requires Attention', 'Future Attention', 'Filled'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateFormData = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Odometer"
          type="number"
          value={formData.odometer}
          onChange={(e) => setFormData({ ...formData, odometer: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(formData.fluids || {}).map(([key, value]) => (
          <Select
            key={key}
            label={key.replace(/([A-Z])/g, ' $1').trim()}
            value={value as string}
            onChange={(e) => updateFormData('fluids', key, e.target.value)}
          >
            {statusOptions.map((option) => (
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
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
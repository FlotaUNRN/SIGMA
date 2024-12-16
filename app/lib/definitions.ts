export type Admin = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

export type Vehicle = {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: string;
  color: string;
  license_plate: string;
  photo_url: string;
};

export type Inspection = {
  id: string;
  vehicle_id: string;
  reference_code: string;
  inspection_date: string;
  odometer_reading: number;
  status: 'Completado' | 'Pendiente' | 'En Proceso';
  front_image_url?: string;
  driver_side_image_url?: string;
  passenger_side_image_url?: string;
  back_image_url?: string;
  dashboard_alerts?: string[];
  engine_oil_status: string;
  transmission_status: string;
  differential_status: string;
  coolant_status: string;
  brake_fluid_status: string;
  power_steering_status: string;
  wiper_fluid_status: string;
  steering_hose_status: string;
  heater_hose_status: string;
  serpentine_belt_status: string;
  alternator_belt_status: string;
  air_filter_status: string;
  fuel_filter_status: string;
  oil_filter_status: string;
  front_left_tire_status: string;
  front_right_tire_status: string;
  rear_left_tire_status: string;
  rear_right_tire_status: string;
  emergency_brake_status: string;
  front_wiper_status: string;
  rear_wiper_status: string;
  notes?: string;
};
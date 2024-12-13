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
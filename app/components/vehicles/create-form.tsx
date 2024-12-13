'use client';
import { Button } from '@nextui-org/react';
import { Input } from '@/app/components/form/input';
import { useState } from 'react';
import { createVehicle } from '@/app/lib/actions';
import { toast } from 'sonner';
import {
  useVehicles,
  useTotalVehiclesPages,
  useTotalVehicles,
} from '../../../hooks/swr-hooks';

type CreateVehicleFormProps = {
  setActiveForm: (activeForm: boolean) => void;
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export const CreateVehicleForm = ({
  setActiveForm,
  searchParams,
}: CreateVehicleFormProps) => {
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;
  const { mutateVehicles } = useVehicles(query, currentPage);
  const { totalVehiclesPages, mutateTotalVehiclesPages } =
    useTotalVehiclesPages();
  const { totalVehicles, mutateTotalVehicles } = useTotalVehicles();
  const [loading, setLoading] = useState(false);

  const [vin, setVin] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [photo, setPhoto] = useState('');

  const [trySubmit, setTrySubmit] = useState(false);

  const [vinError, setVinError] = useState(false);
  const [makeError, setMakeError] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [licensePlateError, setLicensePlateError] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  const validateVin = (vin: string) => {
    const re = /^.*$/i;
    if (re.test(vin)) {
      setVinError(false);
    } else {
      setVinError(true);
    }
  };

  const validateMake = (make: string) => {
    const re = /^.*$/i;
    if (re.test(make)) {
      setMakeError(false);
    } else {
      setMakeError(true);
    }
  };

  const validateModel = (model: string) => {
    const re = /^.*$/i;
    if (re.test(model)) {
      setModelError(false);
    } else {
      setModelError(true);
    }
  };

  const validateYear = (year: string) => {
    const re = /^\d{4}$/;
    if (re.test(year)) {
      setYearError(false);
    } else {
      setYearError(true);
    }
  };

  const validateColor = (color: string) => {
    const re = /^.*$/i;
    if (re.test(color)) {
      setColorError(false);
    } else {
      setColorError(true);
    }
  };

  const validateLicensePlate = (licensePlate: string) => {
    const re = /^.*$/i;
    if (re.test(licensePlate)) {
      setLicensePlateError(false);
    } else {
      setLicensePlateError(true);
    }
  };

  const validatePhoto = (photo: string) => {
    const re = /^.*$/i;
    if (re.test(photo)) {
      setPhotoError(false);
    } else {
      setPhotoError(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    toast.promise(
      createVehicle(formData)
        .then(() => {
          if (
            query?.includes(vin) ||
            query?.includes(make) ||
            query?.includes(model) ||
            query?.includes(year) ||
            query?.includes(color) ||
            query?.includes(licensePlate) ||
            query?.includes(photo) ||
            !query
          ) {
            mutateVehicles();
          }
          mutateTotalVehicles(totalVehicles + 1, false);
          if (
            ((query?.includes(vin) ||
              query?.includes(make) ||
              query?.includes(model) ||
              query?.includes(year) ||
              query?.includes(color) ||
              query?.includes(licensePlate) ||
              query?.includes(photo)) &&
              totalVehicles % 6 === 0) ||
            (query == undefined && totalVehicles % 6 === 0)
          ) {
            mutateTotalVehiclesPages(totalVehiclesPages + 1, false);
          }
          setLoading(false);
          setTrySubmit(false);
          setVin('');
          setMake('');
          setModel('');
          setYear('');
          setColor('');
          setLicensePlate('');
          setPhoto('');
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        }),
      {
        loading: 'Creando...',
        success: 'Vehículo creado con éxito',
        error: 'Error al crear el vehículo',
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 rounded-lg bg-lightPaper p-6 shadow-xl dark:bg-darkPaper"
    >
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:pb-3">
        <Input
          label="Número de identificación vehicular"
          name="vin"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          value={vin}
          onValueChange={(e) => {
            setVin(e);
            if (trySubmit) {
              validateVin(e);
            }
          }}
          placeholder="Ingresar VIN"
          errorMessage="Ingresa un VIN valido"
          isRequired
          isInvalid={trySubmit && vinError}
          classNames={{
            inputWrapper: 'p-0',
            errorMessage: 'absolute top-0 left-0',
            input: 'font-extralight',
          }}
        />
        <Input
          label="Fabricante"
          name="make"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          value={make}
          onValueChange={(e) => {
            setMake(e);
            if (trySubmit) {
              validateMake(e);
            }
          }}
          placeholder="Ingresar fabricante"
          errorMessage="Ingrese un fabricante valido"
          isRequired
          isInvalid={trySubmit && makeError}
          classNames={{
            inputWrapper: 'p-0',
            errorMessage: 'absolute top-0 left-0',
            input: 'font-extralight',
          }}
        />
        <Input
          label="Modelo"
          name="model"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          value={model}
          onValueChange={(e) => {
            setModel(e);
            if (trySubmit) {
              validateModel(e);
            }
          }}
          placeholder="Ingresar modelo"
          errorMessage="Ingrese un modelo valido"
          isRequired
          isInvalid={trySubmit && modelError}
          classNames={{
            inputWrapper: 'p-0',
            errorMessage: 'absolute top-0 left-0',
            input: 'font-extralight',
          }}
        />
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:pb-3">
        <Input
          label="Año"
          name="year"
          type="number"
          variant="bordered"
          labelPlacement="outside"
          value={year}
          onValueChange={(e) => {
            setYear(e);
            if (trySubmit) {
              validateYear(e);
            }
          }}
          placeholder="Ingresar año"
          errorMessage="Ingresa un año valido"
          isRequired
          isInvalid={trySubmit && yearError}
          classNames={{
            inputWrapper: 'p-0 px-2',
            errorMessage: 'absolute top-0 left-0',
            input: 'font-extralight',
          }}
        />
        <Input
          label="Color"
          name="color"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          value={color}
          onValueChange={(e) => {
            setColor(e);
            if (trySubmit) {
              validateColor(e);
            }
          }}
          placeholder="Ingresar color"
          errorMessage="Ingresa un color valido"
          isRequired
          isInvalid={trySubmit && colorError}
          classNames={{
            inputWrapper: 'p-0',
            errorMessage: 'absolute top-0 left-0',
            input: 'font-extralight',
          }}
        />
        <Input
          label="Patente"
          name="license_plate"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          value={licensePlate}
          onValueChange={(e) => {
            setLicensePlate(e);
            if (trySubmit) {
              validateLicensePlate(e);
            }
          }}
          placeholder="Ingresar patente"
          errorMessage="Ingrese una patente valido"
          isRequired
          isInvalid={trySubmit && licensePlateError}
          classNames={{
            inputWrapper: 'p-0',
            errorMessage: 'absolute top-0 left-0',
            input: 'font-extralight',
          }}
        />
        <Input
          label="Foto"
          name="photo_url"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          value={photo}
          onValueChange={(e) => {
            setPhoto(e);
            if (trySubmit) {
              validatePhoto(e);
            }
          }}
          placeholder="Ingresar URL de la foto"
          errorMessage="Ingrese una URL de foto valido"
          isRequired
          isInvalid={trySubmit && photoError}
          classNames={{
            inputWrapper: 'p-0',
            errorMessage: 'absolute top-0 left-0',
            input: 'font-extralight',
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
            isLoading={loading}
            onClick={() => {
              setTrySubmit(true);
              validateVin(vin);
              validateMake(make);
              validateModel(model);
              validateYear(year);
              validateColor(color);
              validateLicensePlate(licensePlate);
              validatePhoto(photo);
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
          ></Button>
          <Button
            size="sm"
            color="danger"
            variant="bordered"
            onClick={() => {
              setTrySubmit(false);
              setVinError(false);
              setMakeError(false);
              setModelError(false);
              setYearError(false);
              setColorError(false);
              setLicensePlateError(false);
              setPhotoError(false);
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
          ></Button>
        </div>
      </div>
    </form>
  );
};

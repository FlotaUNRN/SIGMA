'use client';
import { usePathname } from 'next/navigation';

export const VehicleDetails = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const pathname = usePathname();
  const vin = pathname.split('/').pop();
  const data = [
    {
      label: 'Toyota Corolla',
      vin: '12345678901234567',
      make: 'Toyota',
      model: 'Corolla',
      year: 1999,
      color: 'Blanco',
      licensePlate: 'AA123BB',
      photo:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.motortrend.com%2Fuploads%2Fsites%2F10%2F2015%2F11%2F2014-toyota-corolla-l-at-sedan-angular-front.png&f=1&nofb=1&ipt=2b8e3cdf150823309a5c928c58f046c7fb8708c42c9a8b120868b498bc639861&ipo=images',
    },
    {
      label: 'Ford Focus',
      vin: '98765432109876543',
      make: 'Ford',
      model: 'Focus',
      year: 2015,
      color: 'Azul',
      licensePlate: 'BB456CC',
      photo:
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.imgur.com%2FArycCWP.png&f=1&nofb=1&ipt=1861cabb3d79ba69e2c31b12ea99d80785f4d8b95676c7e371f4d493d276bb25&ipo=images',
    },
    {
      label: 'Honda Civic',
      vin: '13579246801357924',
      make: 'Honda',
      model: 'Civic',
      year: 2020,
      color: 'Naranja',
      licensePlate: 'CC789DD',
      photo:
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fst.automobilemag.com%2Fuploads%2Fsites%2F10%2F2015%2F11%2F2014-honda-civic-si-sedan-angular-front.png&f=1&nofb=1&ipt=e31439d1dfd7060e97ec5b9d2b068a9593f58231a8a5dba75c67fb7337511993&ipo=images',
    },
    {
      label: 'Fiat Cronos',
      vin: '24681357902468135',
      make: 'Fiat',
      model: 'Cronos',
      year: 2018,
      color: 'Gris',
      licensePlate: 'DD321EE',
      photo:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcronos.fiat.com.ar%2Fassets%2Fimages%2Fimg-version-cronos-drive-13-mt-2.png&f=1&nofb=1&ipt=92d4b07357f4b4273e68015213bea393e99803cfdcb34fedc301a92bc2d99509&ipo=images',
    },
    {
      label: 'Toyota Hilux',
      vin: '31415926535897932',
      make: 'Toyota',
      model: 'Hilux',
      year: 2022,
      color: 'Rojo',
      licensePlate: 'EE654FF',
      photo:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngmart.com%2Ffiles%2F22%2FToyota-Hilux-PNG-File.png&f=1&nofb=1&ipt=82cd62675f3b3394f9254901badc4e3686e8f5f3065a1824a2f45d79ec0af99b&ipo=images',
    },
  ];
  console.log(searchParams);

  return (
    <div>
      {data
        .filter((vehicle) => vehicle.vin === vin)
        .map((vehicle) => (
          <div
            key={vehicle.vin}
            className="flex flex-col items-center justify-center gap-3 px-3 py-6 md:flex-row md:gap-8 md:px-6 md:py-12"
          >
            <img
              src={vehicle.photo}
              alt={vehicle.label}
              className="h-50 w-80 object-cover"
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold md:text-4xl">
                {vehicle.label}
              </h1>
              <p className="text-sm md:text-lg">
                <b>Fabricante:</b> {vehicle.make}
              </p>
              <p className="text-sm md:text-lg">
                <b>Modelo:</b> {vehicle.model}
              </p>
              <p className="text-sm md:text-lg">
                <b>Año:</b> {vehicle.year}
              </p>
              <p className="text-sm md:text-lg">
                <b>Color:</b> {vehicle.color}
              </p>
              <p className="text-sm md:text-lg">
                <b>Patente:</b> {vehicle.licensePlate}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

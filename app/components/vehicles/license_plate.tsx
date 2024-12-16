import React from 'react';

interface LicensePlateProps {
  plateNumber: string;
}

const LicensePlate: React.FC<LicensePlateProps> = ({ plateNumber }) => {
  if (plateNumber.length === 7) {
    const firstLetters = plateNumber.slice(0, 2);
    const numbers = plateNumber.slice(2, 5);
    const lastNumbers = plateNumber.slice(5, 8);
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-between gap-3 rounded-t-lg bg-blue-900 px-2 pt-1 text-white">
          <img
            className="h-4 w-7"
            width={24}
            height={24}
            src="/assets/Mercosur.png"
          />
          <p className="font-bold uppercase">República argentina</p>
          <img
            className="h-4 w-7 rounded-sm"
            width={24}
            height={12}
            src="/assets/Argentina.png"
          />
        </div>
        <div className="flex w-full flex-row justify-center rounded-b-lg bg-white text-4xl font-extrabold text-black">
          <span className="leading-relaxed">
            {firstLetters} {numbers} {lastNumbers}
          </span>
        </div>
      </div>
    );
  } else if (plateNumber.length === 6) {
    const letters = plateNumber.slice(0, 3);
    const numbers = plateNumber.slice(3, 7);
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-white p-1 pb-2">
        <div className="flex flex-row items-center justify-between gap-3 rounded-t-lg p-1 text-white">
          <img
            className="h-6 w-6 rounded-sm"
            width={12}
            height={24}
            src="/assets/EscudoArgentina.png"
          />
          <p className="font-bold uppercase text-blue-500">Argentina</p>
          <img
            className="h-4 w-7 rounded-sm"
            width={24}
            height={12}
            src="/assets/Argentina.png"
          />
        </div>
        <div className="flex w-full flex-row justify-center rounded-lg bg-black p-1 text-4xl font-extrabold text-white gap-4">
          <span className="leading-relaxed">{letters}</span>
          <span className="leading-relaxed">{numbers}</span>
        </div>
      </div>
    );
  }
};

export default LicensePlate;

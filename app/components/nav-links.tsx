'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import {
  TruckIcon,
  HomeIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Vehiculos',
    href: '/dashboard/vehicles',
    icon: TruckIcon,
  },
  {
    name: 'Inspecciones',
    href: '/dashboard/inspections',
    icon: WrenchScrewdriverIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const pathVlidation = pathname.split('/').slice(0, 3).join('/');

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx('px-5 py-2 hover:text-primary md:flex md:w-full', {
              'text-primary md:bg-background': pathVlidation === link.href,
            })}
          >
            <LinkIcon className="w-6 " />
            <p className="ml-2 hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
'use client';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from '@nextui-org/react';
import LogoUNRN from './logo-UNRN';
import ToggleTheme from './toggle-theme';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [{ label: 'Inicio', link: '/' },{ label: 'Ingresar', link: '/login' }];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="w-screen">
      <NavbarContent className="flex justify-between">
        <NavbarBrand>
          <Link href="/">
            <LogoUNRN className="" />
          </Link>
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarContent justify="end" className="hidden lg:flex">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login" className="mx-1 px-2 py-4">
            <Button
              variant="bordered"
              className="border-none px-5 py-2 font-bold text-foreground hover:text-primary"
            >
              Iniciar sesión
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <ToggleTheme />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="flex flex-row justify-between items-start mt-3">
        <div className="flex flex-col gap-2">
          <span className="text-foreground font-bold text-2xl mb-5">Menú</span>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link href={item.link} className='text-foreground text-xl'>{item.label}</Link>
            </NavbarMenuItem>
          ))}
        </div>
        <ToggleTheme />
      </NavbarMenu>
    </Navbar>
  );
}

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/context/theme-provider';
import { NextUIProviderContext } from '@/context/nextui-provider';
import { Toaster } from 'sonner';

const fabrikat = localFont({
  src: [
    {
      path: './fonts/Fabrikat/black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/Fabrikat/blackItalic.otf',
      weight: '900',
      style: 'italic',
    },
    {
      path: './fonts/Fabrikat/bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Fabrikat/boldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './fonts/Fabrikat/hairline.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/Fabrikat/hairlineItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: './fonts/Fabrikat/light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Fabrikat/lightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/Fabrikat/medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Fabrikat/mediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/Fabrikat/regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Fabrikat/regularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/Fabrikat/thin.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/Fabrikat/thinItalic.otf',
      weight: '200',
      style: 'italic',
    },
  ],
  variable: '--font-fabrikat',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sIGMA-two.vercel.app/'),
  title: {
    template: '%s | SIGMA',
    default: 'SIGMA',
  },
  description: 'Proyecto SIGMA de la materia Ingeniería de Software I UNRN',
  openGraph: {
    title: 'SIGMA',
    description: 'Proyecto SIGMA de la materia Ingeniería de Software I UNRN',
    url: 'https://sIGMA-two.vercel.app/',
    siteName: 'SIGMA',
    images: [
      {
        url: './opengraph-image.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <ThemeProvider>
        <Toaster
          closeButton
          toastOptions={{
            classNames: {
              toast: 'bg-lightPaper dark:bg-darkPaper',
              title: 'text-foreground dark:text-[#FCF6F5]',
              description: 'text-foreground dark:text-[#FCF6F5]',
              error: 'text-danger 1px solid border-danger',
              success: 'text-success 1px solid border-success ',
              actionButton:
                'bg-lightPaper dark:bg-darkPaper text-foreground dark:text-[#FCF6F5] border-darkPaper dark:border-lightPaper',
              cancelButton:
                'bg-lightPaper dark:bg-darkPaper text-foreground dark:text-[#FCF6F5] border-darkPaper dark:border-lightPaper',
              closeButton:
                'bg-lightPaper dark:bg-darkPaper text-foreground dark:text-[#FCF6F5] border-darkPaper dark:border-lightPaper',
            },
          }}
        />
        <NextUIProviderContext>
          <body
            className={`${fabrikat.variable} font-fabrikat antialiased`}
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0 auto',
            }}
          >
            {children}
          </body>
        </NextUIProviderContext>
      </ThemeProvider>
    </html>
  );
}

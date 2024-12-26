'use client';
import { Button, Pagination, Spinner } from '@nextui-org/react';
import Search from '@/app/components/search';
import { useState } from 'react';
import { CreateInspectionForm } from './create-form';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTotalInspectionsPages, useInspections } from '@/hooks/swr-hooks';
import { Inspection } from '@/app/lib/definitions';
import InspectionCard from './inspection-card';

export default function InspectionsList({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;
  const [pending, setPending] = useState(false);
  const { inspections, isLoading } = useInspections(query, currentPage);
  const { totalInspectionsPages } = useTotalInspectionsPages(query);
  const { replace } = useRouter();
  const pathname = usePathname();

  const data = inspections ?? [];
  const [activeForm, setActiveForm] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <div className="w-full md:w-96">
          <Search placeholder="Buscar inspecciones" />
        </div>
        <div className="w-full md:w-auto">
          <Button
            color="success"
            className="w-full md:w-auto"
            onClick={() => setActiveForm(!activeForm)}
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
            }
          >
            Nueva inspección
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {activeForm && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <CreateInspectionForm
              setActiveForm={setActiveForm}
              searchParams={searchParams}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex w-full justify-center p-6">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {data.map((inspection: Inspection) => (
            <InspectionCard
              key={inspection.id}
              inspection={inspection}
              searchParams={searchParams}
              setPending={setPending}
              pending={pending}
            />
          ))}
        </div>
      )}

      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={currentPage}
          total={totalInspectionsPages}
          onChange={(page) => {
            const params = new URLSearchParams(searchParams);
            params.set('page', page.toString());
            replace(`${pathname}?${params.toString()}`);
          }}
          classNames={{
            wrapper: 'gap-0 overflow-visible h-8',
            item: 'w-8 h-8',
            cursor: 'bg-primary',
          }}
        />
      </div>
    </div>
  );
}
import useSWR from 'swr';

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  if (!res.ok) throw new Error('Error en la solicitud');
  return res.json();
};

export function useEmployeeById(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/employees?id=${id}`,
    fetcher,
  );

  return {
    employee: data,
    isLoading,
    isError: error,
    mutateEmployee: mutate,
  };
}

export function useAllEmployees() {
  const { data, error, isLoading, mutate } = useSWR('/api/employees/all', fetcher);
  
  return {
    employees: data,
    isLoading,
    isError: error,
    mutateEmployees: mutate,
  };
}

export function useEmployees(query?: string, page?: number) {
  const { data, error, isLoading, mutate } = useSWR(
    query || page
      ? `/api/employees?${query ? `query=${query}` : ''}${page ? `&page=${page}` : ''}`
      : '/api/employees',
    fetcher
  );

  return {
    employees: data,
    isLoading,
    isError: error,
    mutateEmployees: mutate,
  };
}

export function useEmployeeVehicleAssignments(employeeId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/employees/${employeeId}/vehicle-assignments`,
    fetcher
  );

  return {
    assignments: data,
    isLoading,
    isError: error,
    mutateAssignments: mutate,
  };
}

export function useTotalEmployees() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/count/employees',
    fetcher,
  );

  return {
    totalEmployees: data,
    isLoading,
    isError: error,
    mutateTotalEmployees: mutate,
  };
}

export function useTotalEmployeesPages(query?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    query
      ? `/api/count/employees/pages?query=${query}`
      : '/api/count/employees/pages',
    fetcher,
  );

  return {
    totalEmployeesPages: data,
    isLoading,
    isError: error,
    mutateTotalEmployeesPages: mutate,
  };
}
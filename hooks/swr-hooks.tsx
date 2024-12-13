import useSWR from 'swr';

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};
export function useVehicleById(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/vehicles?id=${id}`,
    fetcher,
  );

  return {
    vehicle: data,
    isLoading,
    isError: error,
    mutateVehicle: mutate,
  };
}
export function useVehicles(query?: string, page?: number) {
  if (!page && !query) {
    const { data, error, isLoading, mutate } = useSWR('/api/vehicles', fetcher);
    return {
      vehicles: data,
      isLoading,
      isError: error,
      mutateVehicles: mutate,
    };
  } else if (page && !query) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/vehicles?page=${page}`,
      fetcher,
    );
    return {
      vehicles: data,
      isLoading,
      isError: error,
      mutateVehicles: mutate,
    };
  } else if (query && !page) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/vehicles?query=${query}`,
      fetcher,
    );
    return {
      vehicles: data,
      isLoading,
      isError: error,
      mutateVehicles: mutate,
    };
  } else {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/vehicles?page=${page}&query=${query}`,
      fetcher,
    );
    return {
      vehicles: data,
      isLoading,
      isError: error,
      mutateVehicles: mutate,
    };
  }
}
export function useTotalVehicles() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/count/vehicles',
    fetcher,
  );

  return {
    totalVehicles: data,
    isLoading,
    isError: error,
    mutateTotalVehicles: mutate,
  };
}
export function useTotalVehiclesPages(query?: string) {
  if (!query) {
    const { data, error, isLoading, mutate } = useSWR(
      '/api/count/vehicles/pages',
      fetcher,
    );
    return {
      totalVehiclesPages: data,
      isLoading,
      isError: error,
      mutateTotalVehiclesPages: mutate,
    };
  } else {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/count/vehicles/pages?query=${query}`,
      fetcher,
    );
    return {
      totalVehiclesPages: data,
      isLoading,
      isError: error,
      mutateTotalVehiclesPages: mutate,
    };
  }
}

// AULAS

export function useAulasById(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/aula?id=${id}`,
    fetcher,
  );

  return {
    aula: data,
    isLoading,
    isError: error,
    mutateAula: mutate,
  };
}

export function useAulas(query?: string, page?: number) {
  if (!page && !query) {
    const { data, error, isLoading, mutate } = useSWR('/api/aula', fetcher);
    return {
      aulas: data,
      isLoading,
      isError: error,
      mutateAulas: mutate,
    };
  } else if (page && !query) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/aula?page=${page}`,
      fetcher,
    );
    return {
      aulas: data,
      isLoading,
      isError: error,
      mutateAulas: mutate,
    };
  } else if (query && !page) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/aula?query=${query}`,
      fetcher,
    );
    return {
      aulas: data,
      isLoading,
      isError: error,
      mutateAulas: mutate,
    };
  } else {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/aula?page=${page}&query=${query}`,
      fetcher,
    );
    return {
      aulas: data,
      isLoading,
      isError: error,
      mutateAulas: mutate,
    };
  }
}

export function useTotalAulas() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/count/aula',
    fetcher,
  );

  return {
    totalAulas: data,
    isLoading,
    isError: error,
    mutateTotalAulas: mutate,
  };
}

export function useTotalAulasPages(query?: string) {
  if (!query) {
    const { data, error, isLoading, mutate } = useSWR(
      '/api/count/aula/pages',
      fetcher,
    );
    return {
      totalAulasPages: data,
      isLoading,
      isError: error,
      mutateTotalAulasPages: mutate,
    };
  } else {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/count/aula/pages?query=${query}`,
      fetcher,
    );
    return {
      totalAulasPages: data,
      isLoading,
      isError: error,
      mutateTotalAulasPages: mutate,
    };
  }
}
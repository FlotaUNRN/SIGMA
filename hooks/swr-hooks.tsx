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

export function useAllVehicles() {
  const { data, error, isLoading, mutate } = useSWR('/api/vehicles/all', fetcher);
  
  return {
    vehicles: data,
    isLoading,
    isError: error,
    mutateVehicles: mutate,
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

export function useVehicleInspections(vehicleId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/vehicles/${vehicleId}/inspections`,
    fetcher
  );

  return {
    inspections: data,
    isLoading,
    isError: error,
    mutateInspections: mutate,
  };
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

export function useInspectionById(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/inspections?id=${id}`,
    fetcher,
  );

  return {
    inspection: data,
    isLoading,
    isError: error,
    mutateInspection: mutate,
  };
}

export function useInspections(query?: string, page?: number) {
  if (!page && !query) {
    const { data, error, isLoading, mutate } = useSWR('/api/inspections', fetcher);
    return {
      inspections: data,
      isLoading,
      isError: error,
      mutateInspections: mutate,
    };
  } else if (page && !query) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/inspections?page=${page}`,
      fetcher,
    );
    return {
      inspections: data,
      isLoading,
      isError: error,
      mutateInspections: mutate,
    };
  } else if (query && !page) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/inspections?query=${query}`,
      fetcher,
    );
    return {
      inspections: data,
      isLoading,
      isError: error,
      mutateInspections: mutate,
    };
  } else {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/inspections?page=${page}&query=${query}`,
      fetcher,
    );
    return {
      inspections: data,
      isLoading,
      isError: error,
      mutateInspections: mutate,
    };
  }
}

export function useVehiclePendingInspections(vehicleId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/vehicles/${vehicleId}/pending-inspections`,
    fetcher
  );

  return {
    pendingInspections: data,
    isLoading,
    isError: error,
    mutatePendingInspections: mutate,
  };
}

export function useTotalInspections() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/count/inspections',
    fetcher,
  );

  return {
    totalInspections: data,
    isLoading,
    isError: error,
    mutateTotalInspections: mutate,
  };
}

export function useTotalInspectionsPages(query?: string) {
  if (!query) {
    const { data, error, isLoading, mutate } = useSWR(
      '/api/count/inspections/pages',
      fetcher,
    );
    return {
      totalInspectionsPages: data,
      isLoading,
      isError: error,
      mutateTotalInspectionsPages: mutate,
    };
  } else {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/count/inspections/pages?query=${query}`,
      fetcher,
    );
    return {
      totalInspectionsPages: data,
      isLoading,
      isError: error,
      mutateTotalInspectionsPages: mutate,
    };
  }
}

export function useInspectionStats() {
  const { data, error, isLoading, mutate } = useSWR('/api/stats/inspections', fetcher);

  return {
    stats: data,
    isLoading,
    isError: error,
    mutateStats: mutate,
  };
}
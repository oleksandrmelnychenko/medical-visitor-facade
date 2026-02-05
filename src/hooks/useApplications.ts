import useSWR from 'swr';

type Application = {
  id: string;
  applicationNum: string;
  status: string;
  isEuResident: boolean | null;
  clientNotes: string | null;
  createdAt: string;
  user: {
    id: string;
    email: string;
    phone: string | null;
    firstName: string | null;
    lastName: string | null;
  };
  location: { code: string; nameRu: string } | null;
  insurance: { code: string; nameRu: string } | null;
  travelAbility: { code: string; nameRu: string } | null;
  services: Array<{
    service: { code: string; nameRu: string };
  }>;
};

type PaginationInfo = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type ApplicationsResponse = {
  data: Application[];
  pagination: PaginationInfo;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('Failed to fetch');
    throw error;
  }
  return res.json();
};

export function useApplications(page: number = 1) {
  const { data, error, isLoading, mutate } = useSWR<ApplicationsResponse>(
    `/api/applications?page=${page}&limit=10`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    applications: data?.data || [],
    pagination: data?.pagination || null,
    isLoading,
    error,
    mutate,
  };
}

export function useUnreadCounts() {
  const { data, error, mutate } = useSWR<{ data: Record<string, number> }>(
    '/api/applications/unread-counts',
    fetcher,
    {
      refreshInterval: 10000, // Poll every 10 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    unreadCounts: data?.data || {},
    error,
    mutate,
  };
}

export async function updateApplicationStatus(appId: string, newStatus: string) {
  const response = await fetch(`/api/applications/${appId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to update status');
  }

  return response.json();
}

export type { Application, PaginationInfo };

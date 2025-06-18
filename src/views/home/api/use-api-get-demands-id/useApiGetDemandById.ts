import { useQuery } from "@tanstack/react-query";
import SecureStorage from "@/utils/secureStore";
import { DemandProps } from "@/types/demands";
import { demandsApi } from "@/services/authApi.demands";

// Função de fetch por ID
const fetchDemandById = async (id: string): Promise<DemandProps> => {
  const accessToken = await SecureStorage.get("accessToken");

  const response = await demandsApi.get(`/PestWorkOrder/get-by-id?id=${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response?.data?.data;
};

// Hook
export function useApiGetDemandById(id?: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["demand", id], // importante para cache individual por ID
    queryFn: () => fetchDemandById(id ?? ""),
    enabled: !!id, // só executa se o id for válido
  });

  return {
    demand: data,
    isLoadingDemand: isLoading,
    errorDemand: error,
    refetchDemand: refetch,
  };
}

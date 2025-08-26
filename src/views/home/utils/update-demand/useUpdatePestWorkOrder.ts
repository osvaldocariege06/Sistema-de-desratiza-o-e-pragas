import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  PestWorkOrderUpdate,
  PestWorkOrderResponse,
} from "@/types/pestWorkOrder";
import { envs } from "@/constants/envs.const";
import axios from "axios";
import Toast from "react-native-toast-message";

type Props = {
  onCallback?: () => void;
};

async function updatePestWorkOrder(
  payload: PestWorkOrderUpdate
): Promise<PestWorkOrderResponse> {
  const { data } = await axios.post<PestWorkOrderResponse>(
    `${envs.DEMANDS_API_URL}/PestWorkOrder/editar`,
    payload
  );

  return data;
}

// Tipo do contexto retornado no onMutate
type ContextType = {
  previousDemand?: PestWorkOrderResponse;
};

export function useUpdatePestWorkOrder({ onCallback }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync: updateWorkOrder, isPending: isUpdateWorkOrder } =
    useMutation<PestWorkOrderResponse, Error, PestWorkOrderUpdate, ContextType>(
      {
        mutationFn: updatePestWorkOrder,

        // otimista
        onMutate: async (newData) => {
          await queryClient.cancelQueries({ queryKey: ["demand", newData.id] });

          const previousDemand =
            queryClient.getQueryData<PestWorkOrderResponse>([
              "demand",
              newData.id,
            ]);

          // aplica update otimista
          queryClient.setQueryData(["demand", newData.id], {
            ...previousDemand,
            ...newData,
          });

          return { previousDemand };
        },

        // sucesso
        onSuccess: () => {
          Toast.show({
            type: "success",
            position: "bottom",
            text1: "Demanda editada com sucesso!",
            text2: "As alterações foram salvas.",
          });
          onCallback?.();
        },

        // erro -> rollback
        onError: (error, newData, context) => {
          if (context?.previousDemand) {
            queryClient.setQueryData(
              ["demand", newData.id],
              context.previousDemand
            );
          }

          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Erro ao editar demanda",
            text2: error.message || "Tente novamente mais tarde.",
          });
        },

        // garante revalidação final
        onSettled: (data, error, variables) => {
          queryClient.invalidateQueries({ queryKey: ["demand", variables.id] });
        },
      }
    );

  return {
    updateWorkOrder,
    isUpdateWorkOrder,
  };
}

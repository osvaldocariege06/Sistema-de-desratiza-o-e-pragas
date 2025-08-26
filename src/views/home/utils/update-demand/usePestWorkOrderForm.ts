import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type PestWorkOrderForm,
  pestWorkOrderSchema,
} from "./pestWorkOrderSchema";
import { useUpdatePestWorkOrder } from "./useUpdatePestWorkOrder";
import type { DemandProps } from "@/types/demands";

export function usePestWorkOrderForm({
  id,
  callback,
  data,
}: {
  id?: string;
  callback?: () => void;
  data?: DemandProps;
}) {
  const { watch, setValue, handleSubmit } = useForm<PestWorkOrderForm>({
    resolver: zodResolver(pestWorkOrderSchema),
    defaultValues: {
      id: "123",
      dataMarcacao: data?.dataMarcacao
        ? new Date(data.dataMarcacao)
        : undefined,
      duracaoPrevista: data?.duracaoPrevista
        ? new Date(data?.duracaoPrevista)
        : undefined,
      horaDeslocacao: data?.horaDeslocacao
        ? new Date(data.horaDeslocacao)
        : undefined,
      horaChegada: data?.horaChegada ? new Date(data.horaChegada) : undefined,
      inicioServico: data?.inicioServico
        ? new Date(data.inicioServico)
        : undefined,
    },
  });

  const { updateWorkOrder, isUpdateWorkOrder } = useUpdatePestWorkOrder({
    onCallback: callback,
  });

  const onSubmit = handleSubmit((data) => {
    console.log("data", data);

    updateWorkOrder({
      // id: id!,
      dataMarcacao: data?.dataMarcacao?.toISOString(),
      duracaoPrevista: data?.duracaoPrevista?.toISOString(),
      horaDeslocacao: data?.horaDeslocacao?.toISOString(),
      horaChegada: data?.horaChegada?.toISOString(),
      inicioServico: data?.inicioServico?.toISOString(),
    });
  }, console.log);

  return {
    watch,
    setValue,
    onSubmit,
    isUpdateWorkOrder,
  };
}

import { z } from "zod";

export const pestWorkOrderSchema = z.object({
  id: z.string().min(1, "ID obrigatório"),
  dataMarcacao: z.date({ required_error: "Data de marcação obrigatória" }),
  duracaoPrevista: z.date({ required_error: "Duração prevista obrigatória" }),
  horaDeslocacao: z.date({ required_error: "Hora de deslocação obrigatória" }),
  horaChegada: z.date({ required_error: "Hora de chegada obrigatória" }),
  inicioServico: z.date({ required_error: "Início do serviço obrigatório" }),
});

export type PestWorkOrderForm = z.infer<typeof pestWorkOrderSchema>;

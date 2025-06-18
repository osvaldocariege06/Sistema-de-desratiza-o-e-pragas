import zod from "zod"

export const signInSchema = zod
  .object({
    email: zod.string().email('Insira um e-mail válido!'),
    username: zod.string().nonempty("Preencha o nome de usuário").min(4, "Nome de usuário deve ter no mínimo 4 caracteres"),
    password: zod.string().min(5, 'Senha deve ter no mínimo 6 caracteres'),
  })
  .required()
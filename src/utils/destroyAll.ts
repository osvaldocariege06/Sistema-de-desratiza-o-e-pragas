
export const destroyAll = async () => {
  try {
    console.log("Todos os dados foram removidos com sucesso.");
  } catch (error) {
    console.error("Erro ao destruir dados armazenados:", error);
  }
};

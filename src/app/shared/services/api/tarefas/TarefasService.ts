import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

interface ITask {
  id: number;
  title: string;
  isCompleted: boolean;
}

const getAll = async (): Promise<ITask[] | ApiException> => {
  try {
    const { data } = await Api().get("/task");
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao consultar os registros");
  }
};
const getById = async (id: number): Promise<ITask | ApiException> => {
  try {
    const { data } = await Api().get(`/task/${id}`);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao consultar o registro");
  }
};

const create = async (
  dataToCreate: Omit<ITask, "id">
): Promise<ITask | ApiException> => {
  try {
    const { data } = await Api().post("/task", dataToCreate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao criar a tarefa");
  }
};

const updateById = async (
  id: string,
  dataToUpdate: ITask
): Promise<ITask | ApiException> => {
  try {
    const { data } = await Api().put(`/task/${id}`, dataToUpdate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao atualizar o registro");
  }
};
const deleteById = async (id: string): Promise<undefined | ApiException> => {
  try {
    await Api().get(`/task/${id}`);
    return undefined;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao excluir o registro");
  }
};

export const TarefasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

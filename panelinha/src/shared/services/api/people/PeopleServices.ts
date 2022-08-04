import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IPeopleListing {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}
export interface IPeopleDetail {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}
type TPeoplesTotalCount = {
  data: IPeopleListing[];
  totalCount: number;
};
const getAll = async (
  page = 1,
  filter = ""
): Promise<TPeoplesTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITS_OF_LINES}&nomeCompleto_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITS_OF_LINES
        ),
      };
    }
    return new Error("Erro ao listar os registros");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao listar registros."
    );
  }
};

const getById = async (id: number): Promise<IPeopleDetail | Error> => {
  try {
    const { data } = await Api.get(`/pessoas/${id}`);

    if (data) {
      return data;
    }
    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro."
    );
  }
};

const create = async (
  dices: Omit<IPeopleDetail, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IPeopleDetail>("/pessoas", dices);

    if (data) {
      return data.id;
    }
    return new Error("Erro ao criar o registro.");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

const updateById = async (
  id: number,
  dices: IPeopleDetail
): Promise<void | Error> => {
  try {
    await Api.put(`/pessoas/${id}`, dices);
    return new Error("Erro ao atualizar o registro.");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoas/${id}`);
    return new Error("Erro ao apagar o registro.");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao apagar o registro."
    );
  }
};

export const PeopleService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

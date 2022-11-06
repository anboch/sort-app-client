import { $api } from "./axios";
import {
  IBin,
  IConfirmDto,
  IConfirmRequestInfo,
  IJWTs,
  IRuleSet,
  ISearchLists,
  IType,
  IUser,
} from "./api.interface";
import { AxiosResponse } from "axios";
import { apiRoutes } from "../routes";

export const api = Object.freeze({
  async fetchSearchList(): Promise<ISearchLists> {
    return (await $api.get<ISearchLists>(apiRoutes.fetchSearchList)).data;
  },

  async requestConfirmCode(
    email: string
  ): Promise<AxiosResponse<IConfirmRequestInfo>> {
    return $api.post(apiRoutes.requestConfirmCode, { email });
  },

  async confirmAndLogin(
    confirmDto: IConfirmDto
  ): Promise<AxiosResponse<Pick<IJWTs, "access_token">>> {
    return $api.post<Pick<IJWTs, "access_token">>(
      apiRoutes.confirmAndLogin,
      confirmDto
    );
  },

  async fetchUser(): Promise<IUser> {
    return (await $api.get<IUser>(apiRoutes.getUser)).data;
  },

  async updateUser(valuesForUpdate: Partial<IUser>): Promise<IUser> {
    return (await $api.patch<IUser>(apiRoutes.updateUser, valuesForUpdate))
      .data;
  },

  async deleteUser(userId: IUser["_id"]): Promise<void> {
    return (await $api.delete<void>(apiRoutes.deleteUser + "/" + userId)).data;
  },

  async fetchBins(): Promise<IBin[]> {
    return (await $api.get<IBin[]>(apiRoutes.getBins)).data;
  },

  async createBin(valuesForCreate: Partial<IBin>): Promise<IBin> {
    return (await $api.post<IBin>(apiRoutes.createBin, valuesForCreate)).data;
  },

  async updateBin(valuesForUpdate: Partial<IBin>): Promise<IBin> {
    return (await $api.patch<IBin>(apiRoutes.updateBin, valuesForUpdate)).data;
  },

  async deleteBin(binId: string): Promise<void> {
    return (await $api.delete<void>(apiRoutes.deleteBin + "/" + binId)).data;
  },

  async fetchType(id: string): Promise<IType> {
    return (await $api.get<IType>(apiRoutes.getTypeById + id)).data;
  },

  async fetchRuleSet(id: string): Promise<IRuleSet> {
    return (await $api.get<IRuleSet>(apiRoutes.getRuleSetById + id)).data;
  },

  async fetchRecyclePointsByIds(
    recyclePointIds: string[]
  ): Promise<IRecyclePoint[]> {
    return (
      await $api.put<IRecyclePoint[]>(apiRoutes.getRecyclePointsByIds, {
        recyclePointIds,
      })
    ).data;
  },

  async logout(): Promise<AxiosResponse> {
    return $api.get(apiRoutes.logout);
  },

  // async createTodo(newTodo) {
  //   const response = await axios.post(`${API_URL}/todos`, newTodo);

  //   return response.data;
  // },
  // async updateTodo(newTodo) {
  //   const { id, created, ...todoPayload } = newTodo;

  //   const response = await axios.put(`${API_URL}/todos/${id}`, todoPayload);

  //   return response.data;
  // },
  // async deleteTodo(todoId) {
  //   const response = await axios.delete(`${API_URL}/todos/${todoId}`);

  //   const isDeleted = response.status === 204;

  //   return { isDeleted };
  // },
});

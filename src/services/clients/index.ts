import { $fetch } from "@/lib/fetch";
import { apiPropTypes } from "@/lib/helpers/getQueryParams";

export const getAllClientsListAPI = async (params: Partial<apiPropTypes>) => {
  try {
    return await $fetch.get(`/clients`, params);
  } catch (err) {
    console.error(err);
  }
};
export const deleteClientAPI = async (deleteId: string) => {
  try {
    return await $fetch.delete(`/clients/${deleteId}`);
  } catch (err) {
    console.error(err);
  }
};
export const viewClientAPI = async (client_Id: any) => {
  try {
    return await $fetch.get(`/clients/${client_Id}`);
  } catch (err) {
    console.error(err);
  }
};
export const addClientAPI = async (payload: any) => {
  try {
    return await $fetch.post(`/clients`, payload);
  } catch (err) {
    console.error(err);
  }
};
export const updateClientAPI = async (clientId: any) => {
  try {
    return await $fetch.patch(`/clients`, clientId);
  } catch (err) {
    console.error(err);
  }
};

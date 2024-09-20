import { $fetch } from "@/lib/fetch";
import { apiPropTypes } from "@/lib/helpers/getQueryParams";

export const getAllClientsListAPI = async (params: Partial<apiPropTypes>) => {
  try {
    return await $fetch.get(`/clients`, params);
  } catch (err) {
    console.error();
  }
};
export const deleteClientAPI = async (deleteId: string) => {
  try {
    return await $fetch.get(`/clients/${deleteId}`);
  } catch (err) {
    console.error();
  }
};

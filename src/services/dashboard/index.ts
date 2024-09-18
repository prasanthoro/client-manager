import { $fetch } from "@/lib/fetch";
import { apiPropTypes } from "@/lib/helpers/getQueryParams";

export const getAllCounts = async (params: Partial<apiPropTypes>) => {
  try {
    return await $fetch.get(`/clients`, params);
  } catch (err) {
    console.error();
  }
};

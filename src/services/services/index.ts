import { $fetch } from "@/lib/fetch";
import { servicesListPropTypes } from "@/lib/interfaces/servicesInterfaces";

export const getAllServicesListAPI = async (params: Partial<servicesListPropTypes>) => {
  try {
    return await $fetch.get(`/services`, params);
  } catch (err) {
    console.error();
  }
};
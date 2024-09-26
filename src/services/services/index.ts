import { $fetch } from "@/lib/fetch";
import { servicesListPropTypes } from "@/lib/interfaces/servicesInterfaces";

export const getAllServicesListAPI = async (params: Partial<servicesListPropTypes>) => {
  try {
    return await $fetch.get(`/services`, params);
  } catch (err) {
    console.error();
  }
};

export const addServiceAPI = async (payload: any) => {
  try {
    return await $fetch.post(`/services`, payload);
  } catch (err) {
    console.error();
  }
};

export const updateServiceAPI = async (payload: any,id: any) => {
  try {
    return await $fetch.patch(`/services/${id}`, payload);
  } catch (err) {
    console.error();
  }
};
export const getServiceAPI = async (id: any) => {
  try {
    return await $fetch.get(`/services/${id}`);
  } catch (err) {
    console.error(err);
  }
};
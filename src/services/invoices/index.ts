import { $fetch } from "@/lib/fetch";
import { invoicesListPropTypes } from "@/lib/interfaces/invoicesInterfaces";

export const getAllInvoicesListAPI = async (
  params: Partial<invoicesListPropTypes>
) => {
  try {
    return await $fetch.get(`/invoices`, params);
  } catch (err) {
    console.error();
  }
};

export const clientNameDropDownAPI = async () => {
  try {
    return await $fetch.get(`/clients/list/drop-down`);
  } catch (err) {
    console.error();
  }
};
export const servicesDropDownAPI = async () => {
  try {
    return await $fetch.get(`/services/drop-down`);
  } catch (err) {
    console.error();
  }
};
export const addInvoiceAPI = async (payload: any) => {
  try {
    return await $fetch.post(`/invoices`, payload);
  } catch (err) {
    console.error();
  }
};

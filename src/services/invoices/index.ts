import { $fetch } from "@/lib/fetch";
import { invoicesListPropTypes } from "@/lib/interfaces/invoicesInterfaces";

export const getAllInvoicesListAPI = async (params: Partial<invoicesListPropTypes>) => {
  try {
    return await $fetch.get(`/invoices`, params);
  } catch (err) {
    console.error();
  }
};
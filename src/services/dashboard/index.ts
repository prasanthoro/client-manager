import { $fetch } from "@/lib/fetch";
import { apiPropTypes } from "@/lib/helpers/getQueryParams";

export const getAllClientsCountsAPI = async () => {
  try {
    return await $fetch.get(`/clients/count`);
  } catch (err) {
    console.error();
  }
};
export const getServicesCountsAPI = async () => {
  try {
    return await $fetch.get(`/services/count`);
  } catch (err) {
    console.error();
  }
};
export const getInvoiceAmountAPI = async () => {
  try {
    return await $fetch.get(`/invoices/amount`);
  } catch (err) {
    console.error();
  }
};

export const getServicesWiseInvoicesAmountAPI = async () => {
  try {
    return await $fetch.get(`/services/dashboard/invoice-amount`);
  } catch (err) {
    console.error();
  }
};

export const getClientWiseTotalInvoiceAmountAPI = async (params: any) => {
  try {
    return await $fetch.get(`/invoices/latest/five`, params);
  } catch (err) {
    console.error();
  }
};

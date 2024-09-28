import { $fetch } from "@/lib/fetch";
import { apiPropTypes } from "@/lib/helpers/getQueryParams";

export const getAllClientsCountsAPI = async (params: any) => {
  try {
    return await $fetch.get(`/clients/count`, params);
  } catch (err) {
    console.error();
  }
};

export const getInvoiceAmountAPI = async (params: any) => {
  try {
    return await $fetch.get(`/invoices/amount`, params);
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
export const getServiceOneTimeInvoiceAmountAPI = async (params: any) => {
  try {
    return await $fetch.get(`/clients/one-time-type/summary`, params);
  } catch (err) {
    console.error();
  }
};
export const getRecuringTypeAmountAPI = async (params: any) => {
  try {
    return await $fetch.get(`/clients/recurring-type/summary`, params);
  } catch (err) {
    console.error();
  }
};

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

export const uploadInvoiceAPI = (payload: any) => {
  try {
    return $fetch.post(`/invoices/upload`, payload);
  } catch (err) {
    console.error();
  }
};
export const getSingleInvoicePI = (invoice_id: any) => {
  try {
    return $fetch.get(`/invoices/${invoice_id}`);
  } catch (err) {
    console.error();
  }
};
export const updateInvoiceAPI = (invoice_id: any, payload: any) => {
  try {
    return $fetch.patch(`/invoices/${invoice_id}`, payload);
  } catch (err) {
    console.error();
  }
};

export const uploadFileToS3 = async (file: any, url: string) => {
  try {
    const options = {
      body: file,
      method: "PUT",
    };
    const response = await fetch(url, options);
    return response;
  } catch (err) {
    throw err;
  }
};

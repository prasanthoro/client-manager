import { $fetch } from "@/lib/fetch";
import { apiPropTypes } from "@/lib/helpers/getQueryParams";
import { invoicesListPropTypes } from "@/lib/interfaces/invoicesInterfaces";

export const getAllClientsListAPI = async (params: Partial<apiPropTypes>) => {
  try {
    return await $fetch.get(`/clients`, params);
  } catch (err) {
    console.error(err);
  }
};
export const getClientsDropDownAPI = async () => {
  try {
    return await $fetch.get(`/clients/list/drop-down`);
  } catch (err: any) {
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
export const viewInvoiceAPI = async (
  client_Id: any,
  params: Partial<invoicesListPropTypes>
) => {
  try {
    return await $fetch.get(`/invoices/list/${client_Id}`, params);
  } catch (err) {
    console.error(err);
  }
};
export const updateClientAPI = async (client_Id: any, payload: any) => {
  try {
    return await $fetch.patch(`/clients/${client_Id}`, payload);
  } catch (err) {
    console.error(err);
  }
};
export const clientWiseServicesAPI = async (client_Id: any) => {
  try {
    return await $fetch.get(`/clients/${client_Id}/services`);
  } catch (err) {
    console.error(err);
  }
};
export const clientWiseInvoicesAPI = async (client_Id: any) => {
  try {
    return await $fetch.get(`/clients/${client_Id}/invoices`);
  } catch (err) {
    console.error(err);
  }
};

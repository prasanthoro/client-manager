import { $fetch } from "@/lib/fetch";
import { apiPropTypes } from "@/lib/helpers/getQueryParams";

export const getAllClientsListAPI = async (params: Partial<apiPropTypes>) => {
  try {
    return await $fetch.get(`/`, params);
  } catch (err) {
    console.error();
  }
};
export const getClientsAPI = async () => {
  try {
    const response = await fetch(
      `https://api.jsonbin.io/v3/b/66e7d597acd3cb34a8854933`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error fetching properties:", err);
    throw err;
  }
};

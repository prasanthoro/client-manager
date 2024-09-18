"use client";

import { apiPropTypes } from "@/lib/helpers/getQueryParams";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import {
  getAllClientsListAPI,
  getClientsAPI,
} from "@/services/clients/getAllClients";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Clients = () => {
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  //   const getAllClients = async ({
  //     page = params.get("page") as string,
  //     limit = (params.get("limit") as string) || 10,
  //   }: Partial<apiPropTypes>) => {
  //     try {
  //       if (loading) return;
  //       setLoading(true);
  //       let queryParams = {
  //         page: page ? page : 1,
  //         limit: limit ? limit : 25,
  //       };
  //       let queryString = prepareURLEncodedParams("", queryParams);
  //       router.push(`${pathname}${queryString}`);
  //       const response = await getClientsAPI();
  //       if (response?.status == 200 || response?.status == 201) {
  //         setClientsData(response?.data);
  //         console.log(clientsData, "data");
  //       } else {
  //         throw response;
  //       }
  //     } catch (err: any) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const fetchProperties = async () => {
    try {
      const data = await getClientsAPI();
      setClientsData(data.clients);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // getAllClients({});
    fetchProperties();
  }, []);
};
export default Clients;

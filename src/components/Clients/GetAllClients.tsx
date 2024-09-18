"use client";

import { apiPropTypes } from "@/lib/helpers/getQueryParams";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import { getAllClientsListAPI } from "@/services/clients/getAllClients";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import TanStackTableComponent from "../core/TanstackTable";
import { clientColumns } from "./ClientColumns";
import { ViewButton } from "./ViewButton";

const Clients = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [clientsData, setClientsData] = useState([]);
  const [paginationDetails, setPaginationDetails] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(clientsData, "client");
  const getAllClients = async ({
    page = params.get("page") as string,
    limit = params.get("limit") as string,
  }: Partial<apiPropTypes>) => {
    try {
      let queries = {
        page,
        limit,
      };
      setLoading(true);
      let queryString = prepareURLEncodedParams("", queries);

      router.push(`${pathname}${queryString}`);
      const response = await getAllClientsListAPI(queries);
      let { data, ...rest } = response?.data;
      setClientsData(data);
      setPaginationDetails(rest);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllClients({});
  }, []);

  return (
    <div>
      <TanStackTableComponent
        columns={clientColumns()}
        getData={getAllClients}
        data={clientsData}
        paginationDetails={paginationDetails}
        loading={loading}
        removeSortingForColumnIds={["name"]}
      />
    </div>
  );
};
export default Clients;

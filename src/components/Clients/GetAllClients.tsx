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
  const getAllClients = async ({
    page = (params.get("page") as string) || 1,
    limit = (params.get("limit") as string) || 25,
    order_by = params.get("order_by") as string,
    order_type = params.get("order_type") as string,
  }: Partial<apiPropTypes>) => {
    try {
      let queryParams: any = {
        page: page ? page : 1,
        limit: limit ? limit : 25,
        order_by: order_by,
        order_type: order_type,
      };

      if (order_by) {
        queryParams["order_by"] = order_by;
      }
      if (order_type) {
        queryParams["order_type"] = order_type;
      }

      setLoading(true);
      let queryString = prepareURLEncodedParams("", queryParams);

      router.push(`${pathname}${queryString}`);
      const response = await getAllClientsListAPI(queryParams);
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
        columns={clientColumns(getAllClients)}
        getData={getAllClients}
        data={clientsData}
        paginationDetails={paginationDetails}
        loading={loading}
        removeSortingForColumnIds={[""]}
      />
    </div>
  );
};
export default Clients;

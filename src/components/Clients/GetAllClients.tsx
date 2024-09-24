"use client";

import { apiPropTypes } from "@/lib/helpers/getQueryParams";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import TanStackTableComponent from "../core/TanstackTable";
import { clientColumns } from "./ClientColumns";
import { ViewButton } from "./ViewButton";
import { getAllClientsListAPI } from "@/services/clients";
import { LoadingComponent } from "../core/LoadingComponent";

const Clients = () => {
  const params = useSearchParams();

  const pathname = usePathname();
  const router = useRouter();
  const [clientsData, setClientsData] = useState([]);
  const [paginationDetails, setPaginationDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const getAllClients = async ({
    page = (params.get("page") as string) || 1,
    limit = (params.get("limit") as string) || 25,
    sort_by = params.get("sort_by") as string,
    sort_type = params.get("sort_type") as string,
  }: Partial<apiPropTypes>) => {
    try {
      let queryParams: any = {
        page: page ? page : 1,
        limit: limit ? limit : 25,
        sort_by: sort_by,
        sort_type: sort_type,
      };

      if (sort_by) {
        queryParams["sort_by"] = sort_by;
      }
      if (sort_type) {
        queryParams["sort_type"] = sort_type;
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
    <>
      <div className="flex">
        <Button
          className="ml-auto bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => router.push("/clients/addclient")}
        >
          Add client
        </Button>
      </div>

      <div>
        <TanStackTableComponent
          columns={clientColumns(getAllClients)}
          getData={getAllClients}
          data={clientsData}
          paginationDetails={paginationDetails}
          loading={loading}
          // removeSortingForColumnIds={["volume", "volum"]}
        />
        <LoadingComponent loading={loading} label={"Clients"} />
      </div>
    </>
  );
};
export default Clients;

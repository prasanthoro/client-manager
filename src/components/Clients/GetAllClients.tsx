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
import { Input } from "../ui/input";
import { on } from "stream";
import dayjs from "dayjs";
import Image from "next/image";

const Clients = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [clientsData, setClientsData] = useState([]);
  const [paginationDetails, setPaginationDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [dateInformation, setDateInformation] = useState<any>([]);

  const getAllClients = async ({
    page = (params.get("page") as string) || 1,
    limit = (params.get("limit") as string) || 25,
    search_string = params.get("search_string") as string,
    from_date = params.get("from_date") as any,
    to_date = params.get("to_date") as any,

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
      if (search_string) {
        queryParams["search_string"] = search_string;
      }
      if (from_date) {
        queryParams["from_date"] = from_date;
      }
      if (to_date) {
        queryParams["to_date"] = to_date;
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
  const onSerachChange = async (event: any) => {
    const client = event?.target.value;
    setSearchString(client);
    await getAllClients({ search_string: client });
  };
  const handleDateChange = async (value: any) => {
    if (value) {
      await setDateInformation(value);
      let date1 = dayjs(value[0])?.format("YYYY-MM-DD");
      let date2 = dayjs(value[1])?.format("YYYY-MM-DD");
      await getAllClients({
        from_date: date1,
        to_date: date2,
      });
    } else {
      setDateInformation([]);
      await getAllClients({
        from_date: "",
        to_date: "",
      });
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
      <div className="relative w-full">
        <Input
          type="search"
          value={searchString}
          onChange={onSerachChange}
          placeholder="Search Payor Name"
          className="defaultAutoComplete block w-full px-4 py-2 pr-12 border rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Image
            src="/icons/search-icon-with-bg-red.svg"
            height={20}
            width={20}
            alt="search"
          />
        </span>
      </div>

      <div>
        <TanStackTableComponent
          columns={clientColumns(getAllClients)}
          getData={getAllClients}
          data={clientsData}
          paginationDetails={paginationDetails}
          loading={loading}
          removeSortingForColumnIds={[""]}
        />
        <LoadingComponent loading={loading} label={"Clients"} />
      </div>
    </>
  );
};
export default Clients;

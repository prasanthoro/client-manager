"use client";
import { apiPropTypes } from "@/lib/helpers/getQueryParams";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import {
  getAllClientsListAPI,
  getClientsDropDownAPI,
} from "@/services/clients";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingComponent } from "../core/LoadingComponent";
import TanStackTableComponent from "../core/TanstackTable";
import { Button } from "../ui/button";
import { clientColumns } from "./ClientColumns";
import ClientFilters from "./ClientFilters";
const Clients = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [clientsData, setClientsData] = useState([]);
  const [paginationDetails, setPaginationDetails] = useState({});
  const [dropDownClientsData, setDropDownClientsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [dateInformation, setDateInformation] = useState<any>([]);
  const getAllClients = async ({
    page = (params.get("page") as string) || 1,
    limit = (params.get("limit") as string) || 25,
    search_string = params.get("search_string") as string,
    client_id = params.get("client_id") as string,
    from_date = params.get("from_date") as any,
    to_date = params.get("to_date") as any,
    sort_by = params.get("sort_by") as string,
    sort_type = params.get("sort_type") as string,
  }: Partial<apiPropTypes>) => {
    try {
      let queryParams: any = {
        page: page ? page : 1,
        limit: limit ? limit : 25,
        sort_by: sort_by,
        sort_type: sort_type,
        client_id: client_id,
      };
      if (sort_by) {
        queryParams["sort_by"] = sort_by;
      }
      if (sort_type) {
        queryParams["sort_type"] = sort_type;
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
      data = addSerial(data, rest.page, rest.limit);
      if (!data?.length && rest.page != 1) {
        await getAllClients({ page: +rest.page - 1 });
      } else {
        setPaginationDetails(rest);
        setClientsData(data);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const getClientsDropDown = async () => {
    try {
      const response = await getClientsDropDownAPI();
      if (response?.status == 200 || response?.status == 201) {
        setDropDownClientsData(response?.data?.data);
      } else {
        throw response;
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
    }
  };
  const addSerial = (dataArray: any, page: any, limit: any) => {
    if (dataArray?.length) {
      let arrayAfterSerial = dataArray.map((item: any, index: number) => {
        return { ...item, serial: (page - 1) * limit + (index + 1) };
      });
      return arrayAfterSerial;
    }
    return [];
  };

  useEffect(() => {
    getAllClients({});
    getClientsDropDown();
  }, []);

  return (
    <>
      <ClientFilters
        getAllClients={getAllClients}
        searchString={searchString}
        setSearchString={setSearchString}
        dateinfo={dateInformation}
        setDateInformation={setDateInformation}
        dropDownClientsData={dropDownClientsData}
      />
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

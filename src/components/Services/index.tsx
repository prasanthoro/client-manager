"use client";

import { servicesListPropTypes } from "@/lib/interfaces/servicesInterfaces";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import { getAllServicesListAPI } from "@/services/services";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { servicesColumns } from "./ServicesColumns";
import TanStackTableComponent from "../core/TanstackTable";
import { LoadingComponent } from "../core/LoadingComponent";
import ServicesFilters from "./ServicesFilters";

const ServicesList = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [servicesData, setServicesData] = useState([]);
  const [paginationDetails, setPaginationDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getAllServices = async ({
    page = (params.get("page") as string) || 1,
    limit = (params.get("limit") as string) || 25,
    sort_by = params.get("sort_by") as string,
    sort_type = params.get("sort_type") as string,
    from_date = params.get("from_date") as string,
    to_date = params.get("to_date") as string,
    search_string = params.get("search_string") as string,
    type = params.get("type") as string,
  }: Partial<servicesListPropTypes>) => {
    try {
      let queryParams: any = {
        page: page ? page : 1,
        limit: limit ? limit : 25,
        sort_by: sort_by,
        sort_type: sort_type,
        from_date: from_date,
        to_date: to_date,
        search_string: search_string,
        type: type,
      };

      setLoading(true);
      let queryString: any = prepareURLEncodedParams("", queryParams);

      router.push(`${pathname}${queryString}`);
      const response = await getAllServicesListAPI(queryParams);
      let { data, ...rest } = response?.data;
      setServicesData(data);
      setPaginationDetails(rest);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllServices({});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-600 ml-2">Services</h1>
      <ServicesFilters getAllServices={getAllServices} />
      <TanStackTableComponent
        columns={servicesColumns()}
        getData={getAllServices}
        data={servicesData}
        paginationDetails={paginationDetails}
        loading={loading}
        removeSortingForColumnIds={["actions"]}
      />
      <LoadingComponent loading={loading} label={"Services"} />
    </div>
  );
};
export default ServicesList;

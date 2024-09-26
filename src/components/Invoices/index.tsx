"use client";

import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TanStackTableComponent from "../core/TanstackTable";
import { invoicesColumns } from "./InvoicesColumns";
import { invoicesListPropTypes } from "@/lib/interfaces/invoicesInterfaces";
import { clientNameDropDownAPI, getAllInvoicesListAPI, servicesDropDownAPI } from "@/services/invoices";
import { LoadingComponent } from "../core/LoadingComponent";
import InvoicesFilters from "./InvoicesFilters";

const InvoicesList = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [invoicesData, setInvoicesData] = useState([]);
  const [clientNameForDropDown, setClientNameForDropDown] = useState<any>([]);
  const [servicesForDropDown, setServicesForDropDown] = useState<any>([]);
  const [paginationDetails, setPaginationDetails] = useState({});
  const [searchString, setSearchString] = useState(
    params.get("search_string") ? params.get("search_string") : ''
  );
  const [selectStatus, setSelectStatus] = useState(
    params.get("invoice_status") ? params.get("invoice_status") : 'ALL'
  );
  const [loading, setLoading] = useState(true);

  const getAllIvoices = async ({
    page = (params.get("page") as string) || 1,
    limit = (params.get("limit") as string) || 25,
    sort_by = params.get("sort_by") as string,
    sort_type = params.get("sort_type") as string,
    from_date = params.get("from_date") as string,
    to_date = params.get("to_date") as string,
    search_string = params.get("search_string") as string,
    invoice_status = params.get("invoice_status") as string,
    client_id = params.get("client_id") as string,
    service_id = params.get("service_id") as string,
    type = params.get("type") as string,
  }: Partial<invoicesListPropTypes>) => {
    try {
      let queryParams: any = {
        page: page ? page : 1,
        limit: limit ? limit : 25,
        sort_by: sort_by,
        sort_type: sort_type,
        from_date: from_date,
        to_date: to_date,
        search_string: search_string,
        status: invoice_status,
        client_id: client_id,
        service_id: service_id,
        type: type,
      };

      setLoading(true);
      let queryString: any = prepareURLEncodedParams("", queryParams);

      router.push(`${pathname}${queryString}`);
      const response = await getAllInvoicesListAPI(queryParams);
      let { data, ...rest } = response?.data;
      setInvoicesData(data);
      setPaginationDetails(rest);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clientNameDropDown = async () => {
    // setLoading(true);
    try {
      const reponse = await clientNameDropDownAPI();
      if (reponse?.status == 200 || reponse?.status == 201) {
        setClientNameForDropDown(reponse?.data?.data);
      }
    } catch (error) {
    } 
  };

  const servicesDropDown = async () => {
    // setLoading(true);
    try {
      const reponse = await servicesDropDownAPI();
      if (reponse?.status == 200 || reponse?.status == 201) {
        setServicesForDropDown(reponse?.data?.data);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
      getAllIvoices({});
      clientNameDropDown();
      servicesDropDown();
  }, []);

  return (
    <div>
      <InvoicesFilters
        getAllIvoices={getAllIvoices}
        searchString={searchString}
        setSearchString={setSearchString}
        selectStatus={selectStatus}
        setSelectStatus={setSelectStatus}
        clientNameForDropDown={clientNameForDropDown}
        servicesForDropDown={servicesForDropDown}
      />
      <TanStackTableComponent
        columns={invoicesColumns()}
        getData={getAllIvoices}
        data={invoicesData}
        paginationDetails={paginationDetails}
        loading={loading}
        removeSortingForColumnIds={["actions"]}
      />
      <LoadingComponent loading={loading} label={"Invoices"} />
    </div>
  );
};
export default InvoicesList;

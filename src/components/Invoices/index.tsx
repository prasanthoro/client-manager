"use client";

import { addSerial, formatAmount } from "@/lib/helpers/core/formatAmount";
import { invoicesListPropTypes } from "@/lib/interfaces/invoicesInterfaces";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import {
  clientNameDropDownAPI,
  getAllInvoicesListAPI,
  servicesDropDownAPI,
} from "@/services/invoices";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../core/LoadingComponent";
import TanStackTableComponent from "../core/TanstackTable";
import { invoicesColumns } from "./InvoicesColumns";
import InvoicesFilters from "./InvoicesFilters";
import { getInvoiceAmountAPI } from "@/services/dashboard";
import { format } from "path";
import CountUp from "react-countup";
const InvoicesList = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [invoicesData, setInvoicesData] = useState([]);
  const [clientNameForDropDown, setClientNameForDropDown] = useState<any>([]);
  const [servicesForDropDown, setServicesForDropDown] = useState<any>([]);
  const [paginationDetails, setPaginationDetails] = useState({});
  const [searchString, setSearchString] = useState(
    params.get("search_string") ? params.get("search_string") : ""
  );
  const [selectStatus, setSelectStatus] = useState(
    params.get("status") ? params.get("status") : ""
  );
  const [loading, setLoading] = useState(true);
  const [invoiceAmount, setInvoiceAmount] = useState<any>([]);
  const getAllIvoices = async ({
    page = (params.get("page") as string) || 1,
    limit = (params.get("limit") as string) || 25,
    sort_by = params.get("sort_by") as string,
    sort_type = params.get("sort_type") as string,
    from_date = params.get("from_date") as string,
    to_date = params.get("to_date") as string,
    search_string = params.get("search_string") as string,
    invoice_status = params.get("status") as string,
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
      data = addSerial(data, rest.page, rest.limit);
      if (!data?.length && rest.page != 1) {
        await getAllIvoices({ page: +rest.page - 1 });
      } else {
        setPaginationDetails(rest);
        setInvoicesData(data);
      }
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
    } catch (error) {}
  };

  const getInvoiceAmount = async ({
    from_date = params.get("from_date") as string,
    to_date = params.get("to_date") as string,
    client_id = params.get("client_id") as string,
    service_id = params.get("service_id") as string,
    type = params.get("type") as string,
    status = params.get("status") as string,
  }) => {
    try {
      let queryParams: any = {};

      if (from_date) {
        queryParams["from_date"] = from_date;
      }
      if (to_date) {
        queryParams["to_date"] = to_date;
      }
      if (client_id) {
        queryParams["client_id"] = client_id;
      }
      if (service_id) {
        queryParams["service_id"] = service_id;
      }
      if (type) {
        queryParams["type"] = type;
      }
      if (status) {
        queryParams["status"] = status;
      }

      const response = await getInvoiceAmountAPI(queryParams);
      if (response?.status == 200 || response?.status == 201) {
        let { data } = response?.data;
        setInvoiceAmount(data[0]?.total_amount);
      } else {
        throw response;
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const servicesDropDown = async () => {
    // setLoading(true);
    try {
      const reponse = await servicesDropDownAPI();
      if (reponse?.status == 200 || reponse?.status == 201) {
        setServicesForDropDown(reponse?.data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllIvoices({});
    clientNameDropDown();
    servicesDropDown();
    getInvoiceAmount({});
  }, []);

  const formatToIndianCurrency = (value: any) => {
    return `₹`+value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-600 ml-2">Invoices</h1>
      <InvoicesFilters
        getAllIvoices={getAllIvoices}
        searchString={searchString}
        setSearchString={setSearchString}
        selectStatus={selectStatus}
        setSelectStatus={setSelectStatus}
        clientNameForDropDown={clientNameForDropDown}
        servicesForDropDown={servicesForDropDown}
        getInvoiceAmount={getInvoiceAmount}
      />
      <div
        style={{
          width: "20%",
          backgroundColor: "#78B7FC",
          color: "black",
          height: "50px",
          alignContent: "center",
          borderRadius: "10px",
          marginBottom: "20px",
          justifyItems: "end",
        }}
      >
        <h1 className="text-sm font-bold text-black-600 ml-1">
          Total Revenue:{" "}
          {
            <CountUp
              start={0}
              end={invoiceAmount || 0}
              duration={2}
              formattingFn={formatToIndianCurrency} // Use custom formatting
              prefix="₹"
              separator=","
              decimals={2}
            />
          }
        </h1>
      </div>
      <TanStackTableComponent
        columns={invoicesColumns()}
        getData={getAllIvoices}
        data={invoicesData}
        paginationDetails={paginationDetails}
        loading={loading}
        removeSortingForColumnIds={["actions", "serial"]}
      />
      <LoadingComponent loading={loading} label={"Invoices"} />
    </div>
  );
};
export default InvoicesList;

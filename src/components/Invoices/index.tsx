"use client";

import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TanStackTableComponent from "../core/TanstackTable";
import { invoicesColumns } from "./InvoicesColumns";
import { invoicesListPropTypes } from "@/lib/interfaces/invoicesInterfaces";
import { getAllInvoicesListAPI } from "@/services/invoices";
import { LoadingComponent } from "../core/LoadingComponent";

const InvoicesList = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [invoicesData, setInvoicesData] = useState([]);
  const [paginationDetails, setPaginationDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getAllIvoices = async ({
    page = (params.get("page") as string) || 1,
    limit = (params.get("limit") as string) || 25,
    sort_by = params.get("sort_by") as string,
    sort_type = params.get("sort_type") as string,
  }: Partial<invoicesListPropTypes>) => {
    try {
      let queryParams: any = {
        page: page ? page : 1,
        limit: limit ? limit : 25,
        sort_by: sort_by,
        sort_type: sort_type,
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

  useEffect(() => {
    getAllIvoices({});
  }, []);

  return (
    <div>
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

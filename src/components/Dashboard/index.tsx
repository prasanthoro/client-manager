"use client";
import { Boxes, DollarSign, ShoppingBag, Users2 } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getAllClientsCountsAPI,
  getClientWiseTotalInvoiceAmountAPI,
  getInvoiceAmountAPI,
  getServicesCountsAPI,
  getServicesWiseInvoicesAmountAPI,
} from "@/services/dashboard";
import { formatAmount } from "@/lib/helpers/core/formatAmount";
import ClientWiseServicesList from "./ClientWiseServices";
import ClientWiseInvoicesList from "./ClientWiseInvoices";
import { LoadingComponent } from "../core/LoadingComponent";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import dayjs from "dayjs";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";

export const Dashboard = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [clientsCount, setClientsCount] = useState([]);
  const [serviceCount, setServicesCount] = useState([]);
  const [clientWiseTotallInvoices, setClientWiseTotalInvoices] = useState([]);

  const [invoiceAmount, setInvoiceAmount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateInformation, setDateInformation] = useState<any>([]);

  const getAllClientsCount = async () => {
    try {
      setLoading(true);
      const response = await getAllClientsCountsAPI();
      if (response?.status == 200 || response?.status == 201) {
        let { data } = response?.data;
        setClientsCount(data);
      } else {
        throw response;
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getServicesCount = async () => {
    setLoading(true);
    try {
      const response = await getServicesCountsAPI();
      if (response?.status == 200 || response?.status == 201) {
        let { data } = response?.data;
        setServicesCount(data);
      } else {
        throw response;
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getInvoiceAmount = async () => {
    setLoading(true);
    try {
      const response = await getInvoiceAmountAPI();
      if (response?.status == 200 || response?.status == 201) {
        let { data } = response?.data;
        setInvoiceAmount(data);
      } else {
        throw response;
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getClientWiseTotalInvoiceAmount = async ({
    from_date = params?.get("from_date") as any,
    to_date = params?.get("to_date") as any,
  }) => {
    try {
      let queryParams: any = {};

      if (from_date) {
        queryParams["from_date"] = from_date;
      }
      if (to_date) {
        queryParams["to_date"] = to_date;
      }

      let queryString = prepareURLEncodedParams("", queryParams);
      console.log(queryString, "string");

      router.push(`${pathname}${queryString}`);
      setLoading(true);
      const response = await getClientWiseTotalInvoiceAmountAPI({
        from_date,
        to_date,
      });
      if (response?.status == 200 || response?.status == 201) {
        let { data } = response?.data;
        setClientWiseTotalInvoices(data);
      } else {
        throw response;
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleDateChange = async (value: any) => {
    if (value) {
      await setDateInformation(value);
      let date1 = dayjs(value[0])?.format("YYYY-MM-DD");
      let date2 = dayjs(value[1])?.format("YYYY-MM-DD");
      await getClientWiseTotalInvoiceAmount({
        from_date: date1,
        to_date: date2,
      });
    } else {
      setDateInformation([]);
      await getClientWiseTotalInvoiceAmount({
        from_date: "",
        to_date: "",
      });
    }
  };

  useEffect(() => {
    getAllClientsCount();
    getServicesCount();
    getInvoiceAmount();

    getClientWiseTotalInvoiceAmount({});
  }, []);
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div>
              <DateRangePicker
                className="dateRangePicker"
                placeholder="Select Date"
                value={dateInformation}
                format="MM-dd-yyyy"
                onChange={handleDateChange}
                editable={false}
                disabledDate={(date: Date) => date.valueOf() > Date?.now()}
              />
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-2 max-w-xs mx-auto">
                <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg rounded-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-lg font-bold">
                      Total Clients
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">{clientsCount}</div>
                  </CardContent>
                </div>
              </Card>
              <Card className="p-2 max-w-xs mx-auto">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-lg font-bold">
                      Invoices Amount
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">
                      {formatAmount(invoiceAmount)}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </main>
          <div className="flex justify-center gap-[20px] mt-6">
            <ClientWiseInvoicesList
              clientWiseTotallInvoices={clientWiseTotallInvoices}
            />
            {/* <div className="w-1/2 pr-4"></div> */}
          </div>
        </div>
        <LoadingComponent loading={loading} label={"Dashboard"} />
      </div>
    </>
  );
};

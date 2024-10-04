"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import {
  getAllClientsCountsAPI,
  getClientWiseTotalInvoiceAmountAPI,
  getInvoiceAmountAPI,
  getRecuringTypeAmountAPI,
  getServiceOneTimeInvoiceAmountAPI,
} from "@/services/dashboard";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import "rsuite/dist/rsuite.min.css";
import { toast } from "sonner";
import DatePickerWithRange from "../core/DatePickerWithRange";
import { LoadingComponent } from "../core/LoadingComponent";
import { Button } from "../ui/button";
import ClientWiseInvoicesList from "./ClientWiseInvoices";
export const Dashboard = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const [clientsCount, setClientsCount] = useState<any>([]);
  const [oneTimeData, setOneTimeData] = useState<any>([]);
  const [clientWiseTotallInvoices, setClientWiseTotalInvoices] = useState<any>(
    []
  );

  const [invoiceAmount, setInvoiceAmount] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [dateInformation, setDateInformation] = useState<any>([]);
  const [recuringAmount, setRecurringAmount] = useState<any>([]);
  const getAllClientsCount = async ({
    from_date = params.get("from_date") as string,
    to_date = params.get("to_date") as string,
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

      router.push(`${pathname}${queryString}`);
      setLoading(true);
      const response = await getAllClientsCountsAPI({
        from_date,
        to_date,
      });
      if (response?.status == 200 || response?.status == 201) {
        let { data } = response?.data;
        setClientsCount(data);
      } else {
        throw response;
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getInvoiceAmount = async ({
    from_date = params.get("from_date") as string,
    to_date = params.get("to_date") as string,
  }) => {
    setLoading(true);
    try {
      let queryParams: any = {};

      if (from_date) {
        queryParams["from_date"] = from_date;
      }
      if (to_date) {
        queryParams["to_date"] = to_date;
      }
      let queryString = prepareURLEncodedParams("", queryParams);

      router.push(`${pathname}${queryString}`);
      const response = await getInvoiceAmountAPI({
        from_date,
        to_date,
      });
      if (response?.status == 200 || response?.status == 201) {
        let { data } = response?.data;
        setInvoiceAmount(data[0]?.total_amount);
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
  const serviceOneTimeInvoiceCount = async ({
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

      router.push(`${pathname}${queryString}`);
      setLoading(true);
      const response = await getServiceOneTimeInvoiceAmountAPI({
        from_date,
        to_date,
      });
      if (response?.status == 200 || response?.status == 201) {
        let { data } = response?.data;
        setOneTimeData(data[0]);
      } else {
        throw response;
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const recurringTypeAmount = async ({
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

      router.push(`${pathname}${queryString}`);
      setLoading(true);
      const response = await getRecuringTypeAmountAPI({
        from_date,
        to_date,
      });
      if (response?.status == 200 || response?.status == 201) {
        let { data } = response?.data;
        setRecurringAmount(data[0]);
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

  const onDataChange = async (date: any) => {
    if (date) {
      let fromDate = dayjs(date[0]).format("YYYY-MM-DD");
      let toDate = dayjs(date[1]).format("YYYY-MM-DD");

      await getClientWiseTotalInvoiceAmount({
        from_date: fromDate,
        to_date: toDate,
      });
      await getAllClientsCount({
        from_date: fromDate,
        to_date: toDate,
      });
      await recurringTypeAmount({
        from_date: fromDate,
        to_date: toDate,
      });
      await getInvoiceAmount({
        from_date: fromDate,
        to_date: toDate,
      });
      await serviceOneTimeInvoiceCount({
        from_date: fromDate,
        to_date: toDate,
      });
    } else {
      await getClientWiseTotalInvoiceAmount({
        from_date: "",
        to_date: "",
      });
      await getAllClientsCount({
        from_date: "",
        to_date: "",
      });
      await recurringTypeAmount({
        from_date: "",
        to_date: "",
      });
      await getInvoiceAmount({
        from_date: "",
        to_date: "",
      });
      await serviceOneTimeInvoiceCount({
        from_date: "",
        to_date: "",
      });
    }
  };

  const formatToIndianCurrency = (value: any) => {
    return `₹`+value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    getAllClientsCount({});
    recurringTypeAmount({});
    getInvoiceAmount({});
    serviceOneTimeInvoiceCount({});

    getClientWiseTotalInvoiceAmount({});
  }, []);
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div>
              <DatePickerWithRange onDataChange={onDataChange} />
            </div>
            <div>
              <Button
                onClick={() => router.push("/clients/addclient")}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Add Client
              </Button>
            </div>
            <div>
              <Button
                onClick={() => router.push("/add-invoice")}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Add Invoice
              </Button>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="grid gap-4 lg:grid-cols-3">
              <div>
                <Card
                  style={{ cursor: "pointer" }}
                  className="p-2 max-w-xs mx-auto"
                  onClick={() => router.push("/clients")}
                >
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg rounded-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                      <CardTitle className="text-lg font-bold">
                        Total Clients
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">
                        <CountUp
                          start={0}
                          end={clientsCount || 0}
                          duration={2}
                          separator=","
                        />
                      </div>
                    </CardContent>
                  </div>
                </Card>
                <Card
                  style={{ cursor: "pointer" }}
                  className="p-2 max-w-xs mx-auto"
                  onClick={() => router.push("/invoices")}
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                      <CardTitle className="text-lg font-bold">
                        Total Revenue
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">
                        <CountUp
                          start={0}
                          end={invoiceAmount || 0}
                          formattingFn={formatToIndianCurrency}
                          duration={2}
                          prefix="₹"
                          separator=","
                          decimals={2}
                        />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
              <Card
                style={{ cursor: "pointer" }}
                className="p-2 max-w-xs mx-auto"
                onClick={() =>
                  router.push("/invoices?page=1&limit=25&type=ONE-TIME")
                }
              >
                <div className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white shadow-lg rounded-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-lg font-bold">
                      One Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-left">
                        <p className="text-sm">Total Clients</p>
                        <p className="text-lg font-bold">
                          <CountUp
                            start={0}
                            end={oneTimeData?.total_one_time_clients || 0}
                            duration={2}
                            separator=","
                          />
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm">Total Services</p>
                        <p className="text-lg font-bold">
                          <CountUp
                            start={0}
                            end={oneTimeData?.total_one_time_services || 0}
                            duration={2}
                            separator=","
                          />
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-left">
                        <p className="text-sm">Clients Wise Revenue</p>
                        <p className="text-lg font-bold">
                          <CountUp
                            start={0}
                            end={
                              oneTimeData?.total_one_time_clients_invoice_amount ||
                              0
                            }
                            formattingFn={formatToIndianCurrency}
                            duration={2}
                            prefix="₹"
                            separator=","
                          />
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm">Services Wise Revenue</p>
                        <p className="text-lg font-bold">
                          <CountUp
                            start={0}
                            end={
                              oneTimeData?.total_one_time_services_invoice_amount ||
                              0
                            }
                            formattingFn={formatToIndianCurrency}
                            duration={2}
                            prefix="₹"
                            separator=","
                          />
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
              <Card
                style={{ cursor: "pointer" }}
                className="p-2 max-w-xs mx-auto"
                onClick={() =>
                  router.push("/invoices?page=1&limit=25&type=RECURRING")
                }
              >
                <div className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white shadow-lg rounded-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-lg font-bold">
                      Recurring
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-left">
                        <p className="text-sm">Total Clients</p>
                        <p className="text-lg font-bold">
                          <CountUp
                            start={0}
                            end={recuringAmount?.total_recurring_clients || 0}
                            duration={2}
                            separator=","
                          />
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm">Total Services</p>
                        <p className="text-lg font-bold">
                          <CountUp
                            start={0}
                            end={recuringAmount?.total_recurring_services || 0}
                            duration={2}
                            separator=","
                          />
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-left">
                        <p className="text-sm">Clients Wise Revenue</p>
                        <p className="text-lg font-bold">
                          <CountUp
                            start={0}
                            end={
                              recuringAmount?.total_recurring_clients_invoice_amount ||
                              0
                            }
                            formattingFn={formatToIndianCurrency}
                            duration={2}
                            prefix="₹"
                            separator=","
                          />
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm">Services Wise Revenue</p>
                        <p className="text-lg font-bold">
                          <CountUp
                            start={0}
                            end={
                              recuringAmount?.total_recurring_services_invoice_amount ||
                              0
                            }
                            formattingFn={formatToIndianCurrency}
                            duration={2}
                            prefix="₹"
                            separator=","
                          />
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </main>
          <div className="flex justify-between my-4">
            <h5>Latest Invoices</h5>
            <Button onClick={() => router.push("/invoices")}>
              View All Invoices
            </Button>
          </div>
          <div className="flex justify-center gap-[20px] mt-6">
            <ClientWiseInvoicesList
              clientWiseTotallInvoices={clientWiseTotallInvoices}
            />
          </div>
        </div>
        <LoadingComponent loading={loading} label={"Loading Dashboard..."} />
      </div>
    </>
  );
};

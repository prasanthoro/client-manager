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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
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

export const Dashboard = () => {
  const router = useRouter();
  const [clientsCount, setClientsCount] = useState([]);
  const [serviceCount, setServicesCount] = useState([]);
  const [clientWiseTotallInvoices, setClientWiseTotalInvoices] = useState([]);
  const [serviceWiseInvoices, setServiceWiseInvoices] = useState([]);
  const [invoiceAmount, setInvoiceAmount] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const getServicesWiseInvoicesAmount = async () => {
    try {
      setLoading(true);
      const response = await getServicesWiseInvoicesAmountAPI();
      if (response?.status == 200 || response?.status == 201) {
        let { data } = response?.data;
        setServiceWiseInvoices(data);
      } else {
        throw response;
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getClientWiseTotalInvoiceAmount = async () => {
    try {
      setLoading(true);
      const response = await getClientWiseTotalInvoiceAmountAPI();
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

  useEffect(() => {
    getAllClientsCount();
    getServicesCount();
    getInvoiceAmount();
    getServicesWiseInvoicesAmount();
    getClientWiseTotalInvoiceAmount();
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Overview</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total No of Clients
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientsCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Services Count
                </CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{serviceCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Invoices Amount
                </CardTitle>
                <Boxes className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatAmount(invoiceAmount)}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <div className="flex justify-between gap-[20px] mt-6">
          <div className="w-1/2 pl-4">
            <ClientWiseServicesList />
          </div>
          <div className="w-1/2 pr-4">
            <ClientWiseInvoicesList />
          </div>
        </div>
      </div>
      <LoadingComponent loading={loading} label={'Dashboard'}/>
    </div>
  );
};

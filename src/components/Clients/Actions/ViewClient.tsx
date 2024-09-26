"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingComponent } from "@/components/core/LoadingComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { viewClientAPI, viewInvoiceAPI } from "@/services/clients";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ViewClient = () => {
  const { client_Id } = useParams();
  const [clientData, setClientData] = useState<any>();
  const [invoiceData, setInvoiceData] = useState<any>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getSingleClientView = async () => {
    try {
      setLoading(true);
      const response = await viewClientAPI(client_Id);
      if (response?.status == 200 || response?.status == 201) {
        let { data } = response?.data;
        setClientData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const ViewInvoiceList = async () => {
    try {
      setLoading(true);
      const response = await viewInvoiceAPI(client_Id);
      if (response?.status == 200 || response?.status == 201) {
        let { data } = response?.data;
        setInvoiceData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  useEffect(() => {
    getSingleClientView();
    ViewInvoiceList();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 -full hover:bg-pink-200"
          >
            <Image alt="image" width={24} height={24} src="/back-button.svg" />
          </button>
          <h1 className="text-2xl font-bold text-red-600 ml-2">
            Client Information
          </h1>
        </div>
      </div>

      {/* Client Information */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-800">
            Primary Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-4 text-gray-600">
          <div className="grid grid-cols-4 gap-4 text-gray-600">
            <div className="flex flex-col">
              <span className="font-bold">Company Name </span>
              <span>
                {clientData?.company_name ? clientData?.company_name : "--"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Name </span>
              <span>
                {clientData?.client_name ? clientData?.client_name : "--"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold"> Poc </span>
              <span>{clientData?.poc ? clientData?.poc : "--"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Email </span>
              <span>{clientData?.email ? clientData?.email : "--"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Phone </span>
              <span>{clientData?.phone ? clientData?.phone : "--"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Address</span>
              <span>
                {[
                  clientData?.address,
                  clientData?.city,
                  clientData?.state,
                  clientData?.country,
                ]
                  .filter(Boolean)
                  .join(", ") || "--"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader></CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-gray-600">
          <div className="grid grid-cols-3 gap-4 text-gray-600">
            <div className="flex flex-col">
              <span className="font-bold">Remarks</span>
              <span>{clientData?.remarks ? clientData?.remarks : "--"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div>
        <div>
          <h5>Client Invoices</h5>
        </div>

        <div id="clientWiseTable" className="relative">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Invoice Date</TableCell>
                <TableCell>Invoice Status</TableCell>
                <TableCell>Invoice Amount</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceData.length > 0 ? (
                invoiceData.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.company_name ? item.company_name : "--"}
                    </TableCell>
                    <TableCell>
                      {item.client_name ? item.client_name : "--"}
                    </TableCell>
                    <TableCell>{item.type ? item.type : "--"}</TableCell>
                    <TableCell>
                      {item.invoice_date ? item.invoice_date : "--"}
                    </TableCell>
                    <TableCell>
                      {item.invoice_status ? item.invoice_status : "--"}
                    </TableCell>
                    <TableCell>
                      {item.invoice_amount
                        ? `₹ ${Number(item.invoice_amount).toLocaleString(
                            "en-IN"
                          )}`
                        : "--"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: "center" }}>
                    No Invoices
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <LoadingComponent loading={loading} label={""} />
    </div>
  );
};
export default ViewClient;

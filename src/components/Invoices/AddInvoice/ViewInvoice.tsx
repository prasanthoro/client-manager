"use client";
import { LoadingComponent } from "@/components/core/LoadingComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  downloadFile,
  invoiceStatus,
  serviceTypeConstansts,
} from "@/lib/helpers/constants";
import { getSingleInvoicePI } from "@/services/invoices";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ViewInvoice = () => {
  const { invoice_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [invoiceDetails, setInvoiceDetails] = useState<any>();
  const router = useRouter();
  const getSingleInvoice = async () => {
    setLoading(true);
    try {
      const response: any = await getSingleInvoicePI(invoice_id);
      if (response.status == 200 || response.status == 201) {
        setInvoiceDetails(response?.data?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const onDownloadClick = async (name: string, url: string) => {
    setLoading(true);
    try {
      downloadFile(`${name}`, url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleInvoice();
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
            Invoice Information
          </h1>
        </div>
      </div>

      {/* Client Information */}
      <Card>
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
                {invoiceDetails?.company_name
                  ? invoiceDetails?.company_name
                  : "--"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Client Name </span>
              <span>
                {invoiceDetails?.client_name
                  ? invoiceDetails?.client_name
                  : "--"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Service Name </span>
              <span>
                {invoiceDetails?.service_name
                  ? invoiceDetails?.service_name
                  : "--"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Service Type </span>
              <span>
                {invoiceDetails?.type
                  ? serviceTypeConstansts?.find(
                      (item: any) => item.value == invoiceDetails?.type
                    )?.title
                  : "--"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold"> Invoice Status </span>
              <span>
                {invoiceDetails?.invoice_status
                  ? invoiceStatus?.find(
                      (item: any) =>
                        item.value == invoiceDetails?.invoice_status
                    )?.label
                  : "--"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Invoice Date </span>
              <span>
                {invoiceDetails?.invoice_date
                  ? dayjs(invoiceDetails?.invoice_date).format("DD-MM-YYYY")
                  : "--"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Payment Date </span>
              <span>
                {invoiceDetails?.payment_date
                  ? dayjs(invoiceDetails?.payment_date).format("DD-MM-YYYY")
                  : "--"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Invoice Amount </span>
              <span>
                {invoiceDetails?.invoice_amount
                  ? invoiceDetails?.invoice_amount
                  : "--"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Card>
          <CardHeader></CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-gray-600">
            <div className="grid grid-cols-3 gap-4 text-gray-600">
              <div className="flex flex-col">
                <span className="font-bold">Remarks</span>
                <span>
                  {invoiceDetails?.remarks ? invoiceDetails?.remarks : "--"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {invoiceDetails?.url ? (
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <Button
            onClick={() => {
              let label = "downloading";
              setLoading(true);
              setTimeout(() => {
                onDownloadClick(
                  `${invoiceDetails?.client_name}`,
                  invoiceDetails?.url
                );
              }, 1000);
            }}
          >
            {loading ? "Loading..." : "Download"}
          </Button>
        </div>
      ) : (
        ""
      )}

      <LoadingComponent loading={loading} label={"View Invoice"} />
    </div>
  );
};

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ServicesList from "../Services";
import InvoicesList from "../Invoices";
import {
  clientWiseInvoicesAPI,
  clientWiseServicesAPI,
  viewClientAPI,
} from "@/services/clients";
import { LoadingComponent } from "@/components/core/LoadingComponent";

const ViewClient = () => {
  const { client_Id } = useParams();
  const [clientData, setClientData] = useState<any>();
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

  const handleBackClick = () => {
    router.back();
  };

  useEffect(() => {
    getSingleClientView();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button
            onClick={() => router.back()}
            className="p-2 -full hover:bg-gray-200"
          >
            <span className="material-icons">Back</span>
          </Button>
          <h1 className="text-3xl font-bold text-red-600 ml-2">
            Client Information
          </h1>
        </div>

        <span className="bg-purple-500 hover:bg-purple-600 text-white">
          Total Invoice Amount : ₹{clientData?.total_invoice_amount}
        </span>
      </div>

      {/* Client Information */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-800">
            Client Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-4 text-gray-600">
          <div className="grid grid-cols-4 gap-4 text-gray-600">
            <div className="flex flex-col">
              <span className="font-bold">Company Name </span>
              <span>{clientData?.company_name}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Name </span>
              <span>{clientData?.client_name}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold"> Email </span>
              <span>{clientData?.client_email}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Phone </span>
              <span>{clientData?.client_phone}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Address</span>
              <span>
                {clientData?.address}, {clientData?.city}, {clientData?.state},{" "}
                {clientData?.country}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-800">
            Poc Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-4 text-gray-600">
          <div className="grid grid-cols-4 gap-4 text-gray-600">
            <div className="flex flex-col">
              <span className="font-bold">Name </span>
              <span>{clientData?.poc}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold"> Email </span>
              <span>{clientData?.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Phone </span>
              <span>{clientData?.phone}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-800">
            Other Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-gray-600">
          <div className="grid grid-cols-3 gap-4 text-gray-600">
            <div className="flex flex-col">
              <span className="font-bold">Remarks</span>
              <span>{clientData?.remarks}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <LoadingComponent loading={loading} label={""} />
    </div>
  );
};
export default ViewClient;

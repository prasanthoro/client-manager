"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ServicesList from "../Services";
import InvoicesList from "../Invoices";
import { viewClientAPI } from "@/services/clients";

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
            Client Details
          </h1>
        </div>
        <Button className="bg-purple-500 hover:bg-purple-600 text-white">
          Edit
        </Button>
      </div>

      {/* Client Information */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-800">
            Client Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-gray-600">
          <div className="flex flex-col">
            <span className="font-bold">Client Name</span>
            <span>{clientData?.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Poc</span>
            <span>{clientData?.poc}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Role</span>
            <span>{clientData?.role}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-800">
            Address Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-gray-600">
          <div className="flex flex-col">
            <span className="font-bold">Address</span>
            <span>{clientData?.address}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Country</span>
            <span>{clientData?.country}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">State</span>
            <span>{clientData?.state}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">City</span>
            <span>{clientData?.city}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-800">
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-gray-600">
          <div className="flex flex-col">
            <span className="font-bold">Phone No</span>
            <span>{clientData?.phone}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Secondary Phone</span>{" "}
            <span>{clientData?.secondary_phone}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Email</span>
            <span>{clientData?.email}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Remarks</span>
            <span>{clientData?.remarks}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default ViewClient;

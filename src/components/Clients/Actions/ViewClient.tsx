"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { viewClientAPI } from "@/services/clients/getAllClients";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ServicesList from "../Services";
import InvoicesList from "../Invoices";

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
    <Card className="shadow-lg rounded-lg p-6 bg-white border border-gray-200">
    {/* // <div className="h-screen flex flex-col"> */}
      {/* <div className="sticky top-0 z-10 bg-white shadow-md"> */}
        <div className="flex items-center p-4">
          <Button
            onClick={handleBackClick}
            variant="default"
            className="text-orange-500"
          >
            Back
          </Button>
        </div>
      {/* </div> */}
      {/* <div className="flex-grow overflow-y-auto p-6"> */}
      {/* <Card className="shadow-lg rounded-lg p-6 bg-white border border-gray-200"></Card> */}
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-primary">
                Primary Information
              </h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-sm text-gray-500">Client Name</span>
                <p className="text-lg font-medium text-textColor">Sundhar</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">Contact Number</span>
                <p className="text-lg font-medium text-textColor">97257123678</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">Company Name</span>
                <p className="text-lg font-medium text-textColor">India Times</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">Designation</span>
                <p className="text-lg font-medium text-textColor">
                  Backend Developer
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">Secondary Number</span>
                <p className="text-lg font-medium text-textColor">
                  +91 9010614734
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">Email Address</span>
                <p className="text-lg font-medium text-textColor">
                  sundar.p@gmail.com
                </p>
              </div>
            </div>
          </CardContent>
          <div className="flex justify-between gap-[20px] mt-6">
            <div className="w-1/2 pl-4">
              <ServicesList />
            </div>
            <div className="w-1/2 pr-4">
              <InvoicesList />
            </div>
          </div>
        </Card>
      // {/* </div> */}
    // </div>
  );
};
export default ViewClient;
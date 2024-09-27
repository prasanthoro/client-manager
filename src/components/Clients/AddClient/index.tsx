"use client";

import { LoadingComponent } from "@/components/core/LoadingComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { checkPhoneNumber } from "@/lib/helpers/core/changeFirstLetterToCap";
import {
  addClientAPI,
  updateClientAPI,
  viewClientAPI,
} from "@/services/clients";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AddClient = () => {
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<any>();
  const [clientData, setClientData] = useState<any>({});
  const [viewDetails, setViewDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState(loading);
  const { client_Id } = useParams();
  const addClient = async () => {
    setLoading(true);

    try {
      const { createdAt, updatedAt, ...restData }: any = { ...clientData };
      let payload = {
        ...restData,
      };
      const response = await addClientAPI(payload);
      if (response?.status == 200 || response?.status == 201) {
        toast.success(response?.data?.message || "Client Added succesfully");
        router.back();
      } else if (response?.status == 422) {
        setErrorMessages(response?.data?.errors);
      } else if (response?.status == 409) {
        setErrorMessages(response?.data?.errors);
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
  const updateClient = async (client_Id: any) => {
    try {
      setLoading(true);

      const { createdAt, updatedAt, ...restData }: any = { ...clientData };
      let payload = {
        ...restData,
      };
      const response = await updateClientAPI({
        clientId: client_Id as string,
        payload,
      });
      if (response?.status == 200 || response?.status == 201) {
        toast.success(response?.data?.message);
        router.push("/clients");
      } else if (response?.status == 422) {
        setErrorMessages(response?.data?.errors);
      } else if (response?.status == 409) {
        setErrorMessages(response?.data?.errors);
      } else {
        throw response;
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e: any) => {
    let { name, value } = e.target;

    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  const getServiceById = async () => {
    try {
      const response = await viewClientAPI(client_Id as string);
      if (response?.status == 200 || response?.status == 201) {
        setViewDetails(response?.data?.data);
      } else {
        throw response;
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      console.error(err);
    }
  };

  const saveButton = () => {
    if (client_Id) {
      updateClient({});
    } else {
      addClient();
    }
  };

  useEffect(() => {
    if (client_Id) {
      getServiceById();
    }
  }, []);

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 -full hover:bg-pink-200"
          >
            <Image alt="image" width={24} height={24} src="/back-button.svg" />
          </button>
          <h1 className="text-2xl font-bold text-red-600 ml-2">Add Client</h1>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Primary Information</h2>
        <div className="grid grid-cols-3 gap-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name<span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Enter Company Name"
              value={clientData.company_name}
              name="company_name"
              onChange={handleInputChange}
            />
            {errorMessages?.company_name && (
              <p style={{ color: "red" }}>{errorMessages.company_name[0]}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client Name<span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Enter Client Name"
              value={clientData.client_name}
              name="client_name"
              onChange={handleInputChange}
            />
            {errorMessages?.client_name && (
              <p style={{ color: "red" }}>{errorMessages.client_name[0]}</p>
            )}
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700">
                Poc<span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter Poc"
                value={clientData["poc"]}
                name="poc"
                onChange={handleInputChange}
              />
              {errorMessages?.poc && (
                <p style={{ color: "red" }}>{errorMessages.poc[0]}</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Address Information</h2>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <Input
              placeholder="Enter Address"
              value={clientData["address"]}
              name="address"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <Input
              placeholder="Enter Country"
              value={clientData["country"]}
              name="country"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City/Location
            </label>
            <Input
              placeholder="Enter City/Location"
              value={clientData["city"]}
              name="city"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <Input
              placeholder="Enter State"
              value={clientData["state"]}
              name="state"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <div className="grid grid-cols-3 gap-6 mt-4">
          {/* Phone No. */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone No.<span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Enter Phone No."
              value={clientData["phone"]}
              onInput={checkPhoneNumber}
              name="phone"
              onChange={handleInputChange}
            />
            {errorMessages?.phone && (
              <p style={{ color: "red" }}>{errorMessages.phone[0]}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Enter Email"
              value={clientData.email}
              name="email"
              onChange={handleInputChange}
            />
            {errorMessages?.email && Array.isArray(errorMessages.email) && (
              <p style={{ color: "red" }}>{errorMessages.email[0]}</p>
            )}
            {errorMessages?.email &&
              typeof errorMessages.email === "string" && (
                <p style={{ color: "red" }}>{errorMessages.email}</p>
              )}
          </div>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Other Information</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Remarks
          </label>

          <Textarea
            placeholder="Enter Remarks"
            value={clientData["remarks"]}
            name="remarks"
            onChange={handleInputChange}
          />
        </div>
      </section>
      {/* Submit and Reset Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <Button
          className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          className="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600"
          type="submit"
          onClick={addClient}
        >
          Submit
        </Button>
      </div>
      <LoadingComponent loading={loading} />
    </div>
  );
};
export default AddClient;

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
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Spinner } from "@/components/ui/spinner";
import { Loader2 } from "lucide-react";
import { checkAllowedValidText } from "@/lib/helpers/constants";

const AddClient = () => {
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<any>();
  const [clientData, setClientData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const { client_Id } = useParams();

  const addClient = async () => {
    setLoading(true);
    try {
      const { createdAt, updatedAt, ...restData } = clientData;
      const payload = { ...restData, phone };
      const response = await addClientAPI(payload);

      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "Client Added successfully");
        router.back();
      } else if (response?.status === 422 || response?.status === 409) {
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

  const updateClient = async () => {
    setLoading(true);
    try {
      const { createdAt, updatedAt, ...restData } = clientData;
      const payload = {
        client_name: clientData?.client_name,
        company_name: clientData?.company_name,
        poc: clientData?.poc,
        email: clientData?.email,
        phone: clientData?.phone,
        remarks: clientData?.remarks,
        address: clientData?.address,
        state: clientData?.state,
        city: clientData?.city,
        country: clientData?.country,
      };

      const response = await updateClientAPI(client_Id, payload);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
        router.push("/clients");
      } else if (response?.status === 422 || response?.status === 409) {
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

  const handleInputChange = (e?: any) => {
    const { name, value } = e.target;
    if (value && checkAllowedValidText(value)) {
      setClientData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setClientData((prev: any) => ({ ...prev, [name]: value.trim() }));
    }
  };

  const getServiceById = async () => {
    setLoading(true);
    try {
      const response = await viewClientAPI(client_Id as string);
      if (response?.status === 200 || response?.status === 201) {
        setClientData(response?.data?.data);
        setPhone(response?.data?.data?.phone || "");
      } else {
        throw response;
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      console.error(err);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (client_Id) {
      getServiceById();
    }
  }, [client_Id]);

  const handleSubmit = () => {
    if (client_Id) {
      updateClient();
    } else {
      addClient();
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-pink-200"
          >
            <Image alt="image" width={24} height={24} src="/back-button.svg" />
          </button>
          <h1 className="text-2xl font-bold text-red-600 ml-2">
            {client_Id ? "Update Client" : "Add Client"}
          </h1>
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
              <p className="text-red-500">{errorMessages?.company_name[0]}</p>
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
              <p className="text-red-500">{errorMessages?.client_name}</p>
            )}
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700">
                PoC<span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter PoC"
                value={clientData.poc}
                name="poc"
                onChange={handleInputChange}
              />
              {errorMessages?.poc && (
                <p className="text-red-500">{errorMessages?.poc[0]}</p>
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
              value={clientData.address}
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
              value={clientData.country}
              name="country"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <Input
              placeholder="Enter City"
              value={clientData.city}
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
              value={clientData.state}
              name="state"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <div className="grid grid-cols-3 gap-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone No.<span className="text-red-500">*</span>
            </label>
            <PhoneInput
              defaultCountry="in"
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
            {errorMessages?.phone && (
              <p className="text-red-500">{errorMessages?.phone[0]}</p>
            )}
          </div>

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
            {errorMessages?.email && (
              <p className="text-red-500">
                {Array.isArray(errorMessages?.email)
                  ? errorMessages?.email[0]
                  : errorMessages?.email}
              </p>
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
            value={clientData.remarks}
            name="remarks"
            onChange={handleInputChange}
          />
        </div>
      </section>

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
          onClick={handleSubmit}
        >
          {loading ? (
            <Spinner></Spinner>
          ) : (
            `${client_Id ? "Update" : "Add"} Client`
          )}
        </Button>
      </div>
      <LoadingComponent loading={loading} />
    </div>
  );
};

export default AddClient;

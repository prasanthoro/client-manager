"use client";

import { LoadingComponent } from "@/components/core/LoadingComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addClientAPI, updateClientAPI } from "@/services/clients";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AddClient = () => {
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<any>();
  const [clientData, setClientData] = useState<any>({});
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
        router.back();
      } else if (response?.status == 422) {
        setErrorMessages(response?.data?.errors);
      } else {
        throw response;
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const editReview = async (client_Id: any) => {
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
        router.back();
      } else if (response?.status == 422) {
        setErrorMessages(response?.data?.errors);
      } else {
        throw response;
      }
    } catch (err: any) {
      //  errorPopper(err || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e: any) => {
    let { name, value } = e.target;

    if (name == "faxNo" || name == "phon" || name == "pocPhoneNo") {
      // value = formatPhoneNumber(value);
    }
    if (name == "zipCode") {
      // value = formatZipCode(value);
    }

    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => router.back()}
        >
          <span className="material-icons">arrow_back</span>
          <h1 className="text-2xl font-bold text-red-600">Add Client</h1>
        </button>
      </div>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Client Information</h2>
        <div className="grid grid-cols-3 gap-6 mt-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <Input
              placeholder="Enter Role"
              value={clientData["role"]}
              name="role"
              onChange={handleInputChange}
            />
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
            {errorMessages?.email && (
              <p style={{ color: "red" }}>{errorMessages.email[0]}</p>
            )}
          </div>

          {/* Secondary Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Remarks
            </label>
            <Input
              placeholder="Enter Remarks"
              value={clientData["remarks"]}
              name="remarks"
              onChange={handleInputChange}
            />
          </div>
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

"use client";
import { LoadingComponent } from "@/components/core/LoadingComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { checkAllowedValidText } from "@/lib/helpers/constants";
import {
  addServiceAPI,
  getServiceAPI,
  updateServiceAPI,
} from "@/services/services";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AddService = () => {
  const router = useRouter();
  const params = useParams();
  const serviceId = params?.id;

  const [serviceDetails, setServiceDetails] = useState<any>({});
  const [errorMessages, setErrorMessages] = useState<any>();
  const [loading, setLoading] = useState(false);
  const addService = async () => {
    setLoading(true);
    try {
      let payload = {
        ...serviceDetails,
      };
      const response: any = await addServiceAPI(payload);
      if (response.status == 200 || response.status == 201) {
        toast.success(response?.data?.message || "Service Added succesfully");
        router.push("/services");
      } else if (response?.status == 422) {
        setErrorMessages(response?.data?.errors);
      } else if (response?.status == 409) {
        setErrorMessages(response?.data?.errors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateService = async () => {
    setLoading(true);
    try {
      let payload = {
        service_name: serviceDetails?.service_name,
        type: serviceDetails?.type,
        remarks: serviceDetails?.remarks,
      };
      const response: any = await updateServiceAPI(payload, serviceId);

      if (response.status == 200 || response.status == 201) {
        toast.success(response?.data?.message || "Service Added succesfully");
        router.back();
      } else if (response?.status == 422) {
        setErrorMessages(response?.data?.errors);
      } else if (response?.status == 409) {
        setErrorMessages(response?.data?.errors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getServiceById = async () => {
    setLoading(true);
    try {
      const response = await getServiceAPI(serviceId as string);
      if (response?.status == 200 || response?.status == 201) {
        setServiceDetails(response?.data?.data);
      } else {
        throw response;
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    const updatedValue = value
        .replace(/[^a-zA-Z\s]/g, "")
        .replace(/^\s+/g, "") 
        .replace(/\s{2,}/g, " ");
    setServiceDetails({
      ...serviceDetails,
      [name]: updatedValue,
    });
  };

  const handleSelect = (name: any, value: any) => {
    setServiceDetails({
      ...serviceDetails,
      [name]: value,
    });
  };

  const saveButton = () => {
    if (serviceId) {
      updateService();
    } else {
      addService();
    }
  };

  useEffect(() => {
    if (serviceId) {
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
          <h1 className="text-2xl font-bold text-red-600 ml-2">
            {serviceId ? "Update Service" : "Add Service"}
          </h1>
        </div>
      </div>
      <section className="mb-6">
        <div className="grid grid-cols-3 gap-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Name<span className="text-red-500">*</span>
            </label>
            <Input
              name="service_name"
              value={serviceDetails?.service_name}
              placeholder="Enter Service Name"
              onChange={handleInputChange}
            />
            {errorMessages?.service_name && (
              <p style={{ color: "red" }}>{errorMessages.service_name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Type<span className="text-red-500">*</span>
            </label>
            <Select
              name="type"
              value={serviceDetails?.type}
              onValueChange={(value) => handleSelect("type", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="RECURRING">Recurring</SelectItem>
                  <SelectItem value="ONE-TIME">One Time</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errorMessages?.type && (
              <p style={{ color: "red" }}>{errorMessages.type[0]}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Remarks
            </label>

            <Textarea
              placeholder="Enter Remarks"
              value={serviceDetails?.remarks}
              name="remarks"
              onChange={handleInputChange}
            />
          </div>
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
          onClick={() => {
            saveButton();
            setErrorMessages(null);
          }}
        >
          {serviceId ? "Update" : "Add"}
        </Button>
      </div>
      <LoadingComponent loading={loading} />
    </div>
  );
};

export default AddService;

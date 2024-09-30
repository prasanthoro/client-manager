"use client";
import { status } from "@/lib/constants/selectStatus";
import { selectTypes } from "@/lib/constants/selectType";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Check, ChevronDown, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import ClientDropDown from "../core/ClientDropDown";
import DatePickerWithRange from "../core/DatePickerWithRange";
import ServiceDropDown from "../core/ServicesDropDown";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const InvoicesFilters = ({
  getAllIvoices,
  searchString,
  setSearchString,
  selectStatus,
  setSelectStatus,
  clientNameForDropDown,
  servicesForDropDown,
}: any) => {
  const params = useSearchParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [statusopen, setStatusOpen] = useState(false);
  const [typeopen, setTypeOpen] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [clientName, setClientName] = useState<any>({});
  const [serviceName, setServiceName] = useState<any>({});
  const [selectType, setSelectType] = useState<any>(
    params.get("type") ? params.get("type") : ""
  );

  const onDataChange = (date: any) => {
    if (date) {
      let fromDate = dayjs(date[0]).format("YYYY-MM-DD");
      let toDate = dayjs(date[1]).format("YYYY-MM-DD");

      getAllIvoices({ from_date: fromDate, to_date: toDate, page: 1 });
    } else {
      getAllIvoices({ from_date: "", to_date: "" });
    }
  };

  const onSearchStringChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchString(value);
    if (value) {
      getAllIvoices({ search_string: value, page: 1 });
    } else {
      getAllIvoices({ search_string: "" });
    }
  };

  const onSelectClient = (value: any) => {
    if (value) {
      getAllIvoices({ client_id: value?.id, page: 1 });
    } else {
      getAllIvoices({ client_id: "" });
      setClientName(null);
    }
  };

  const onSelectService = (value: any) => {
    if (value) {
      getAllIvoices({ service_id: value?.id, page: 1 });
    } else {
      getAllIvoices({ service_id: "" });
      setServiceName(null);
    }
  };

  const onChangeStatus = (value: string) => {
    setSelectStatus(value);
    if (value) {
      getAllIvoices({ invoice_status: value, page: 1 });
    } else {
      getAllIvoices({ invoice_status: "" });
    }
  };

  const onChangeType = (value: string) => {
    setSelectType(value);
    if (value) {
      getAllIvoices({ type: value, page: 1 });
    } else {
      getAllIvoices({ type: "" });
    }
  };

  useEffect(() => {
    const clientId = params.get("client_id");
    if (clientId) {
      const matchedClient = clientNameForDropDown.find(
        (client: any) => client.id == clientId
      );
      if (matchedClient) {
        setClientName(matchedClient);
      }
    }
  }, [params, clientNameForDropDown, setClientName]);

  useEffect(() => {
    const serviceId = params.get("service_id");
    if (serviceId) {
      const matchedService = servicesForDropDown.find(
        (service: any) => service.id == serviceId
      );
      if (matchedService) {
        setServiceName(matchedService);
      }
    }
  }, [params, servicesForDropDown, setServiceName]);

  return (
    <div className="flex justify-between my-4 gap-2">
      <div className="w-full">
        <DatePickerWithRange onDataChange={onDataChange} />
      </div>
      {/* <Input
        type="search"
        placeholder="Search Client Name and Service Type"
        value={searchString}
        onChange={onSearchStringChange}
        className="w-[350px]" // Adjust the width to match the image
      /> */}
      <div className="w-full">
        <ClientDropDown
          open={open}
          setOpen={setOpen}
          clientNameForDropDown={clientNameForDropDown}
          clientName={clientName}
          setClientName={setClientName}
          onSelectClient={onSelectClient}
        />
      </div>
      <div className="w-full">
        <ServiceDropDown
          open={openService}
          setOpen={setOpenService}
          servicesForDropDown={servicesForDropDown}
          serviceName={serviceName}
          setServiceName={setServiceName}
          onSelectService={onSelectService}
        />
      </div>
      <div>
        <Popover open={typeopen} onOpenChange={setTypeOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={typeopen}
              className="w-[200px] justify-between bg-white-700"
            >
              {selectType
                ? selectTypes.find((type) => type.value === selectType)?.label
                : "Select Type"}
              <div className="flex">
                {selectType && (
                  <X
                    className="mr-2 h-4 w-4 shrink-0 opacity-50"
                    onClick={(e: any) => {
                      e.stopPropagation();
                      onChangeType("");
                      setTypeOpen(false);
                    }}
                  />
                )}
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <div className="max-h-[300px] overflow-y-auto">
              {selectTypes?.map((type) => (
                <Button
                  key={type.value}
                  onClick={() => {
                    onChangeType(type.value);
                    setTypeOpen(false);
                  }}
                  className="w-full justify-start font-normal bg-white text-violet-600 border border-indigo-600 capitalize mb-2 hover:bg-violet-600  hover:text-white "
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectType === type.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {type.label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Popover open={statusopen} onOpenChange={setStatusOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={statusopen}
              className="w-[200px] justify-between bg-white-700"
            >
              {selectStatus
                ? status.find((type) => type.value === selectStatus)?.label
                : "Select Status"}
              <div className="flex">
                {selectStatus && (
                  <X
                    className="mr-2 h-4 w-4 shrink-0 opacity-50"
                    onClick={(e: any) => {
                      e.stopPropagation();
                      onChangeStatus("");
                      setStatusOpen(false);
                    }}
                  />
                )}
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <div className="max-h-[300px] overflow-y-auto">
              {status?.map((type) => (
                <Button
                  key={type.value}
                  onClick={() => {
                    onChangeStatus(type.value);
                    setStatusOpen(false);
                  }}
                  className="w-full justify-start font-normal bg-white text-violet-600 border border-indigo-600 capitalize mb-2 hover:bg-violet-600  hover:text-white "
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectStatus === type.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {type.label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Button
        className="w-[120px] bg-black text-white"
        onClick={() => {
          router.push("/add-invoice");
        }}
      >
        {" "}
        {/* Adjust the width and color */}
        Add Invoice
      </Button>
    </div>
  );
};

export default InvoicesFilters;

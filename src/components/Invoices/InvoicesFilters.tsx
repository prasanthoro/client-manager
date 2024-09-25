"use client";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import ClientDropDown from "../core/ClientDropDown";
import DatePickerWithRange from "../core/DatePickerWithRange";
import ServiceDropDown from "../core/ServicesDropDown";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  const [openService, setOpenService] = useState(false);
  const [clientName, setClientName] = useState<any>({});
  const [serviceName, setServiceName] = useState<any>({});

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
    if (value === "ALL") {
      getAllIvoices({ invoice_status: "" });
    } else {
      getAllIvoices({ invoice_status: value, page: 1 });
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
    <div className="flex justify-between items-center gap-2 p-5">
      <div style={{ width: "500px" }}>
        <DatePickerWithRange onDataChange={onDataChange} />
      </div>
      {/* <Input
        type="search"
        placeholder="Search Client Name and Service Type"
        value={searchString}
        onChange={onSearchStringChange}
        className="w-[350px]" // Adjust the width to match the image
      /> */}
      <div style={{ width: "300px" }}>
        <ClientDropDown
          open={open}
          setOpen={setOpen}
          clientNameForDropDown={clientNameForDropDown}
          clientName={clientName}
          setClientName={setClientName}
          onSelectClient={onSelectClient}
        />
      </div>
      <div style={{ width: "300px" }}>
        <ServiceDropDown
          open={openService}
          setOpen={setOpenService}
          servicesForDropDown={servicesForDropDown}
          serviceName={serviceName}
          setServiceName={setServiceName}
          onSelectService={onSelectService}
        />
      </div>
      <Select onValueChange={onChangeStatus} value={selectStatus}>
        <SelectTrigger className="w-[100px]">
          {" "}
          {/* Adjust the width */}
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
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

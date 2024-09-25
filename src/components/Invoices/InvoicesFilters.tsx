"use client";
import dayjs from "dayjs";
import DatePickerWithRange from "../core/DatePickerWithRange";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ClientDropDown from "../core/ClientDropDown";
import { useSearchParams } from "next/navigation";

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

  const [open, setOpen] = useState(false);
  const [clientName, setClientName] = useState<any>({});
  const [serviceName, setServiceName] = useState<any>({});

  const onDataChange = (date: any) => {
    if (date) {
      let fromDate = dayjs(date[0]).format("YYYY-MM-DD");
      let toDate = dayjs(date[1]).format("YYYY-MM-DD");

      getAllIvoices({ from_date: fromDate, to_date: toDate });
    } else {
      getAllIvoices({ from_date: "", to_date: "" });
    }
  };

  const onSearchStringChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchString(value);
    if (value) {
      getAllIvoices({ search_string: value });
    } else {
      getAllIvoices({ search_string: "" });
    }
  };

  const onSelectClient = (value: any) => {
    if (value) {
      getAllIvoices({ client_id: value?.id });
    } else {
      getAllIvoices({ client_id: "" });
      setClientName(null);
    }
  };

  const onChangeStatus = (value: string) => {
    setSelectStatus(value);
    if (value === "ALL") {
      getAllIvoices({ invoice_status: "" });
    } else {
      getAllIvoices({ invoice_status: value });
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
      <Button className="w-[120px] bg-black text-white">
        {" "}
        {/* Adjust the width and color */}
        Add Invoice
      </Button>
    </div>
  );
};

export default InvoicesFilters;

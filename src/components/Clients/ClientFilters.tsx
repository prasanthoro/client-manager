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
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ClientDropDown from "../core/ClientDropDown";
import { useParams, useSearchParams } from "next/navigation";

const ClientFilters = ({
  getAllClients,
  searchString,
  setSearchString,
  setDateInformation,
  dateInfo,
  getClientsDropDown,
  dropDownClientsData,
}: any) => {
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  const [clientName, setClientName] = useState<any>({});
  const handleDateChange = async (value: any) => {
    if (value) {
      await setDateInformation(value);
      let date1 = dayjs(value[0])?.format("YYYY-MM-DD");
      let date2 = dayjs(value[1])?.format("YYYY-MM-DD");
      await getAllClients({
        from_date: date1,
        to_date: date2,
      });
    } else {
      setDateInformation([]);
      await getAllClients({
        from_date: "",
        to_date: "",
      });
    }
  };
  const onSearchStringChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchString(value);
    if (value) {
      getAllClients({ search_string: value });
    } else {
      getAllClients({ search_string: "" });
    }
  };
  const onSelectClient = (value: any) => {
    if (value) {
      getAllClients({ client_id: value?.id });
    } else {
      getAllClients({ client_id: "" });
      setClientName(null);
    }
  };

  const onDataChange = (date: any) => {
    if (date) {
      let fromDate = dayjs(date[0]).format("YYYY-MM-DD");
      let toDate = dayjs(date[1]).format("YYYY-MM-DD");

      getAllClients({ from_date: fromDate, to_date: toDate, page: 1 });
    } else {
      getAllClients({ from_date: "", to_date: "" });
    }
  };

  useEffect(() => {
    const clientId = params.get("client_id");
    if (clientId) {
      const matchedClient = dropDownClientsData.find(
        (client: any) => client.id == clientId
      );
      if (matchedClient) {
        setClientName(matchedClient);
      }
    }
  }, [params, dropDownClientsData, setClientName]);

  const disableFutureDates = (date: Date) => {
    return date.getTime() > new Date().getTime();
  };

  return (
    <div className="flex items-center gap-2 p-5">
      <div className="w-full">
        <DatePickerWithRange onDataChange={onDataChange} />
      </div>

      <div style={{ width: "300px" }}>
        <ClientDropDown
          open={open}
          setOpen={setOpen}
          clientNameForDropDown={dropDownClientsData}
          clientName={clientName}
          setClientName={setClientName}
          onSelectClient={onSelectClient}
        />
      </div>
    </div>
  );
};
export default ClientFilters;

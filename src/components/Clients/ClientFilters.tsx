import dayjs from "dayjs";
import DatePickerWithRange from "../core/DatePickerWithRange";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChangeEvent } from "react";
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

const ClientFilters = ({
  getAllClients,
  searchString,
  setSearchString,
  setDateInformation,
  dateInfo,
}: any) => {
  const onDateChange = (date: any) => {
    if (date) {
      let fromDate = dayjs(date.from).format("YYYY-MM-DD");
      let toDate = dayjs(date.to).format("YYYY-MM-DD");

      getAllClients({ from_date: fromDate, to_date: toDate });
    } else {
      getAllClients({ from_date: "", to_date: "" });
    }
  };
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

  return (
    <div className="flex justify-between items-center gap-2 p-5">
      <DateRangePicker
        placeholder="Select Date Range"
        value={dateInfo}
        onChange={handleDateChange}
        format="MM-dd-yyyy"
        style={{ width: 250 }}
      />
      <Input
        type="search"
        placeholder="Search Client Name "
        height={20}
        width={20}
        alt="search"
        value={searchString}
        onChange={onSearchStringChange}
      />
    </div>
  );
};
export default ClientFilters;

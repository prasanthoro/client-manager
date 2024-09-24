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

const InvoicesFilters = ({
  getAllIvoices,
  searchString,
  setSearchString,
  selectStatus,
  setSelectStatus,
}: any) => {
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

  const onChangeStatus = (value: string) => {
    setSelectStatus(value);
    if (value === "ALL") {
      getAllIvoices({ invoice_status: "" });
    } else {
      getAllIvoices({ invoice_status: value });
    }
  };

  return (
    <div className="flex justify-between items-center gap-2 p-5">
      <div style={{ width: "500px" }}>
        <DatePickerWithRange onDataChange={onDataChange} />
      </div>
      <Input
        type="search"
        placeholder="Search Client Name and Service Type"
        value={searchString}
        onChange={onSearchStringChange}
        className="w-[350px]" // Adjust the width to match the image
      />
      <Select onValueChange={onChangeStatus} value={selectStatus}>
        <SelectTrigger className="w-[100px]"> {/* Adjust the width */}
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
      <Button className="w-[120px] bg-black text-white"> {/* Adjust the width and color */}
        Add Invoice
      </Button>
    </div>
  );
};

export default InvoicesFilters;

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
      let fromDate = dayjs(date.from).format("YYYY-MM-DD");
      let toDate = dayjs(date.to).format("YYYY-MM-DD");

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
    if (value == "ALL") {
      getAllIvoices({ invoice_status: "" });
    } else {
      getAllIvoices({ invoice_status: value });
    }
  };

  return (
    <div className="flex justify-between items-center gap-2 p-5">
      <DatePickerWithRange onDataChange={onDataChange} />
      <Input
        type="search"
        placeholder="Search Client Name and Service Type"
        value={searchString}
        onChange={onSearchStringChange}
      />
      <Select onValueChange={onChangeStatus} value={selectStatus}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button className="mr-4">Add Invoice</Button>
    </div>
  );
};
export default InvoicesFilters;

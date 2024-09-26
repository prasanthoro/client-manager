"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import DatePickerWithRange from "../core/DatePickerWithRange";
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ServicesFilters = ({ getAllServices }: any) => {
  const router = useRouter();
  const params = useSearchParams();

  const [searchString, setSearchString] = useState<any>(
    params.get("search_string") ? params.get("search_string") : ""
  );
  const [selectType, setSelectType] = useState<any>(
    params.get("type") ? params.get("type") : "ALL"
  );

  const onDataChange = (date: any) => {
    if (date) {
      let fromDate = dayjs(date[0]).format("YYYY-MM-DD");
      let toDate = dayjs(date[1]).format("YYYY-MM-DD");

      getAllServices({ from_date: fromDate, to_date: toDate, page: 1 });
    } else {
      getAllServices({ from_date: "", to_date: "" });
    }
  };

  const onSearchStringChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchString(value);
    if (value) {
      getAllServices({ search_string: value, page: 1 });
    } else {
      getAllServices({ search_string: "" });
    }
  };

  const onChangeType = (value: string) => {
    setSelectType(value);
    if (value === "ALL") {
      getAllServices({ type: "" });
    } else {
      getAllServices({ type: value, page: 1 });
    }
  };

  return (
    <div className="flex justify-between my-4 gap-2">
      <div className="w-full">
        <DatePickerWithRange onDataChange={onDataChange} />
      </div>
      <Input
        type="search"
        placeholder="Search Name "
        value={searchString}
        onChange={onSearchStringChange}
        className="w-full"
      />
      <Select onValueChange={onChangeType} value={selectType}>
        <SelectTrigger className="w-full">
          {" "}
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="RECURRING">Recurring</SelectItem>
            <SelectItem value="ONE-TIME">On Time</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        className="w-[120px] bg-black text-white"
        onClick={() => {
          router.push("/services/add-service");
        }}
      >
        {" "}
        Add Service
      </Button>
    </div>
  );
};
export default ServicesFilters;

"use client";
import { selectTypes } from "@/lib/constants/selectType";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Check, ChevronDown, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import DatePickerWithRange from "../core/DatePickerWithRange";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

const ServicesFilters = ({ getAllServices }: any) => {
  const router = useRouter();
  const params = useSearchParams();

  const [open, setOpen] = useState(false);
  const [searchString, setSearchString] = useState<any>(
    params.get("search_string") ? params.get("search_string") : ""
  );
  const [selectType, setSelectType] = useState<any>(
    params.get("type") ? params.get("type") : ""
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
      getAllServices({ search_string: encodeURIComponent(value), page: 1 });
    } else {
      getAllServices({ search_string: "" });
    }
  };

  const onChangeType = (value: string) => {
    setSelectType(value);
    if (value) {
      getAllServices({ type: value, page: 1 });
    } else {
      getAllServices({ type: "" });
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
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
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
                      setOpen(false);
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
                    onChangeType(type.value)
                    setOpen(false);
                  }}
                  className=
                    "w-full justify-start font-normal bg-white text-violet-600 border border-indigo-600 capitalize mb-2 hover:bg-violet-600  hover:text-white "
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
      <Button
        className="w-[120px] bg-black text-white"
        onClick={() => {
          router.push("/services/add-service");
        }}
      >
        Add Service
      </Button>
    </div>
  );
};
export default ServicesFilters;

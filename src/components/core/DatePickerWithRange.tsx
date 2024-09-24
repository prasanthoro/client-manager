"use client";

import * as React from "react";
import { addDays, format, parseISO } from "date-fns";
import { Calendar as CalendarIcon, X as ClearIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchParams } from "next/navigation";

const DatePickerWithRange = ({ onDataChange }: any) => {
  const params = useSearchParams();
  const fromDateParam = params.get("from_date");
  const toDateParam = params.get("to_date");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: fromDateParam ? parseISO(fromDateParam) : undefined,
    to: toDateParam ? parseISO(toDateParam) : undefined,
  });
  const handleClear = () => {
    setDate(undefined);
    onDataChange(null);
  };
  React.useEffect(() => {
    if (date?.from && date?.to) {
      onDataChange(date);
    }
  }, [date]);

  return (
    <div className={cn("grid gap-2")}>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                date ? "" : "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Select Date Range Filter</span>
              )}
            </Button>
          </PopoverTrigger>
          {date?.from || date?.to ? (
            <Button variant="ghost" onClick={handleClear} className="p-2">
              <ClearIcon className="h-4 w-4 text-muted-foreground" />
            </Button>
          ) : (
            ""
          )}
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              toDate={new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DatePickerWithRange;

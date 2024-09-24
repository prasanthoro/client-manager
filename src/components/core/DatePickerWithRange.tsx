"use client";
import { format } from "date-fns";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const DatePickerWithRange = ({ onDataChange }: any) => {
  const params = useSearchParams();
  const fromDateParam = params.get("from_date");
  const toDateParam = params.get("to_date");

  const [date, setDate] = useState<any>([
    fromDateParam ? new Date(fromDateParam) : null,
    toDateParam ? new Date(toDateParam) : null,
  ]);

  const handleSelect = (value: any, event: any) => {
    if (value) {
      setDate(value);
      onDataChange(value);
    } else {
      setDate(null);
      onDataChange(null);
    }
  };

  const disableFutureDates = (date: Date) => {
    return date.getTime() > new Date().getTime();
  };

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <DateRangePicker
          block
          placeholder="Select From Date and To Date"
          editable={false}
          value={date}
          onChange={handleSelect}
          format="yyyy-MM-dd"
          style={{ width: "300px" }}
          disabledDate={disableFutureDates}
          cleanable={date && date[0] && date[1] ? true : false}
        />
      </div>
    </div>
  );
};

export default DatePickerWithRange;

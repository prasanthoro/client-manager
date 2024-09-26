"use client";
import { format } from "date-fns";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  addDays,
  addMonths,
  endOfMonth,
  startOfMonth,
  subDays,
} from "rsuite/esm/internals/utils/date";

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

  const predefinedRanges: any = [
    {
      label: "Today",
      value: [new Date(), new Date()],
      placement: "left",
    },
    {
      label: "Yesterday",
      value: [addDays(new Date(), -1), addDays(new Date(), -1)],
      placement: "left",
    },

    {
      label: "Last 30 days",
      value: [subDays(new Date(), 29), new Date()],
      placement: "left",
    },
    {
      label: "This month",
      value: [startOfMonth(new Date()), new Date()],
      placement: "left",
    },
    {
      label: "Last month",
      value: [
        startOfMonth(addMonths(new Date(), -1)),
        endOfMonth(addMonths(new Date(), -1)),
      ],
      placement: "left",
    },
    {
      label: "Last 3 months",
      value: [
        startOfMonth(addMonths(new Date(), -3)),
        endOfMonth(addMonths(new Date(), -1)),
      ],
      placement: "left",
    },

    {
      label: "Last 6 months",
      value: [
        startOfMonth(addMonths(new Date(), -6)),
        endOfMonth(addMonths(new Date(), -1)),
      ],
      placement: "left",
    },
    {
      label: "Last 9 months",
      value: [
        startOfMonth(addMonths(new Date(), -9)),
        endOfMonth(addMonths(new Date(), -1)),
      ],
      placement: "left",
    },
    {
      label: "Last year",
      value: [
        new Date(new Date().getFullYear() - 1, 0, 1),
        new Date(new Date().getFullYear(), 0, 0),
      ],
      placement: "left",
    },

    {
      label: "This year",
      value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
      placement: "left",
    },
  ];

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <DateRangePicker
          block
          placeholder="Select From Date and To Date"
          ranges={predefinedRanges}
          editable={false}
          value={date}
          onChange={handleSelect}
          format="yyyy-MM-dd"
          style={{ width: "300%" }}
          disabledDate={disableFutureDates}
          cleanable={date && date[0] && date[1] ? true : false}
        />
      </div>
    </div>
  );
};

export default DatePickerWithRange;

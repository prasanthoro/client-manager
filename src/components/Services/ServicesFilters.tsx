"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import DatePickerWithRange from "../core/DatePickerWithRange";

const ServicesFilters = ({ getAllServices }: any) => {
  const router = useRouter();

  const onDataChange = (date: any) => {
    if (date) {
      let fromDate = dayjs(date[0]).format("YYYY-MM-DD");
      let toDate = dayjs(date[1]).format("YYYY-MM-DD");

      getAllServices({ from_date: fromDate, to_date: toDate, page: 1 });
    } else {
      getAllServices({ from_date: "", to_date: "" });
    }
  };

  return (
    <div className="flex justify-between items-center gap-2 p-5">
      <div style={{ width: "500px" }}>
        <DatePickerWithRange onDataChange={onDataChange} />
      </div>
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

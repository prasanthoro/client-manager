import dayjs from "dayjs";
import DatePickerWithRange from "../core/DatePickerWithRange";
import { Button } from "../ui/button";

const InvoicesFilters = ({ getAllIvoices }: any) => {
  const onDataChange = (date: any) => {
    
    if (date) {
      let fromDate = dayjs(date.from).format("YYYY-MM-DD");
      let toDate = dayjs(date.to).format("YYYY-MM-DD");

      getAllIvoices({ from_date: fromDate, to_date: toDate });
    } else {
      getAllIvoices({ from_date: "", to_date: "" });
    }
  };
  return (
    <div className="flex justify-between items-center">
      <Button className="mr-4">Add Service</Button>
      <DatePickerWithRange onDataChange={onDataChange}/>
    </div>
  );
};
export default InvoicesFilters;

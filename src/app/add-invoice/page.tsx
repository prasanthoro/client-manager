import { AddInvoice } from "@/components/Invoices/AddInvoice/AddInvoice";
import { Suspense } from "react";

const AddInvoicePage = () => {
  return (
    <Suspense>
      <AddInvoice />
    </Suspense>
  );
};
export default AddInvoicePage;

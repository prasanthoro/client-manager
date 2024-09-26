import { AddInvoice } from "@/components/Invoices/AddInvoice/AddInvoice";
import { Suspense } from "react";

const EditInvoicePage = () => {
  return (
    <Suspense>
      <AddInvoice />
    </Suspense>
  );
};
export default EditInvoicePage;

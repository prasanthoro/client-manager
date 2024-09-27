import { ViewInvoice } from "@/components/Invoices/AddInvoice/ViewInvoice";
import { Suspense } from "react";

const ViewInvoicePage = () => {
  return (
    <Suspense>
      <ViewInvoice />
    </Suspense>
  );
};
export default ViewInvoicePage;

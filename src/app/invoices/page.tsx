"use client";
import InvoicesList from "@/components/Invoices";
import { Suspense } from "react";

const InvoicesListPage = () => {
  return (
    <Suspense>
      <InvoicesList />
    </Suspense>
  );
};
export default InvoicesListPage;

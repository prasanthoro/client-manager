"use client";
import { Suspense } from "react";
import Clients from "@/components/Clients/GetAllClients";
const ClientsPage = () => {
  return (
    <Suspense>
      <Clients />
    </Suspense>
  );
};
export default ClientsPage;

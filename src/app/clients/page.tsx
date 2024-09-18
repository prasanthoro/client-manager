"use client";

import Clients from "@/components/Clients/GetAllClients";
import { Dashboard } from "@/components/Dashboard";
import { Suspense } from "react";
const DashboardPage = () => {
  return (
    <Suspense>
      <Clients />
    </Suspense>
  );
};
export default DashboardPage;

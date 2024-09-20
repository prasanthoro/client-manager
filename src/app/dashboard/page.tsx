"use client";
import { Suspense } from "react";
import Clients from "@/components/Clients/GetAllClients";
import { Dashboard } from "@/components/Dashboard";
const DashboardPage = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
};
export default DashboardPage;

"use client";
import { Suspense } from "react";
import Clients from "@/components/Clients/GetAllClients";
import { Dashboard } from "@/components/Dashboard";
import ViewClient from "@/components/Clients/Actions/ViewClient";
const DashboardPage = () => {
  return (
    <Suspense>
      <Dashboard />
      {/* <ViewClient /> */}
    </Suspense>
  );
};
export default DashboardPage;

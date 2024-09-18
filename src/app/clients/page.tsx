"use client";

import MyTable from "@/components/Clients";
import Clients from "@/components/Clients/GetAllClients";
import { Dashboard } from "@/components/Dashboard";
import { Suspense } from "react";
const DashboardPage = () => {
  return (
    <Suspense>
      {/* <MyTable /> */}
      <Clients />
    </Suspense>
  );
};
export default DashboardPage;

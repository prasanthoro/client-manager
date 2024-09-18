"use client";

import MyTable from "@/components/Clients";
import { Dashboard } from "@/components/Dashboard";
import { Suspense } from "react";
const DashboardPage = () => {
  return (
    <Suspense>
      <MyTable />
    </Suspense>
  );
};
export default DashboardPage;

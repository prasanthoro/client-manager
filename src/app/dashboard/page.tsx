"use client";
import { Dashboard } from "@/components/Dashboard";
import { Suspense } from "react";
const DashboardPage = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
};
export default DashboardPage;

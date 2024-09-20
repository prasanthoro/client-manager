"use client";
import ServicesList from "@/components/Services";
import { Suspense } from "react";

const ServicesListPage = () => {
  return (
    <Suspense>
      <ServicesList />
    </Suspense>
  );
};
export default ServicesListPage;

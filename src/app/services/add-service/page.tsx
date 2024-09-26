"use client";
import AddService from "@/components/Services/AddService";
import { Suspense } from "react";

const AddServicePage = () => {
  return (
    <Suspense>
      <AddService />
    </Suspense>
  );
};
export default AddServicePage;

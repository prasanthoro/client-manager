"use client";
import ViewClient from "@/components/Clients/Actions/ViewClient";
import AddClient from "@/components/Clients/AddClient";
import { Suspense } from "react";
const EditClientPage = () => {
  return (
    <Suspense>
      <AddClient />
    </Suspense>
  );
};
export default EditClientPage;

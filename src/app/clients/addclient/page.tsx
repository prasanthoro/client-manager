import ViewClient from "@/components/Clients/Actions/ViewClient";
import AddClient from "@/components/Clients/AddClient";
import { Suspense } from "react";
const AddClientPage = () => {
  return (
    <Suspense>
      <AddClient />
    </Suspense>
  );
};
export default AddClientPage;

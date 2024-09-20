import ViewClient from "@/components/Clients/Actions/ViewClient";
import { Suspense } from "react";
const ViewPage = () => {
  return (
    <Suspense>
      <ViewClient />
    </Suspense>
  );
};
export default ViewPage;

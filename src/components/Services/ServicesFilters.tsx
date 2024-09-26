"use client"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const ServicesFilters = () => {
    const router = useRouter();

    return (
        <div className="flex justify-between items-center gap-2 p-5">
            <Button
        className="w-[120px] bg-black text-white"
        onClick={() => {
          router.push("/services/add-service");
        }}
      >
        {" "}
        Add Service
      </Button>
        </div>
    );
}
export default ServicesFilters;
"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
// import LoadingComponent from "@/components/core/LoadingComponent";
export const EditButton = ({ id }: any) => {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const pathname = usePathname();
  const lab_id = params?.get("lab_id" as string);
  const router = useRouter();
  const onEditClick = () => {
   router.push(`/services/${id}/edit`)
  };

  return (
    <div className="eachAction">
      <Image
        title="Edit"
        onClick={() => {
          setLoading(true);
          onEditClick();
        }}
        src={"/edit.svg"}
        height={30}
        width={30}
        alt="Image"
      />
    </div>
  );
};

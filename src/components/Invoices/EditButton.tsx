"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
// import LoadingComponent from "@/components/core/LoadingComponent";
export const EditButton = ({ invoice_id }: any) => {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();

  const router = useRouter();
  const onEditClick = () => {
    router.push(`/edit-invoice/${invoice_id}`);
  };

  return (
    <div className="eachAction">
      <Image
        title="Edit"
        onClick={() => {
          onEditClick();
        }}
        src={"/edit.svg"}
        height={30}
        width={30}
        alt="Image"
      ></Image>
      {/* <LoadingComponent loading={loading} /> */}
    </div>
  );
};

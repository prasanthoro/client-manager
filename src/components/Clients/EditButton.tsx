"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
// import LoadingComponent from "@/components/core/LoadingComponent";
export const EditButton = ({ row }: any) => {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const pathname = usePathname();
  const lab_id = params?.get("lab_id" as string);
  const router = useRouter();
  const onEditClick = () => {
    const clientId = row?.id;
    router.push(`/clients/${clientId}/edit_client`);
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
        height={120}
        width={120}
        alt="Image"
      />
    </div>
  );
};

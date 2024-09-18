"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const EditButton = ({ insurance_id }: any) => {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const pathname = usePathname();
  const lab_id = params?.get("lab_id" as string);
  const router = useRouter();
  const onEditClick = () => {
    if (pathname.includes("/insurances")) {
      router.push(`/edit-payer/${lab_id}/${insurance_id}`);
    } else if (pathname.includes("state-license")) {
      router.push(`/state-license/edit-licence/${lab_id}/${insurance_id}`);
    }
  };

  return (
    <div className="eachAction">
      <Image
        title="Edit"
        onClick={() => {
          setLoading(true);
          onEditClick();
        }}
        src={"/icons/listing_Actions/edit_icon.svg"}
        height={16}
        width={16}
        alt="Image"
      ></Image>
      {/* <LoadingComponent loading={loading} /> */}
    </div>
  );
};

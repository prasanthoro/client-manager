import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const ViewButton = ({ row }: any) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const lab_id = params?.get("lab_id" as string);
  const onViewClick = () => {};

  return (
    <div className="eachAction">
      <Image
        title="View"
        onClick={() => {
          setLoading(true);
          onViewClick();
        }}
        src={"/view.svg"}
        height={16}
        width={16}
        alt="Image"
      ></Image>

      {/* <LoadingComponent loading={loading} /> */}
    </div>
  );
};

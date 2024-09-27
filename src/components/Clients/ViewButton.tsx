import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LoadingComponent } from "../core/LoadingComponent";

export const ViewButton = ({ row }: any) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const onViewClick = () => {
    router.push(`/clients/${row?.id}/view`);
  };

  return (
    <div className="eachAction">
      <Image
        title="View"
        onClick={() => {
          setLoading(true);
          onViewClick();
        }}
        src={"/view.svg"}
        height={70}
        width={70}
        alt="Image"
      />

      <LoadingComponent loading={loading} />
    </div>
  );
};

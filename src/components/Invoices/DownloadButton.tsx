"use client";
import { downloadFile } from "@/lib/helpers/constants";
import Image from "next/image";
import { useState } from "react";
import { LoadingComponent } from "../core/LoadingComponent";
export const DownloadButton = ({ download }: any) => {
  const [loading, setLoading] = useState(false);
  const onDownloadClick = async () => {
    // window.open(download);
    setLoading(true);
    try {
      downloadFile(`invoice`, download);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eachAction">
      <Image
        title="Download"
        onClick={() => {
          onDownloadClick();
        }}
        src={"/download.svg"}
        height={30}
        width={30}
        alt="Image"
      ></Image>
      <LoadingComponent loading={loading} label="Downloading" />
    </div>
  );
};

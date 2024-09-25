"use client";
import Image from "next/image";
export const DownloadButton = ({ download }: any) => {

    const onDownloadClick = () => {
        window.open(download);
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
    </div>
  );
};

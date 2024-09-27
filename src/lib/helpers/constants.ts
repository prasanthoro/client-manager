import { title } from "process";
import { toast } from "sonner";
export const checkAllowedValidText = (value: any) => {
  const inputValue = value;
  const regex = /\w+/;
  if (regex.test(inputValue)) {
    return true;
  }
};
export const formatInvoiceDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const downloadFile = async (name: string, url: string) => {
  let urlPdf = `${url}`;
  try {
    if (url) {
      fetch(urlPdf, {
        cache: "no-store", // Ensure that the request doesn't use the cache
      })
        .then((response) => {
          // Get the filename from the response headers
          const contentDisposition = response.headers.get(
            "content-disposition"
          );
          let filename = name || "report.pdf"; // Default filename if not found in headers

          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="(.+)"/);
            if (filenameMatch && filenameMatch.length > 1) {
              filename = filenameMatch[1];
            }
          }
          // Create a URL for the blob
          return response.blob().then((blob) => ({ blob, filename }));
        })
        .then(({ blob, filename }) => {
          const blobUrl = window.URL.createObjectURL(blob);
          const downloadLink = document.createElement("a");
          downloadLink.href = blobUrl;
          downloadLink.download = filename; // Use the obtained filename
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          // Clean up the blob URL
          window.URL.revokeObjectURL(blobUrl);
          toast.success("File downloaded Successfully!");
          setTimeout(() => {
            toast.dismiss();
          }, 3000);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
          toast.error("Report download failed!");
          setTimeout(() => {
            toast.dismiss();
          }, 3000);
        });
    }
  } catch (err) {
    console.error(err);
    toast.error("Report download failed!");
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
  }
};

export const invoiceStatus = [
  // {
  //   label: "",
  //   value: "Clear",
  // },
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
];

export const serviceTypeConstansts = [
  {
    title: "One - Time",
    value: "ONE-TIME",
  },
  {
    title: "Reccuring",
    value: "RECURRING",
  },
];

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

export const checkAmountInput = (event: any) => {
  let value = event.target.value;

  // Replace anything that is not a number or decimal point
  value = value.replace(/[^0-9.]/g, "");

  // Ensure that there is only one decimal point in the value
  const decimalIndex = value.indexOf(".");

  if (decimalIndex !== -1) {
    // Allow up to 2 decimal places, and remove additional decimals if present
    const beforeDecimal = value.slice(0, decimalIndex); // Digits before the decimal
    const afterDecimal = value.slice(decimalIndex + 1).replace(/\./g, ""); // Remove extra decimal points
    value = beforeDecimal + "." + afterDecimal.slice(0, 2); // Restrict to 2 decimal places
  }

  // Update the event target value
  event.target.value = value;
};

export const checkPhoneNumber = (event: any) => {
  let value = event.target.value;

  // Replace anything that is not a digit or a decimal point
  value = value.replace(/[^\d.]/g, "");

  // Ensure that only one decimal point is allowed
  const decimalIndex = value.indexOf(".");

  if (decimalIndex !== -1) {
    // Restrict digits after the decimal point to two places
    const beforeDecimal = value.slice(0, decimalIndex); // Digits before the decimal
    const afterDecimal = value.slice(decimalIndex + 1).replace(".", ""); // Digits after the decimal (ignoring other dots)

    // Combine the before-decimal part with up to two digits after the decimal
    value = `${beforeDecimal}.${afterDecimal.slice(0, 2)}`;
  }

  // Limit the number of digits before the decimal point to 10
  if (decimalIndex === -1) {
    value = value.slice(0, 10); // No decimal, only digits allowed
  } else {
    value = value.slice(0, decimalIndex + 3); // Restrict to 10 digits including decimal point and two decimals
  }

  event.target.value = value;
};

const formatMoney = (amount: any, currencySymbol = "₹") => {
  let rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  if (amount) {
    return rupee.format(parseInt(amount, 10));
  } else {
    return rupee.format(0);
  }
};

export default formatMoney;

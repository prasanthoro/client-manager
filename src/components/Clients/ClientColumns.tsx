import { formatAmount } from "@/lib/helpers/core/formatAmount";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { ViewButton } from "./ViewButton";
import { changeInputFormats } from "@/lib/helpers/core/changeFirstLetterToCap";
import dayjs from "dayjs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export const clientColumns = (getAllClients: any) => {
  return [
    {
      accessorFn: (row: any) => row.serial,
      id: "serial",
      header: () => <span>S.No</span>,
      footer: (props: any) => props.column.id,
      width: "60px",
      maxWidth: "60px",
      minWidth: "60px",
    },
    {
      accessorFn: (row: any) => row?.company_name,
      header: () => <span>Company Name</span>,
      id: "company_name",
      cell: (info: any) => {
        const companyName = changeInputFormats(info.getValue());
        const shouldShowTooltip = companyName && companyName.length > 10;
        const truncatedText = shouldShowTooltip
          ? `${companyName.substring(0, 10)}...`
          : companyName;
        return (
          <div className="eachCell">
            {shouldShowTooltip ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>{truncatedText}</span>
                  </TooltipTrigger>
                  <TooltipContent
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      borderRadius: "4px",
                      padding: "8px",
                      maxWidth: "300px",
                      fontSize: "14px",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                    }}
                  >
                    <div className="tooltipContent">{companyName}</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <span>{truncatedText || "--"}</span>
            )}
          </div>
        );
      },
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
    },

    {
      accessorFn: (row: any) => row?.client_name,
      header: () => <span> Client Name</span>,
      id: "client_name",
      cell: (info: any) => {
        const clientName = changeInputFormats(info.getValue());
        const shouldShowTooltip = clientName && clientName.length > 10;
        const truncatedText = shouldShowTooltip
          ? `${clientName.substring(0, 10)}...`
          : clientName;
        return (
          <div className="eachCell">
            {shouldShowTooltip ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>{truncatedText}</span>
                  </TooltipTrigger>
                  <TooltipContent
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      borderRadius: "4px",
                      padding: "8px",
                      maxWidth: "300px",
                      fontSize: "14px",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                    }}
                  >
                    <div className="tooltipContent">{clientName}</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <span>{truncatedText || "--"}</span>
            )}
          </div>
        );
      },
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
    },
    {
      accessorFn: (row: any) => row?.poc,
      header: () => <span>POC</span>,
      id: "poc",
      cell: (info: any) => {
        return (
          <span className="eachCell">
            {changeInputFormats(info.getValue())
              ? changeInputFormats(info.getValue())
              : "--"}
          </span>
        );
      },
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
    },

    {
      accessorFn: (row: any) => row.email,
      header: () => <span>Email</span>,
      id: "email",
      cell: (info: any) => {
        return (
          <span className="eachCell">
            {info.getValue() ? info.getValue() : "--"}
          </span>
        );
      },
      width: "100px",
    },
    {
      accessorFn: (row: any) => row.phone,
      header: () => <span>Phone</span>,
      id: "phone",
      cell: (info: any) => {
        return (
          <span className="eachCell">
            {info.getValue() ? info.getValue() : "--"}
          </span>
        );
      },
      width: "100px",
    },

    {
      accessorFn: (row: any) => {
        const address = row?.address || "";
        const city = row?.city || "";
        const state = row?.state || "";
        const country = row?.country || "";
        const addressParts = [address, city, state, country].filter(
          (part) => part
        );
        return addressParts.join(", ");
      },
      id: "address",
      header: () => <span>Address</span>,
      cell: (info: any) => {
        const adress = changeInputFormats(info.getValue());
        const shouldShowTooltip = adress && adress.length > 20;
        const truncatedText = shouldShowTooltip
          ? `${adress.substring(0, 20)}...`
          : adress;
        return (
          <div className="eachCell">
            {shouldShowTooltip ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>{truncatedText}</span>
                  </TooltipTrigger>
                  <TooltipContent
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      borderRadius: "4px",
                      padding: "8px",
                      maxWidth: "300px",
                      fontSize: "14px",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                    }}
                  >
                    <div className="tooltipContent">{adress}</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <span>{truncatedText || "--"}</span>
            )}
          </div>
        );
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.created_at,
      id: "created_at",
      header: () => <span>Date</span>,
      cell: (info: any) => {
        return (
          <span className="eachCell">
            {info.getValue()
              ? dayjs(info.getValue()).format("DD-MM-YYYY")
              : "--"}
          </span>
        );
      },
      footer: (props: any) => props.columns.id,
      width: "150px",
    },

    {
      accessorFn: (row: any) => row?.total_invoice_amount,
      id: "total_invoice_amount",
      header: () => <span>Total Invoice Amount</span>,
      cell: (info: any) => {
        return (
          <span className="eachCell">
            {info.getValue() ? formatAmount(info.getValue()) : "--"}
          </span>
        );
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?._id,
      id: "actions",
      header: () => <span>Actions</span>,
      footer: (props: any) => props.columns.id,
      cell: (info: any) => {
        return (
          <div className="actionIcons">
           <ul
              className="actionList"
              style={{ display: "flex", listStyle: "none", padding: 0, gap:'0.3rem' }}
            >
              <li className="eachList"
                style={{ cursor: "pointer" }}>
                <ViewButton row={info?.row?.original} />
              </li>
              <li
                className="eachList"
                style={{ cursor: "pointer" }}
              >
                <EditButton row={info?.row?.original} />
              </li>
              <li  className="eachList"
                  style={{ cursor: "pointer" }}>
                <DeleteButton
                  getAllClients={getAllClients}
                  clientId={info.row.original.id}
                />
              </li>
            </ul>
          </div>
        );
      },
    },
  ];
};

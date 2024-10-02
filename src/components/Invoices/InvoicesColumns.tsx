import { formatAmount } from "@/lib/helpers/core/formatAmount";
import { EditButton } from "./EditButton";
import { DownloadButton } from "./DownloadButton";
import { formatInvoiceDate } from "@/lib/helpers/constants";
import { ViewInvoiceButton } from "./ViewButton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export const invoicesColumns = () => {
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
      accessorFn: (row: any) => row?.client_name,
      id: "client_name",
      header: () => <span>Client Name</span>,
      cell: (info: any) => {
        return (
          <span className="eachCell">
            {info.getValue() ? info.getValue() : "--"}
          </span>
        );
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.service_name,
      id: "service_name",
      header: () => <span>Service Name</span>,
      cell: (info: any) => {
        return (
          <span className="eachCell">
            {info.getValue() ? info.getValue() : "--"}
          </span>
        );
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.type,
      id: "type",
      header: () => <span>Service Type</span>,
      cell: (info: any) => {
        return (
          <span className="eachCell">
            {info.getValue() ? info.getValue() : "--"}
          </span>
        );
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.invoice_date,
      id: "invoice_date",
      header: () => <span>Invoice Date</span>,
      cell: (info: any) => {
        return (
          <span className="eachCell">
            {formatInvoiceDate(info.getValue())
              ? formatInvoiceDate(info.getValue())
              : "--"}
          </span>
        );
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.invoice_amount,
      id: "invoice_amount",
      header: () => <span>Invoice Amount</span>,
      cell: (info: any) => {
        return (
          <span className="eachCell">
            {formatAmount(info.getValue())
              ? formatAmount(info.getValue())
              : "--"}
          </span>
        );
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.invoice_status,
      id: "invoice_status",
      header: () => <span>Status</span>,
      cell: (info: any) => {
        return (
          <span className="eachCell">
            {info.getValue() ? info.getValue() : "--"}
          </span>
        );
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.remarks,
      id: "remarks",
      header: () => <span>Remarks</span>,
      cell: (info: any) => {
        const remarks = info.getValue();
        const shouldShowTooltip = remarks && remarks.length > 20;
        const truncatedText = shouldShowTooltip
          ? `${remarks.substring(0, 20)}...`
          : remarks;
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
                    <div className="tooltipContent">{remarks}</div>
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
      accessorFn: (row: any) => row?.actions,
      id: "actions",
      header: () => <span>Actions</span>,
      footer: (props: any) => props.columns.id,
      cell: (info: any) => {
        return (
          <div className="actionIcons">
            <ul
              className="actionList"
              style={{ display: "flex", listStyle: "none", padding: 0 }}
            >
              <li
                className="eachList"
                style={{ marginRight: "10px", cursor: "pointer" }}
              >
                <EditButton invoice_id={info.row?.original?.id} />
              </li>
              <li
                className="eachList"
                style={{ marginRight: "10px", cursor: "pointer" }}
              >
                <ViewInvoiceButton invoice_id={info.row?.original?.id} />
              </li>
              {info?.row?.original?.url ? (
                <li
                  className="eachList"
                  style={{ marginRight: "10px", cursor: "pointer" }}
                >
                  <DownloadButton download={info?.row?.original?.url} />
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        );
      },
    },
  ];
};

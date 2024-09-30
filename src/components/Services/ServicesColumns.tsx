import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dayjs from "dayjs";
import { formatAmount } from "@/lib/helpers/core/formatAmount";
import { EditButton } from "./EditButton";

export const servicesColumns = () => {
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
      accessorFn: (row: any) => row?.service_name,
      id: "service_name",
      header: () => <span> Service Name</span>,
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
      header: () => <span> Service Type</span>,
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
      accessorFn: (row: any) => row?.invoice_amount,
      id: "invoice_amount",
      header: () => <span>Invoice Amount</span>,
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
      footer: (props: any) => props.column.id,
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
                <EditButton id={info?.row?.original?.id} />
              </li>
            </ul>
          </div>
        );
      },
    },
  ];
};

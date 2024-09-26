import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dayjs from "dayjs";
import { formatAmount } from "@/lib/helpers/core/formatAmount";

export const servicesColumns = () => {
  return [
    {
      accessorFn: (row: any) => row?.service_name,
      id: "service_name",
      header: () => <span>Name</span>,
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
      header: () => <span>Type</span>,
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
      accessorFn: (row: any) => row?.updated_at,
      id: "updated_at",
      header: () => <span>Date</span>,
      cell: (info: any) => {
        return (
          <span className="eachCell">
            {info.getValue()
              ? dayjs(info.getValue()).format("YYYY-MM-DD")
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

    // {
    //   accessorFn: (row: any) => row?.actions,
    //   id: "actions",
    //   header: () => <span>Actions</span>,
    //   footer: (props: any) => props.columns.id,
    //   cell: (info: any) => {
    //     return <div className="actionIcons"></div>;
    //   },
    // },
  ];
};

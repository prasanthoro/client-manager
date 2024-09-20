import { formatAmount } from "@/lib/helpers/core/formatAmount";

export const servicesColumns = () => {
  return [
    {
      accessorFn: (row: any) => row?.title,
      id: "title",
      header: () => <span>Title</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.type,
      id: "type",
      header: () => <span>Type</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.invoice_amount,
      id: "invoice_amount",
      header: () => <span>Invoice Amount</span>,
      cell: (info: any) => {
        return <span className="eachCell">{formatAmount(info.getValue())}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.status,
      id: "status",
      header: () => <span>Status</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
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
        return <div className="actionIcons"></div>;
      },
    },
  ];
};

import { formatAmount } from "@/lib/helpers/core/formatAmount";
import { EditButton } from "./EditButton";

export const invoicesColumns = () => {
  return [
    {
      accessorFn: (row: any) => row?.client_name,
      id: "client_name",
      header: () => <span>Client Name</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.type,
      id: "type",
      header: () => <span>Service Type</span>,
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
      accessorFn: (row: any) => row?.invoice_status,
      id: "invoice_status",
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
        return <div className="actionIcons">
        <ul
          className="actionList"
          style={{ display: "flex", listStyle: "none", padding: 0 }}
        >
          <li className="eachList" style={{ marginRight: "10px",cursor:'pointer' }}>
            <EditButton />
          </li>
          <li className="eachList">
            {/* <DeleteButton
              getAllClients={getAllClients}
              clientId={info.row.original.id}
            /> */}
          </li>
        </ul>
      </div>
      },
    },
  ];
};

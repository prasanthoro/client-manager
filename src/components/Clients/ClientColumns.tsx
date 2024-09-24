import { formatAmount } from "@/lib/helpers/core/formatAmount";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { ViewButton } from "./ViewButton";

export const clientColumns = (getAllClients: Function) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: "name",
      header: () => <span>Name</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.email,
      id: "email",
      header: () => <span>Email</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.phone,
      id: "phone",
      header: () => <span>Phone</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.role,
      id: "role",
      header: () => <span>Role</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
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
      accessorFn: (row: any) => row?.address,
      id: "address",
      header: () => <span>Address</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "200px",
    },
    {
      accessorFn: (row: any) => row?.country,
      id: "country",
      header: () => <span> Country</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.state,
      id: "state",
      header: () => <span>State</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.city,
      id: "city",
      header: () => <span>City</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.poc,
      id: "poc",
      header: () => <span>Poc</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.total_invoice_amount,
      id: "total_invoice_amount",
      header: () => <span>Total Invoice Amount</span>,
      cell: (info: any) => {
        return (
          <span className="eachCell">{formatAmount(info.getValue())}</span>
        );
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.secondary_phone,
      id: "secondary_phone",
      header: () => <span>Secondary Phone</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row?.remarks,
      id: "remarks",
      header: () => <span>Remarks</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
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
              style={{ display: "flex", listStyle: "none", padding: 0 }}
            >
              <li className="eachList" style={{ marginRight: "1px" }}>
                <ViewButton row={info?.row?.original} />
              </li>
              <li className="eachList" style={{ marginRight: "10px" }}>
                <EditButton />
              </li>
              <li className="eachList">
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

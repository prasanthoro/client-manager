import { formatAmount } from "@/lib/helpers/core/formatAmount";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { ViewButton } from "./ViewButton";

export const clientColumns = (getAllClients: any) => {
  return [
    {
<<<<<<< HEAD
      accessorFn: (row: any) => row,
      header: () => (
        <span style={{ whiteSpace: "nowrap" }}>Client Details</span>
      ),
      id: "volume",
      width: "800px",

      columns: [
        {
          accessorFn: (row: any) => row?.client_name,
          header: () => <span>Name</span>,
          id: "client_name",
          cell: (info: any) => {
            return <span className="eachCell">{info.getValue()}</span>;
          },
          width: "220px",
        },
        {
          accessorFn: (row: any) => row?.company_name,
          header: () => <span>Company Name</span>,
          id: "company_name",
          cell: (info: any) => {
            return <span className="eachCell">{info.getValue()}</span>;
          },
          width: "220px",
        },
        {
          accessorFn: (row: any) => row.client_email,
          header: () => <span>Email</span>,
          id: "client_email",
          cell: (info: any) => {
            return <span className="eachCell">{info.getValue()}</span>;
          },
          width: "220px",
        },
        {
          accessorFn: (row: any) => row.client_phone,
          header: () => <span>Phone</span>,
          id: "client_phone",
          cell: (info: any) => {
            return <span className="eachCell">{info.getValue()}</span>;
          },
          width: "220px",
        },
      ],
=======
      accessorFn: (row: any) => row?.client_name,
      id: "client_name",
      header: () => <span>Name</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "100px",
>>>>>>> 527134b4a2de046832e9431801399102f75091a4
    },

    {
      accessorFn: (row: any) =>
        `${row?.address}, ${row?.city}, ${row?.state}, ${row?.country}`,
      id: "address",
      header: () => <span>Address</span>,
      cell: (info: any) => {
        return <span className="eachCell">{info.getValue()}</span>;
      },
      footer: (props: any) => props.columns.id,
      width: "300px",
    },

    {
      accessorFn: (row: any) => row,
      header: () => <span style={{ whiteSpace: "nowrap" }}>Poc Details</span>,
      id: "pocdetails",
      width: "800px",

      columns: [
        {
          accessorFn: (row: any) => row?.poc,
          header: () => <span>Name</span>,
          id: "poc",
          cell: (info: any) => {
            return <span className="eachCell">{info.getValue()}</span>;
          },
          width: "220px",
        },
        {
          accessorFn: (row: any) => row.email,
          header: () => <span>Email</span>,
          id: "email",
          cell: (info: any) => {
            return <span className="eachCell">{info.getValue()}</span>;
          },
          width: "220px",
        },
        {
          accessorFn: (row: any) => row.phone,
          header: () => <span>Phone</span>,
          id: "phone",
          cell: (info: any) => {
            return <span className="eachCell">{info.getValue()}</span>;
          },
          width: "220px",
        },
        {
          accessorFn: (row: any) => row.secondary_phone,
          header: () => <span>Secondary Phone</span>,
          id: "secondary_phone",
          cell: (info: any) => {
            return <span className="eachCell">{info.getValue()}</span>;
          },
          width: "220px",
        },
      ],
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
      accessorFn: (row: any) => row?.total_invoice_amount,
      id: "total_invoice_amount",
      header: () => <span>Total Invoice Amount</span>,
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

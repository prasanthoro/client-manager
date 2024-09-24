import { formatAmount } from "@/lib/helpers/core/formatAmount";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { ViewButton } from "./ViewButton";

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
      accessorFn: (row: any) => row,
      header: () => (
        <span style={{ whiteSpace: "nowrap" }}>Client Details</span>
      ),
      id: "volume",
      width: "800px",

      columns: [
        {
          accessorFn: (row: any) => row?.company_name,
          header: () => <span>Company Name</span>,
          id: "company_name",
          cell: (info: any) => {
            return <span className="eachCell">{info.getValue()}</span>;
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
            return <span className="eachCell">{info.getValue()}</span>;
          },
          width: "100px",
        },

        {
          accessorFn: (row: any) => row.client_email,
          header: () => <span>Email</span>,
          id: "client_email",
          cell: (info: any) => {
            return <span className="eachCell">{info.getValue()}</span>;
          },
          width: "100px",
        },
        {
          accessorFn: (row: any) => row.client_phone,
          header: () => <span>Phone</span>,
          id: "client_phone",
          cell: (info: any) => {
            return <span className="eachCell">{info.getValue()}</span>;
          },
          width: "100px",
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
          width: "100px",
        },
      ],
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
          width: "100px",
        },
        {
          accessorFn: (row: any) => row.email,
          header: () => <span>Email</span>,
          id: "email",
          cell: (info: any) => {
            return <span className="eachCell">{info.getValue()}</span>;
          },
          width: "100px",
        },
        {
          accessorFn: (row: any) => row.phone,
          header: () => <span>Phone</span>,
          id: "phone",
          cell: (info: any) => {
            return <span className="eachCell">{info.getValue()}</span>;
          },
          width: "100px",
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
              <li
                className="eachList"
                style={{ marginRight: "10px", cursor: "pointer" }}
              >
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

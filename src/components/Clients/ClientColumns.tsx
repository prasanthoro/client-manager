"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const dummyData = [
  {
    companyName: "JOHNSON & JOHNSON",
    contactPerson: "Justin Septimus",
    title: "Sales Manager",
    emailAddress: "deanna.curtis@example.com",
    primaryNumber: "+91 70492 49031",
    Image: (
      <Image
        src={"view.svg"}
        alt="view"
        height={30}
        width={30}
        className="beforeActiveIcon pointerCursor"
      />
    ),
  },
  {
    companyName: "LOUIS VUITTON",
    contactPerson: "Anika Rhiel Madsen",
    title: "President of Sales",
    emailAddress: "georgia.young@example.com",
    primaryNumber: "+91 70492 49031",
  },
  {
    companyName: "MITSUBISHI",
    contactPerson: "Miracle Vaccaro",
    title: "President of Sales",
    emailAddress: "bill.sanders@example.com",
    primaryNumber: "+91 70492 49031, 0 123 233 9030",
  },
  {
    companyName: "GILLETTE",
    contactPerson: "Erin Levin",
    title: "Sales Manager",
    emailAddress: "sara.cruz@example.com",
    primaryNumber: "0 123 233 9030",
  },
  {
    companyName: "EBAY",
    contactPerson: "Mira Herwitz",
    title: "President of Sales",
    emailAddress: "tanya.hill@example.com",
    primaryNumber: "+91 84830 49031, +91 73392 49031",
  },
  {
    companyName: "LOUIS VUITTON",
    contactPerson: "Jaxson Siphron",
    title: "President of Sales",
    emailAddress: "alma.lawson@example.com",
    primaryNumber: "+91 70492 49031",
  },
  {
    companyName: "STARBUCKS",
    contactPerson: "Mira Levin",
    title: "Web Designer",
    emailAddress: "jackson.graham@example.com",
    primaryNumber: "+91 98433 39030",
  },
  {
    companyName: "THE WALT DISNEY",
    contactPerson: "Lincoln Levin",
    title: "Graphical Designer",
    emailAddress: "jessica.hanson@example.com",
    primaryNumber: "+91 84830 49031, +91 98433 39030",
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorFn: (row: any) => row?.code,
    id: "code",
    header: () => <span>S.No</span>,
    cell: (info: any) => {
      return <span className="eachCell policyText">{info.getValue()}</span>;
    },
    footer: (props: any) => props.columns.id,
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
    cell: (info: any) => (
      <div>
        <strong>{info.getValue()}</strong>
        <br />
        <span>{info.row.original.title}</span>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

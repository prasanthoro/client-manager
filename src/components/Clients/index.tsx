"use client";
import React from "react";
import {
  ColumnDef,
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming ShadCN components
import { dummyData } from "./ClientColumns";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "companyName",
    header: "Company Name",
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
    accessorKey: "emailAddress",
    header: "Email Address",
  },
  {
    accessorKey: "primaryNumber",
    header: "Primary Number",
  },

  {
    accessorKey: "actions",
    header: "Actions",
  },
];
const MyTable = () => {
  const table = useReactTable({
    data: dummyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <h3>Clients Management</h3>
        <Input
          type="search"
          placeholder="Search Clients By Name and PhoneNumber"
        />
        <Button>Add Client</Button>
      </div>
      <div className="container mx-auto mt-8">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>No data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default MyTable;

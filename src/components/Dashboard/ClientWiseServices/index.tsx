"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClientWiseServicesList = ({ serviceWiseInvoices }: any) => {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Client Wise Services Amount</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Service Type</TableCell>
              <TableCell>Invoice Amount</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceWiseInvoices.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.type ? item.type : "--"}</TableCell>
                <TableCell>
                  {item.invoice_amount
                    ? `₹ ${Number(item.invoice_amount).toLocaleString("en-IN")}`
                    : "--"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
export default ClientWiseServicesList;

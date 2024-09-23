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

const ClientWiseInvoicesList = ({ clientWiseTotallInvoices }: any) => {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Client Wise Invoices Amount</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell>Invoice Amount</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientWiseTotallInvoices.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.client_name ? item.client_name : "--"}
                </TableCell>
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
export default ClientWiseInvoicesList;

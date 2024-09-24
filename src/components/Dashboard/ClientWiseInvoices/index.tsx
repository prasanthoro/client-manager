"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClientWiseInvoicesList = ({ clientWiseTotallInvoices }: any) => {
  return (
    <Card>
      <CardHeader className="px-5">
        <CardTitle>Latest Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        {clientWiseTotallInvoices && clientWiseTotallInvoices.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Invoice Date</TableCell>
                <TableCell>Invoice Status</TableCell>
                <TableCell>Invoice Amount</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientWiseTotallInvoices.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.company_name ? item.company_name : "--"}
                  </TableCell>
                  <TableCell>
                    {item.client_name ? item.client_name : "--"}
                  </TableCell>
                  <TableCell>{item.type ? item.type : "--"}</TableCell>
                  <TableCell>
                    {item.invoice_date ? item.invoice_date : "--"}
                  </TableCell>
                  <TableCell>
                    {item.invoice_status ? item.invoice_status : "--"}
                  </TableCell>
                  <TableCell>
                    {item.invoice_amount
                      ? `₹ ${Number(item.invoice_amount).toLocaleString(
                          "en-IN"
                        )}`
                      : "--"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center p-4 text-gray-500">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Client Name</TableCell>
                  <TableCell>Service Type</TableCell>
                  <TableCell>Invoice Date</TableCell>
                  <TableCell>Invoice Status</TableCell>
                  <TableCell>Invoice Amount</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <h2>No Data </h2>
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientWiseInvoicesList;

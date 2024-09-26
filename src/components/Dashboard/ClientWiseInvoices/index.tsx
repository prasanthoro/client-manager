"use client";
import { ViewButton } from "@/components/Clients/ViewButton";
import { DownloadButton } from "@/components/Invoices/DownloadButton";
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Company Name</TableCell>
          <TableCell>Client Name</TableCell>
          <TableCell>Service Type</TableCell>
          <TableCell>Invoice Date</TableCell>
          <TableCell>Invoice Status</TableCell>
          <TableCell>Invoice Amount</TableCell>
          {/* <TableCell>Actions</TableCell> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {clientWiseTotallInvoices.length > 0 ? (
          clientWiseTotallInvoices.map((item: any) => (
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
                  ? `₹ ${Number(item.invoice_amount).toLocaleString("en-IN")}`
                  : "--"}
              </TableCell>
              {/* <TableCell>
                <DownloadButton />
              </TableCell> */}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} style={{ textAlign: "center" }}>
              No Data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default ClientWiseInvoicesList;

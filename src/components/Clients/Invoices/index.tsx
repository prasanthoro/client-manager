"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatAmount } from "@/lib/helpers/core/formatAmount"

const InvoicesList = ({clientInvoices}: any) => {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Client Wise Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice Name</TableHead>
              <TableHead className="hidden sm:table-cell">Invoice Type</TableHead>
              <TableHead className="hidden sm:table-cell">Invoice Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {clientInvoices?.length > 0 &&
              clientInvoices.map((item: any, index: number) => {
                return (
            <TableRow className="bg-accent">
              <TableCell>
                {item?.title}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
              {item?.type}
              </TableCell>
              <TableCell className="text-right">{formatAmount(item?.invoice_amount)}</TableCell>
            </TableRow>
             );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
export default InvoicesList;

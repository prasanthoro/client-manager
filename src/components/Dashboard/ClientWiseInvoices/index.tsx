import { DownloadButton } from "@/components/Invoices/DownloadButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatInvoiceDate } from "@/lib/helpers/constants";
import { formatAmount } from "@/lib/helpers/core/formatAmount";

const ClientWiseInvoicesList = ({ clientWiseTotallInvoices }: any) => {
  return (
    <>
      <div id="clientWiseTable" className="relative">
        <div className="flex justify-between">
          <Table className="custom-table w-full">
            <TableHeader>
              <TableRow>
                <TableCell className="bg-purple-200 text-black font-bold py-2 px-4">
                  Company Name
                </TableCell>
                <TableCell className="bg-purple-200 text-black font-bold py-2 px-4">
                  Client Name
                </TableCell>
                <TableCell className="bg-purple-200 text-black font-bold py-2 px-4">
                  Service Name
                </TableCell>
                <TableCell className="bg-purple-200 text-black font-bold py-2 px-4">
                  Service Type
                </TableCell>
                <TableCell className="bg-purple-200 text-black font-bold py-2 px-4">
                  Invoice Date
                </TableCell>
                <TableCell className="bg-purple-200 text-black font-bold py-2 px-4">
                  Invoice Status
                </TableCell>
                <TableCell className="bg-purple-200 text-black font-bold py-2 px-4">
                  Invoice Amount
                </TableCell>
                <TableCell className="bg-purple-200 text-black font-bold py-2 px-4">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientWiseTotallInvoices.length > 0 ? (
                clientWiseTotallInvoices.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.company_name || "--"}</TableCell>
                    <TableCell>{item.client_name || "--"}</TableCell>
                    <TableCell>{item.service_name}</TableCell>
                    <TableCell>{item.type || "--"}</TableCell>
                    <TableCell>
                      {formatInvoiceDate(item.invoice_date) || "--"}
                    </TableCell>
                    <TableCell>{item.invoice_status || "--"}</TableCell>
                    <TableCell>
                      {item.invoice_amount
                        ? `${formatAmount(item.invoice_amount)}`
                        : "--"}
                    </TableCell>
                    <TableCell>
                      {item?.url ? (
                        <li
                          className="eachList"
                          style={{ marginRight: "10px", cursor: "pointer" }}
                        >
                          <DownloadButton download={item?.url} />
                        </li>
                      ) : (
                        <span>--</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-2">
                    No Data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ClientWiseInvoicesList;

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";

import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tanstackTablePropTypes } from "@/lib/interfaces/table";
import PaginationComponent from "./TablePagination";

const TanStackTableComponent: FunctionComponent<tanstackTablePropTypes> = ({
  columns,
  data,
  loading,
  getData,
  paginationDetails,
  removeSortingForColumnIds,
  isPaginatedData = true,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const [rowSelection, setRowSelection] = useState<any>([]);
  const [navigationLoading, setNavigationLoading] = useState(false);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  });

  const getWidth = (id: string) => {
    const widthObj = columns.find((item: any) => item.id === id);
    return widthObj?.width;
  };

  const capturePageNum = (value: number) => {
    getData({
      limit: params.get("limit") as string,
      page: value,
    });
  };

  const captureRowPerItems = (value: number) => {
    getData({
      limit: value,
      page: 1,
    });
  };

  const sortAndGetData = (header: any) => {
    if (
      removeSortingForColumnIds &&
      removeSortingForColumnIds.length &&
      removeSortingForColumnIds.includes(header.id)
    ) {
      return;
    }

    let orderBy = header.id;
    let orderType = "asc";
    if (params.get("order_by") === header.id) {
      if (params.get("order_type") === "asc") {
        orderType = "desc";
      } else {
        orderBy = "";
        orderType = "";
      }
    }
    getData({
      order_by: orderBy,
      order_type: orderType,
    });
  };

  const getHasSortOrNot = (id: string) => {
    return !(
      removeSortingForColumnIds &&
      removeSortingForColumnIds.length &&
      removeSortingForColumnIds.includes(id)
    );
  };

  const onRowClick = (dataObj: any) => {
    if (pathname === "/mtp") {
      setNavigationLoading(true);
      const { month, salesRepId } = dataObj;

      const queryObj = {
        month: month,
        salesRepId: salesRepId,
      };
      const urlString = prepareURLEncodedParams("/mtp/view", queryObj);
      router.push(urlString);
    }
  };

  return (
    <div className="defaultTable">
      <div>
        <Table>
          <TableHeader>
            {table
              .getHeaderGroups()
              .map((headerGroup: any, mainIndex: number) => (
                <TableRow className="table-row" key={mainIndex}>
                  {headerGroup.headers.map((header: any, index: number) => (
                    <TableHead key={index}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={`cell ${
                            getHasSortOrNot(header.id) ? "sortHeader" : ""
                          }`}
                          style={{
                            display: "flex",
                            gap: "4px",
                            cursor: "pointer",
                            alignItems: "center",
                          }}
                          onClick={() => sortAndGetData(header)}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          <SortItems
                            header={header}
                            removeSortingForColumnIds={
                              removeSortingForColumnIds
                            }
                          />
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
          </TableHeader>
          <TableBody className="tbody">
            {data?.length ? (
              table
                .getFilteredRowModel()
                .rows.map((row: any, mainIndex: number) => (
                  <TableRow
                    style={{
                      cursor: pathname === "/mtp" ? "pointer" : "default",
                    }}
                    className="table-row"
                    key={mainIndex}
                    onClick={() => onRowClick(row?.original)}
                  >
                    {row.getVisibleCells().map((cell: any, index: number) => (
                      <TableCell
                        className="cell"
                        key={index}
                        style={{
                          verticalAlign: "top",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : !loading ? (
              <TableRow>
                <TableCell colSpan={columns?.length}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "50vh",
                    }}
                  >
                    <Image
                      alt="no-data"
                      src={"/core/table/no-data.svg"}
                      width={250}
                      height={250}
                    />

                    <p style={{ fontSize: "clamp(20px, 1.04vw, 22px)" }}>
                      No Data
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              ""
            )}
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns?.length}>
                  {/* <LoadingComponent loading={loading} label={label} /> */}
                </TableCell>
              </TableRow>
            ) : (
              ""
            )}
          </TableBody>
        </Table>
      </div>
      <div className="listingPagination">
        {!loading && paginationDetails ? (
          <PaginationComponent
            page={paginationDetails.page}
            total_pages={paginationDetails.total_pages}
            total={paginationDetails.total}
            onPageChange={capturePageNum}
            itemsPerPage={paginationDetails.itemsPerPage}
            onChangeItemsPerPage={captureRowPerItems}
            values={paginationDetails.values}
            limitOptionsFromProps={paginationDetails.limitOptionsFromProps}
            limitValue={paginationDetails.limitValue}
            paginationDetails={paginationDetails}
            capturePageNum={capturePageNum}
            captureRowPerItems={captureRowPerItems}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TanStackTableComponent;

const SortItems = ({
  header,
  removeSortingForColumnIds,
}: {
  header: any;
  removeSortingForColumnIds?: string[];
}) => {
  const params = useSearchParams();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {params.get("order_by") === header.id ? (
        params.get("order_type") === "asc" ? (
          <Image src="/sort-asc.svg" height={10} width={10} alt="image" />
        ) : (
          <Image src="/sort-desc.svg" height={10} width={10} alt="image" />
        )
      ) : removeSortingForColumnIds?.includes(header.id) ? (
        ""
      ) : (
        <Image src="/unsorted.svg" height={10} width={10} alt="image" />
      )}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  total_pages: number;
  total: number;
  onPageChange: (newPage: number) => void;
  itemsPerPage: number;
  onChangeItemsPerPage: (limit: number) => void;
  values: string;
  limitOptionsFromProps?: { title: string; value: number }[];
  limitValue?: number;
  paginationDetails: any;
  capturePageNum: (value: number) => void;
  captureRowPerItems: (value: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  page,
  total_pages,
  total,
  onPageChange,
  itemsPerPage,
  onChangeItemsPerPage,
  values,
  limitOptionsFromProps,
  limitValue,
  paginationDetails,
  capturePageNum,
  captureRowPerItems,
}) => {
  const [gotoPage, setGotoPage] = useState<string>(page?.toString());
  const [totalPages, setTotalPages] = useState<number>(total_pages);
  const [limitOptions, setLimitOptions] = useState<
    { title: string; value: number }[]
  >([
    { title: "25/page", value: 25 },
    { title: "50/page", value: 50 },
    { title: "75/page", value: 75 },
    { title: "100/page", value: 100 },
  ]);

  const handleGotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGotoPage(event.target.value);
  };

  const handleGotoSubmit = () => {
    const pageNumber = parseInt(gotoPage, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      capturePageNum(pageNumber);
    }
  };

  const onKeyDownInPageChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const pageNumber = parseInt(gotoPage, 10);
      if (pageNumber <= 0) {
        capturePageNum(1);
      } else if (
        paginationDetails?.total_pages &&
        pageNumber >= paginationDetails?.total_pages
      ) {
        capturePageNum(paginationDetails?.total_pages);
      } else if (totalPages && pageNumber >= totalPages) {
        capturePageNum(totalPages);
      } else {
        capturePageNum(pageNumber);
      }
    }
  };

  useEffect(() => {
    setGotoPage(paginationDetails?.page.toString() || "1");

    if (paginationDetails?.count && !paginationDetails?.total_pages) {
      const pagesCount = Math.ceil(
        paginationDetails?.count / paginationDetails?.limit
      );
      setTotalPages(pagesCount);
    }
  }, [paginationDetails]);

  useEffect(() => {
    setLimitOptions(
      limitOptionsFromProps?.length
        ? limitOptionsFromProps
        : [
            { title: "25/page", value: 25 },
            { title: "50/page", value: 50 },
            { title: "75/page", value: 75 },
            { title: "100/page", value: 100 },
          ]
    );
  }, [limitOptionsFromProps]);

  const renderPageNumbers = () => {
    const range = 2;
    let start = Math.max(1, page - range);
    let end = Math.min(totalPages, page + range);

    if (end - start < 2 * range) {
      if (start === 1) {
        end = Math.min(totalPages, start + 2 * range);
      } else if (end === totalPages) {
        start = Math.max(1, end - 2 * range);
      }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = renderPageNumbers();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <span>GoTo</span>
        <Input
          type="text"
          value={gotoPage}
          onChange={handleGotoChange}
          onKeyDown={onKeyDownInPageChange}
          style={{
            marginLeft: "10px",
            width: "60px",
            textAlign: "center",
            maxHeight: "28px",
          }}
          placeholder="Page"
        />
      </div>
      <Pagination>
        {page > 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(page - 1)}
              style={{ cursor: "pointer" }}
            >
              Previous
            </PaginationLink>
          </PaginationItem>
        )}
        {pages.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              onClick={() => onPageChange(number)}
              style={{ fontWeight: page === number ? "bold" : "normal" }}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page < totalPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(page + 1)}
              style={{ cursor: "pointer" }}
            >
              Next
            </PaginationLink>
          </PaginationItem>
        )}
      </Pagination>
      <div>Total {total}</div>
      <div>
        Items per page:
        {limitOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => captureRowPerItems(option.value)}
            style={{ marginLeft: "5px" }}
          >
            {option.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginationComponent;

export interface tanstackTablePropTypes {
  isPaginatedData?: boolean;
  paginationDetails: any;
  columns: any;
  data: any[];
  loading: boolean;
  getData: ({
    page,
    limit,
  }: Partial<{
    page: string | number;
    limit: string | number;
    pageSize: string | number;
    sort_by?: string;
    sort_type?: string;
  }>) => void;
  removeSortingForColumnIds?: string[];
}

export interface paginationPropTypes {
  paginationDetails: any;
  capturePageNum: (value: number) => void;
  captureRowPerItems: (value: number) => void;
  values?: string;
  limitOptionsFromProps?: { tite: string; value: number }[] | any;
  limitValue?: number;
}
import { Dispatch, SetStateAction } from "react";
export interface allTasksDataPageProps {
  isPaginatedData?: boolean;
  paginationDetails?: any;
  columns: any;
  data: any[];
  loading: boolean;
  getData: ({
    page,
    limit,
    sort_by,
    sort_type,
    hospital,
  }: Partial<{
    page: string | number;
    limit: string | number;
    pageSize: string | number;
    sort_by: string;
    sort_type: string;
    hospital: string;
  }>) => void;
  searchParams?: any;
  setSelectedIds?: Dispatch<SetStateAction<string[]> | any>;
  removeSortingForColumnIds?: string[];
  limitOptionFromProps?: { title: string; value: number }[];
  enableMultiRowSelectionOrNot?: boolean;
  selectedIds?: string[] | any;
}

export interface ApiResponse<TData> {
  code: string;
  message: string;
  data: TData;
}

export interface ApiErrorResponse<TData = null> {
  code: string;
  message: string;
  data?: TData;
}

export interface ApiPage<TItem> {
  content: TItem[];
  pageNumber: number;
  pageSize: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
}

export type ApiPageResponse<TItem> = ApiResponse<ApiPage<TItem>>;

export interface ApiPageParams {
  page?: number;
  size?: number;
}

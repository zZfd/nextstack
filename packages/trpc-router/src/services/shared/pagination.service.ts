export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export interface PaginationInput {
  page?: number;
  pageSize?: number;
}

export const PaginationService = {
  /**
   * Calculate pagination parameters
   */
  calculatePagination(input: PaginationInput) {
    const page = input.page ?? 1;
    const pageSize = Math.min(input.pageSize ?? 10, 100); // Cap at 100 items
    const skip = (page - 1) * pageSize;

    return {
      page,
      pageSize,
      skip,
    };
  },

  /**
   * Build paginated result
   */
  buildPaginatedResult<T>(
    data: T[],
    total: number,
    page: number,
    pageSize: number
  ): PaginatedResult<T> {
    const totalPages = Math.ceil(total / pageSize);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages,
      hasMore: page < totalPages,
    };
  },
};
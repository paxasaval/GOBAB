export interface Pagination{
  pag?: number,
  size?: number,
  totalPages?: number,
  nextPage?: number | null,
  prevPage?: number | null,
  existNextPage?: boolean,
  existPrevpage?: boolean,
  totalDocs?: number
}

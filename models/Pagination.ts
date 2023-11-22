export type PageLinks = {
  first: string | null;
  last: string | null;
  next: string | null;
  prev: string | null;
}

export type Meta = {
  current_page: number;
  from: number;
  path: string;
  per_page: number;
  to: number;
};

export type CursorPagination = {
  path: string;
  per_page: number;
  next_cursor: string | null;
  next_page_url: string | null;
  prev_cursor: string | null;
  prev_page_url: string | null;
};

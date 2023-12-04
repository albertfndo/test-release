export type PageLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type Links = {
  first: string | null;
  last: string | null;
  next: string | null;
  prev: string | null;
};

export type PageMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: PageLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

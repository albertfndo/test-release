export type Action = {
  text: string;
  icon?: string;
  color: string;
  hbid?: string;
  click?: () => Promise<void | null>;
};

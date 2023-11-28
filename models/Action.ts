export type Action = {
  text: string;
  icon?: string;
  color: string;
  click?: () => Promise<void | null>;
};

export interface ICard {
  id: string;
  name: string;
  description: string;
  creationTime: string;
}

export type ColName = "todo" | "inProgress" | "completed";

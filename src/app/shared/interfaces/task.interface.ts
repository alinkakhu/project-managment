export interface Task {
  _id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | undefined | null;
  boardId: string;
  columnId: string | undefined | null;
  users: string[];
}

export interface Task {
    _id?: string;
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
    users: string[];
  }

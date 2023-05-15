export interface Board {
  _id?: string;
  title: string;
}
export interface BoardTitle {
  _id?: string | null;
  title: string;
  owner: string | null;
  users: string[] | null;
}

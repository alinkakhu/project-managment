export interface Board {
    _id?: string;
    title: string;

  }
  export interface BoardTitle{
    title:string ,
    owner: string | null ,
    users: string[] | null
  }
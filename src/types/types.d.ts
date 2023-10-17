export type Category = {
  id: string;
  name: string;
};
export type Message = {
  id: string;
  title: string;
  message: string;
  categoryID: string;
};

export type Categories = Category[];

export type Messages = Message[];

export interface IPacients {
  _id: string;
  name: string;
  dni: string;
  images: string[];
  slug: string;
  birthDate?: string;
  tags: string[];
  hystorial: IHystoric[];
  createdAt: string;
  updatedAt: string;
}

export type IHystoric = {
  uid: string;
  description: string;
  dateCase: string;
};

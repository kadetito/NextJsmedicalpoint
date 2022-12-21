export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;

  number_col: string;
  images: string[];
  slug: string;
  birthDate: string;
  expertise: string;
  tags: string[];

  createdAt?: string;
  updatedAt?: string;
}

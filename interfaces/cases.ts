export interface ICases {
  _id: string;
  title: string;
  description: string;
  images: string[];
  slug: string;
  created_by: ICreatedBy;
  dateReview: string;
  hourReview: string;
  assignedTo: IAssignedTo;
  tags: string[];
  isAssigned: string;

  applicants: IApplicants[];

  // TODO: agregar createdAt y updatedAt
  createdAt: string;
  updatedAt: string;
}

export type ICreatedBy = {
  _id: string;
  name: string;
  number_col: string;
};
export type IAssignedTo = {
  _id: string;
  name: string;
  number_col: string;
};
export type IApplicants = {
  _id: string;
  name: string;
  number_col: string;
};

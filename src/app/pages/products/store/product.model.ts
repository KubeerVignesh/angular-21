export interface product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  createdBy:
    | {
        _id: string;
        name: string;
        email: string;
      }
    | string;
  createdAt: Date;
  updatedAt: Date;
}

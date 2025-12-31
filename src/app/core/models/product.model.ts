export interface Product {
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

export interface ProductResponse {
  success: boolean;
  message?: string;
  data: Product | Product[];
  count?: number;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  imageUrl?: string;
}

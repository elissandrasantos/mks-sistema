export interface Product {
    id: number;
    name: string;
    brand: string;
    description: string;
    price: number;
    quantity: number;
    photo: string;
}

export interface ProductResponse {
    products: Product[];
}

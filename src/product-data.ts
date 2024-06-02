export interface ProductData{
    id: number, 
    name: string,
    brand: string,
    description: string,
    price: number,
    quantity: number,
}

export interface ProductResponse {
    products: ProductData[]
}
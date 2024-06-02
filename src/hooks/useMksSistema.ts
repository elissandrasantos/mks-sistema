import { ProductResponse } from "@/product-data";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

const API_URL = 'https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=DESC'

const fetchData = async (): AxiosPromise<ProductResponse> => {
    const response = await axios.get<ProductResponse>(API_URL);
    return response;
}

export function useMksSistema(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['product-data']
    })

    return {
        ...query,
        data: query.data?.data
    };
}
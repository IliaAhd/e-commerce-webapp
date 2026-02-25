"use client";

import { fetchProducts } from "@/lib/fetchProducts";
import { ProductsResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export function useProductsQuery({
  id,
  sort,
  search,
  page,
  category,
  inStock,
}: {
  id?: string;
  sort?: string;
  search?: string;
  page?: string;
  category?: string;
  inStock?: boolean;
}) {
  return useQuery<ProductsResponse>({
    queryKey: ["products", sort, search, inStock, page, id, category],
    queryFn: () => fetchProducts({ sort, search, page, id, category }),
    select: (data) => {
      const newData = { ...data };

      if (inStock)
        return {
          ...newData,
          products: newData.products.filter((product) => product.stock > 0),
        };

      return newData;
    },
  });
}

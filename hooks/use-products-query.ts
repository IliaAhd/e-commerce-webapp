"use client";

import { fetchProducts } from "@/lib/fetchProducts";
import { Product, ProductsResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export function useProductsQuery({
  id,
  sort,
  search,
  page,
  category,
  inStock,
  min,
  max,
}: {
  id?: string;
  sort?: string;
  search?: string;
  page?: string;
  category?: string;
  inStock?: boolean;
  min?: number;
  max?: number;
}) {
  return useQuery<ProductsResponse>({
    queryKey: ["products", sort, search, inStock, page, id, category, min, max],
    queryFn: async () => {
      const data = await fetchProducts({ sort, search, page, id, category });

      const hasPriceFilter = min && max;

      if (!inStock && !hasPriceFilter) return data;

      const all = await fetchProducts({
        sort,
        search,
        page: "1",
        id,
        category,
        limit: data.total,
      });

      const totalFiltered = all.products.filter((p: Product) => {
        if (inStock && p.stock <= 0) return false;

        if (hasPriceFilter && (p.price < min || p.price > max)) return false;

        return true;
      }).length;

      return { ...data, total: totalFiltered };
    },
    select: (data) => {
      const newData = { ...data };

      const hasPriceFilter = min && max;

      let products = newData.products;

      if (inStock) products = products.filter((product) => product.stock > 0);

      if (hasPriceFilter)
        products = products.filter(
          (product) => product.price >= min && product.price <= max,
        );

      return {
        ...newData,
        products,
      };
    },
  });
}

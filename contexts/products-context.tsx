"use client";

import { useProductsParams } from "@/hooks/use-products-params";
import { useProductsQuery } from "@/hooks/use-products-query";
import { ProductsResponse } from "@/types/product";
import React, { createContext, useContext } from "react";

interface ProductsContextType {
  data?: ProductsResponse;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  params: ReturnType<typeof useProductsParams>;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const params = useProductsParams();
  const { data, isPending, isError, error, refetch } = useProductsQuery({
    search: params.search,
    inStock: params.inStock,
    category: params.category,
    page: params.page,
    sort: params.sort,
  });

  return (
    <ProductsContext.Provider
      value={{ data, isPending, isError, error, refetch, params }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const currentProductsContext = useContext(ProductsContext);

  if (!currentProductsContext)
    throw new Error("useProduct has to be used within ProductsProvider");

  return currentProductsContext;
}

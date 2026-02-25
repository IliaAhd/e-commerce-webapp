"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useProductsParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = (searchParams.get("sort") as string) ?? "newest";
  const search = searchParams.get("q") ?? "";
  const inStock = searchParams.get("inStock") === "true" ? true : false;
  const page = searchParams.get("page") ?? "1";
  const category = searchParams.get("category") ?? "";

  const params = new URLSearchParams(searchParams.toString());

  function updateParams(name: string, value: string) {
    params.set(name, value);
    router.push(`?${params.toString()}`);
  }

  function updateSort(sort: string) {
    updatePage(1);
    updateParams("sort", sort);
  }

  function updateSearch(search: string) {
    updateCategory("");
    updatePage(1);
    updateParams("q", search);
  }

  function updateInStock(inStock: boolean) {
    updatePage(1);
    updateParams("inStock", inStock.toString());
  }

  function updatePage(page: number) {
    updateParams("page", page.toString());
  }

  function updateCategory(category: string) {
    updateParams("category", category);
  }

  return {
    sort,
    updateSort,
    search,
    updateSearch,
    inStock,
    updateInStock,
    updatePage,
    page,
    category,
    updateCategory,
  };
}

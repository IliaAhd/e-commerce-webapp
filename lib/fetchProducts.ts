import { mapSortToParams } from "./utils";
import { LIMIT } from "./constants";

export async function fetchProducts({
  sort = "newest",
  search,
  page = "1",
  id,
  category,
  limit = LIMIT,
}: {
  sort?: string;
  search?: string;
  page?: string;
  id?: string;
  category?: string;
  limit?: number;
}) {
  const params = new URLSearchParams();

  const { sortBy, order } = mapSortToParams(sort);

  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);
  if (search) params.set("q", search);
  if (category === "all") category = "";

  const skip = (+page - 1) * limit;

  const baseUrl = "https://dummyjson.com/products";
  const limitParam = `&limit=${limit}&skip=${skip}`;

  let url;
  if (category) {
    url = `${baseUrl}/category/${category}?${params.toString()}${limitParam}`;
  } else if (id) {
    url = `${baseUrl}/${id}`;
  } else {
    url = `${baseUrl}${search && "/search"}?${params.toString()}${limitParam}`;
  }

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

import { mapSortToParams } from "./utils";
import { LIMIT } from "./constants";

export async function fetchProducts({
  sort = "newest",
  search,
  page = "1",
  id,
  category,
}: {
  sort?: string;
  search?: string;
  page?: string;
  id?: string;
  category?: string;
}) {
  const params = new URLSearchParams();

  const { sortBy, order } = mapSortToParams(sort);

  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);
  if (search) params.set("q", search);
  if (page) params.set("page", page);
  if (category === "all") category = "";

  const skip = (+page - 1) * LIMIT;

  const baseUrl = "https://dummyjson.com/products";
  const separator = baseUrl.includes("?") ? "&" : "?";
  const limit = `&limit=${LIMIT}&skip=${skip}`;

  let url;
  if (category)
    url = `${baseUrl}/category/${category}${separator}${params.toString()}${limit}`;
  else if (id) url = `${baseUrl}/${id}`;
  else
    url = `${baseUrl}${search && "/search"}${separator}${params.toString()}${limit}`;

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

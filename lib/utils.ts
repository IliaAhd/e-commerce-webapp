import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapSortToParams(sort: string) {
  if (sort === "newest")
    return {
      sortBy: "id",
      order: "desc",
    };

  if (sort === "lowest")
    return {
      sortBy: "price",
      order: "asc",
    };

  if (sort === "highest")
    return {
      sortBy: "price",
      order: "desc",
    };

  if (sort === "discount")
    return {
      sortBy: "discountPercentage",
      order: "desc",
    };

  return {};
}

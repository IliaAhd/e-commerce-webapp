"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useProducts } from "@/contexts/products-context";
import { LIMIT } from "@/lib/constants";

export function PaginationContainer({ total }: { total: number }) {
  const {
    params: { page, updatePage },
  } = useProducts();
  const totalPages = Math.ceil(total / LIMIT);
  const pages = generatePages(+page, totalPages);

  // This function is made by AI (pagination calculations)
  function generatePages(current: number, total: number) {
    const pages: (number | "dots")[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const showLeftDots = current > 4;
    const showRightDots = current < total - 3;

    pages.push(1);

    if (showLeftDots) {
      pages.push("dots");
    }

    const start = showLeftDots ? current - 1 : 2;
    const end = showRightDots ? current + 1 : total - 1;

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (showRightDots) {
      pages.push("dots");
    }

    pages.push(total);

    return pages;
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            text=""
            onClick={() => +page > 1 && updatePage(+page - 1)}
          />
        </PaginationItem>

        {pages.map((p, index) => (
          <PaginationItem key={index}>
            {p === "dots" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={p === +page}
                onClick={() => updatePage(p)}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            text=""
            onClick={() => +page < totalPages && updatePage(+page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

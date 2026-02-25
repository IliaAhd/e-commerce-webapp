"use client";

import { PaginationContainer } from "@/components/pagination-container";
import { ProductItem } from "@/components/product-item";
import { SkeletonCard } from "@/components/skeleton-card";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/products-context";

export default function Products() {
  const { data, isPending, isError, error, refetch } = useProducts();

  if (isError)
    return (
      <div className="space-y-3">
        <p>{(error as Error).message}!</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );

  if (data?.total === 0) return <p>No products found!</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isPending &&
          Array.from({ length: 8 }).map((_, key) => <SkeletonCard key={key} />)}

        {data?.products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

      <PaginationContainer total={data?.total || 0} />
    </>
  );
}

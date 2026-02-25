"use client";

import Discount from "@/components/discount";
import Price from "@/components/price";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useProductsQuery } from "@/hooks/use-products-query";
import { Product as ProductType } from "@/types/product";
import { BadgeCheck, CalendarArrowUp, Heart, Star, Truck } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isPending, isError, error } = useProductsQuery({ id });

  const product = data as ProductType | undefined;
  const checkInStock = product?.stock;
  const imageCount = product?.images.length || 0;

  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <div className="fixed top-0 left-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 h-dvh w-dvw md:p-4">
      <div className="bg-white p-6 md:rounded-xl relative w-full max-h-dvh overflow-y-auto md:w-4xl md:max-h-[90vh]">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="absolute top-3 right-3 z-50"
        >
          ✕
        </Button>
        {isPending ? (
          <Spinner className="size-12 mx-auto" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="relative md:h-98 aspect-square md:aspect-auto mx-auto bg-gray-50 rounded-xl">
                <Image
                  className="w-full object-cover"
                  src={product?.thumbnail || ""}
                  alt={product?.title || "Product Image"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-gray-500">{product?.category}</p>

              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">{product?.title}</h2>
                <Badge
                  className={`font-semibold! rounded-lg! text-sm! p-4! ${checkInStock ? "bg-green-100 text-emerald-500" : "bg-red-300 text-red-950"}`}
                >
                  {checkInStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Star
                  fill="oklch(87.9% 0.169 91.605)"
                  stroke="oklch(87.9% 0.169 91.605)"
                />
                <span className="text-gray-400 text-sm">
                  {product?.rating} | {product?.reviews.length} Reviews
                </span>
              </div>

              <p className="text-gray-400">{product?.description}</p>

              <Discount
                price={product?.price || 0}
                discountPercentage={product?.discountPercentage || 0}
                checkStock={Boolean(checkInStock)}
              />

              <Price
                price={product?.price}
                checkStock={Boolean(checkInStock)}
              />

              <div className="flex justify-between gap-4 my-6">
                <Button
                  className="flex-1 rounded-2xl p-6"
                  disabled={Boolean(!checkInStock)}
                >
                  ADD TO CART
                </Button>
                <Button
                  className="py-6 px-4 rounded-2xl border-black"
                  variant="outline"
                  disabled={Boolean(!checkInStock)}
                >
                  <Heart className="size-6 " />
                </Button>
              </div>
            </div>

            <div
              className={`gap-4 grid ${imageCount === 4 ? "grid-cols-4" : "grid-cols-3"}`}
            >
              {product?.images.map((img, i) => (
                <div
                  key={img}
                  className={`p-2 rounded-xl bg-gray-50 size-full relative aspect-square ${i === 0 && "border-2"}`}
                >
                  <Image
                    className="absolute size-full object-cover"
                    src={img}
                    alt={img}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                  />
                </div>
              ))}
            </div>

            <div>
              <ul className="border border-gray-100 rounded-xl p-4 text-sm space-y-3">
                <li className="flex items-center gap-3">
                  <Truck className="inline" /> Shipping Information:
                  <span className="text-gray-400">Sips in 2 weeks</span>
                </li>

                <li className="flex items-center gap-3">
                  <BadgeCheck className="inline" /> Warranty Information:
                  <span className="text-gray-400">3 years warranty</span>
                </li>

                <li className="flex items-center gap-3">
                  <CalendarArrowUp className="inline" /> Return Policy:
                  <span className="text-gray-400">7 days return policy</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

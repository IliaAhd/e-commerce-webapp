import Discount from "@/components/discount";
import Price from "@/components/price";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

export function ProductItem({ product }: { product: Product }) {
  const checkStock = product.stock > 0;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="mx-auto w-full pt-0">
        <div className="p-6">
          <div className="rounded-xl aspect-square relative bg-gray-50">
            <Image
              src={product.images[0]}
              alt={product.title}
              className={`absolute object-cover rounded-xl ${!checkStock && "grayscale-100"}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              priority
            />
          </div>
        </div>

        <CardHeader>
          <CardTitle
            className={`mb-6 text-xl truncate ${!checkStock && "line-through"}`}
          >
            {product.title}
          </CardTitle>

          <CardDescription>
            <Discount
              price={product.price}
              discountPercentage={product.discountPercentage}
              checkStock={checkStock}
            />
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Price price={product.price} checkStock={checkStock} />
        </CardFooter>
      </Card>
    </Link>
  );
}

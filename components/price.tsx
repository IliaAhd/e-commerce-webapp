export default function Price({
  price = 0,
  checkStock,
}: {
  price?: number;
  checkStock: boolean;
}) {
  return (
    <span className="text-3xl font-bold">
      {!checkStock ? "Out of Stock!" : `$ ${price}`}
    </span>
  );
}

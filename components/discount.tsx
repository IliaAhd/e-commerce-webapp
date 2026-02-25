export default function Discount({
  price,
  discountPercentage,
  checkStock,
}: {
  price: number;
  discountPercentage: number;
  checkStock?: boolean;
}) {
  return (
    <div
      className={`space-x-2 ${(!checkStock && "invisible") || (discountPercentage < 1 && "invisible")}`}
    >
      <span className="bg-black text-white px-1.5 py-1 rounded-md">
        {discountPercentage.toFixed()}%
      </span>
      <span className="line-through text-gray-400">
        {((price * (100 + discountPercentage)) / 100).toFixed(2)}
      </span>
    </div>
  );
}

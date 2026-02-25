import Filters from "@/components/filters";
import Products from "@/components/products";
import Search from "@/components/search";

export default function Page() {
  return (
    <>
      <Search />
      <Filters />
      <Products />
    </>
  );
}

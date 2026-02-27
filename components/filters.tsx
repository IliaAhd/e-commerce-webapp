"use client";

import Dropdown from "@/components/dropdown";
import { Select } from "@/components/select";
import { SliderControlled } from "@/components/slider-controlled";
import { Switch } from "@/components/ui/switch";
import { useProducts } from "@/contexts/products-context";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "lowest", label: "Lowest Price" },
  { value: "highest", label: "Highest Price" },
  { value: "discount", label: "Discount" },
];
const categoryOptions = [
  { value: "all", label: "All" },
  { value: "vehicle", label: "Vehicle" },
  { value: "laptops", label: "Laptops" },
  { value: "home-decoration", label: "Home decoration" },
  { value: "beauty", label: "Beauty" },
];

export default function Filters() {
  const {
    params: {
      sort,
      updateSort,
      updateInStock,
      inStock,
      category,
      updateCategory,
      updateSearch,
    },
  } = useProducts();

  return (
    <div className="flex items-center flex-col lg:flex-row justify-between gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full lg:w-fit">
        <Select
          placeholder="Sort"
          description="Select products to sort by:"
          value={sort}
          onChange={updateSort}
          options={sortOptions}
        />
        <Select
          placeholder="Category"
          description="Select products based on categories"
          value={category}
          onChange={(value) => {
            updateSearch("");
            return updateCategory(value);
          }}
          options={categoryOptions}
        />
        <Select
          placeholder="Brand"
          description="Select products based on brands"
          options={[
            { value: "iPhone", label: "iphone" },
            { value: "samsung", label: "Samsung" },
          ]}
          disabled
        />

        <Dropdown triggerTitle="Price" title="Filter by price range">
          <SliderControlled />
        </Dropdown>
      </div>

      <div className="flex items-center gap-4 mr-auto lg:mr-0">
        In Stock
        <Switch checked={inStock} onChange={() => updateInStock(!inStock)} />
      </div>
    </div>
  );
}

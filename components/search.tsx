"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useProducts } from "@/contexts/products-context";
import { SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const {
    data,
    isPending,
    params: { search, updateSearch },
  } = useProducts();

  const debouncedUpdateSearch = useDebouncedCallback((value: string) => {
    updateSearch(value);
  }, 1000);

  return (
    <div className="flex justify-between items-center gap-8">
      <div className="whitespace-nowrap flex items-center gap-2 w-28">
        <span>{isPending ? <Spinner /> : data?.total}</span>
        <span>Products</span>
      </div>

      <InputGroup className="bg-white p-6 rounded-xl border-none">
        <InputGroupInput
          defaultValue={search}
          onChange={(e) => debouncedUpdateSearch(e.target.value)}
          placeholder="Search product"
          className="text-base!"
        />
        <InputGroupAddon>
          <SearchIcon className="size-5" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

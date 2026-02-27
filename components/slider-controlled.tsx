"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Slider } from "@/components/ui/slider";
import { useProducts } from "@/contexts/products-context";
import { INPUT } from "@/lib/constants";

export function SliderControlled() {
  const {
    range,
    setRange,
    params: { updatePriceRange },
  } = useProducts();

  return (
    <div className="mx-auto grid  gap-3">
      <div className="flex items-center justify-between gap-2">
        <span>
          <InputGroup>
            <InputGroupInput
              value={range[0]}
              onChange={(e) => setRange((val) => [+e.target.value, val[1]])}
              placeholder="19"
            />
            <InputGroupAddon>$</InputGroupAddon>
          </InputGroup>
        </span>
        <span>
          <InputGroup>
            <InputGroupInput
              value={range[1]}
              onChange={(e) => setRange((val) => [val[0], +e.target.value])}
              placeholder="200"
            />
            <InputGroupAddon>$</InputGroupAddon>
          </InputGroup>
        </span>
      </div>
      <Slider
        id="slider-demo-temperature"
        value={range}
        onValueChange={setRange}
        onValueCommit={(val) => updatePriceRange(val[0], val[1])}
        min={INPUT[0]}
        max={INPUT[1]}
        step={1}
      />
    </div>
  );
}

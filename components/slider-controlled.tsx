"use client";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Slider } from "@/components/ui/slider";
import { INPUT } from "@/lib/constants";
import { useState } from "react";

export function SliderControlled() {
  const [value, setValue] = useState(INPUT);

  return (
    <div className="mx-auto grid  gap-3">
      <div className="flex items-center justify-between gap-2">
        <span>
          <InputGroup>
            <InputGroupInput
              value={value[0]}
              onChange={(e) => setValue((val) => [+e.target.value, val[1]])}
              placeholder="19"
            />
            <InputGroupAddon>$</InputGroupAddon>
          </InputGroup>
        </span>
        <span>
          <InputGroup>
            <InputGroupInput
              value={value[1]}
              onChange={(e) => setValue((val) => [val[0], +e.target.value])}
              placeholder="200"
            />
            <InputGroupAddon>$</InputGroupAddon>
          </InputGroup>
        </span>
      </div>
      <Slider
        id="slider-demo-temperature"
        value={value}
        onValueChange={setValue}
        min={INPUT[0]}
        max={INPUT[1]}
        step={1}
      />
    </div>
  );
}

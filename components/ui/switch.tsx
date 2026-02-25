"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Switch({
  checked,
  className,
  size = "default",
  onChange,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
  checked?: boolean;
  onChange?: () => void;
}) {
  return (
    <SwitchPrimitive.Root
      onCheckedChange={onChange}
      checked={checked}
      data-slot="switch"
      data-size={size}
      className={cn(
        "data-checked:bg-primary data-unchecked:bg-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 dark:data-unchecked:bg-input/80 shrink-0 rounded-full border border-transparent shadow-xs focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-[28px] data-[size=default]:w-[48px] data-[size=sm]:h-[24px] data-[size=sm]:w-[40px] peer group/switch relative inline-flex items-center transition-all outline-none after:absolute data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground rounded-full pointer-events-none block ring-0 transition-transform group-data-[size=default]/switch:h-[24px] group-data-[size=default]/switch:w-[24px] group-data-[size=sm]/switch:h-[18px] group-data-[size=sm]/switch:w-[18px] group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-4px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-3px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

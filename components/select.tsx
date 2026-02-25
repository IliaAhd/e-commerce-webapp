import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  Select as Selective,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";

export function Select({
  options,
  disabled,
  value,
  onChange,
  placeholder,
  className,
  description,
}: {
  options: { value: string; label: string }[];
  disabled?: boolean;
  value?: string;
  onChange?: (sort: string) => void;
  placeholder?: string;
  className?: string;
  description: string;
}) {
  return (
    <>
      <Selective onValueChange={(value) => onChange?.(value)} value={value}>
        <SelectTrigger
          className={`w-full lg:w-52 rounded-2xl h-13! text-base hidden md:flex ${className}`}
          disabled={disabled}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="w-52 rounded-2xl text-base">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Selective>

      <Drawer>
        <DrawerTrigger
          className={`border rounded-2xl p-3 text-start flex justify-between items-center md:hidden ${className}`}
        >
          <span>{placeholder}</span>
          <ChevronDown className="size-4" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{placeholder}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <RadioGroup
              className="justify-center pb-5"
              defaultValue="option-one"
              value={value}
              onValueChange={(value) => onChange?.(value)}
            >
              {options?.map((option) => (
                <div className="flex items-center gap-3" key={option.value}>
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
            <Separator />
            <DrawerClose>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

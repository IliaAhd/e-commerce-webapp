import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function Dropdown({
  title,
  triggerTitle,
  children,
}: {
  title: string;
  triggerTitle: string;
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent rounded-2xl h-13! border flex justify-between items-center px-3">
        {triggerTitle}
        <ChevronDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-3 py-8">
        <DropdownMenuGroup className="space-y-3">
          <DropdownMenuLabel>{title}</DropdownMenuLabel>
          {children}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

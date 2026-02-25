import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <Card className="w-fulls space-y-4">
      <CardHeader>
        <Skeleton className="aspect-square w-full" />
      </CardHeader>
      <CardContent className="space-y-8">
        <Skeleton className="h-8 w-2/3" />
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </CardContent>
    </Card>
  );
}

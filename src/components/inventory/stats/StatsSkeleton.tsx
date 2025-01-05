import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const StatsSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <Card key={i}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-[100px]" />
        </CardContent>
      </Card>
    ))}
  </div>
);
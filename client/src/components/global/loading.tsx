import React from "react";
import { Skeleton } from "../ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[270px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[220px]" />
    </div>
  );
};

export default Loading;

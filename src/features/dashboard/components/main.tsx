import { cn } from "@/shared/lib/utils";
import React from "react";

function Main({
  className,
  ...props
}: React.ComponentProps<"div"> & { className?: string }) {
  return <div className={cn("flex-1 bg-red-500f", className)} {...props}></div>;
}

export default Main;

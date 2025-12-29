import React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../ui_op/utils"; // aapka utility function for classNames

function Avatar(props) {
  const { className, ...rest } = props;
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...rest}
    />
  );
}

function AvatarImage(props) {
  const { className, ...rest } = props;
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...rest}
    />
  );
}

function AvatarFallback(props) {
  const { className, ...rest } = props;
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...rest}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };

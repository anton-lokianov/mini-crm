import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const CallAction = () => {
  return (
    <SheetContent side="bottom" className="h-[27rem]">
      <SheetHeader>
        <SheetTitle className="text-center">Actions</SheetTitle>
      </SheetHeader>
    </SheetContent>
  );
};

export default CallAction;

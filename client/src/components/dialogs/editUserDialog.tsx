import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import EditUserForm from "../forms/editUserForm";

const EditUserDialog = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleDialogToggle = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <Dialog open={isToggled} onOpenChange={handleDialogToggle}>
      <DialogTrigger asChild>
        <Button className="absolute top-2 right-2" size="sm" variant="outline">
          Edit user
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full h-[calc(100%-50px)] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
          <DialogDescription>
            Make changes to your user here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditUserForm toggleDialog={handleDialogToggle} />
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;

import React from "react";

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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute top-2 right-2" size="sm" variant="outline">
          Edit user
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
          <DialogDescription>
            Make changes to your user here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditUserForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;

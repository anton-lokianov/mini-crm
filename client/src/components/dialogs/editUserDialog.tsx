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
import EditUserForm from "../forms/editUserForm";

const EditUserDialog = () => {
  return (
    <DialogContent className="max-w-lg w-full h-[calc(100%-100px)] overflow-auto">
      <DialogHeader>
        <DialogTitle>Edit user</DialogTitle>
        <DialogDescription>
          Make changes to your user here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <EditUserForm />
    </DialogContent>
  );
};

export default EditUserDialog;

import React from "react";
import { useModalStore } from "@/service/store/modal-store";
import { Dialog } from "../ui/dialog";
import { Sheet } from "../ui/sheet";
import { AlertDialog } from "../ui/alert-dialog";

const CustomModal = () => {
  const { modal, modalType, isOpen, closeModal } = useModalStore();

  if (!isOpen) return null;

  const renderModalContent = () => {
    switch (modalType) {
      case "dialog":
        return (
          <Dialog open={isOpen} onOpenChange={() => closeModal()}>
            {modal}
          </Dialog>
        );
      case "sheet":
        return (
          <Sheet open={isOpen} onOpenChange={() => closeModal()}>
            {modal}
          </Sheet>
        );
      case "alertDialog":
        return (
          <AlertDialog open={isOpen} onOpenChange={() => closeModal()}>
            {modal}
          </AlertDialog>
        );
      default:
        return null;
    }
  };

  return renderModalContent();
};

export default CustomModal;

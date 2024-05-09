import { useUIOverlayStore } from "@/service/store/UIOverlay-store";
import { Dialog } from "../ui/dialog";
import { Sheet } from "../ui/sheet";
import { AlertDialog } from "../ui/alert-dialog";

const CustomUIOverlay = () => {
  const { overlay, overlayType, isOpen, closeOverlay } = useUIOverlayStore(
    (state) => state
  );

  const renderModalContent = () => {
    switch (overlayType) {
      case "dialog":
        return (
          <Dialog open={isOpen} onOpenChange={closeOverlay}>
            {overlay}
          </Dialog>
        );
      case "sheet":
        return (
          <Sheet open={isOpen} onOpenChange={closeOverlay}>
            {overlay}
          </Sheet>
        );
      case "alertDialog":
        return (
          <AlertDialog open={isOpen} onOpenChange={closeOverlay}>
            {overlay}
          </AlertDialog>
        );
      default:
        return null;
    }
  };

  return renderModalContent();
};

export default CustomUIOverlay;

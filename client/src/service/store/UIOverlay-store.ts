import { create } from "zustand";

type OverlayType = "dialog" | "sheet" | "alertDialog";

type InitialState = {
  overlay: React.ReactNode | null;
  overlayType: OverlayType | null;
  isOpen: boolean;
};

type UIOverlayAction = {
  openOverlay: (content: React.ReactNode, type: OverlayType) => void;
  closeOverlay: () => void;
};

type UIOverlayStore = InitialState & UIOverlayAction;

export const useUIOverlayStore = create<UIOverlayStore>((set) => ({
  overlay: null,
  overlayType: null,
  isOpen: false,
  openOverlay: (content, type) => {
    set(() => ({
      overlay: content,
      overlayType: type,
      isOpen: true,
    }));
  },
  closeOverlay: () => {
    set(() => ({
      isOpen: false,
    }));
  },
}));

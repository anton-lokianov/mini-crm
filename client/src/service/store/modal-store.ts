import { create } from "zustand";

type ModalType = "dialog" | "sheet" | "alertDialog";

type SheetSide = "left" | "right" | "top" | "bottom";

type InitialState = {
  modal: React.ReactNode | null;
  modalType: ModalType | null;
  isOpen: boolean;
};

type ModalAction = {
  openModal: (content: React.ReactNode, type: ModalType) => void;
  closeModal: () => void;
};

type ModalStore = InitialState & ModalAction;

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  modalType: null,
  isOpen: false,
  openModal: (content, type) => {
    set(() => ({
      modal: content,
      modalType: type,
      isOpen: true,
    }));
  },
  closeModal: () => {
    set(() => ({
      modal: null,
      modalType: null,
      isOpen: false,
    }));
  },
}));

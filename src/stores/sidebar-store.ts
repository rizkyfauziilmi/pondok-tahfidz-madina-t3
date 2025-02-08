import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  toggleOpen: () => void;
  setIsOpen: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsOpen: (value) => set({ isOpen: value }),
}));

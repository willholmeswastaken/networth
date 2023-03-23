// dialogStore.ts
import { create } from "zustand";
import { type StateCreator } from "zustand/vanilla";

type Dialogs = "add-item";

type DialogState = {
  dialogs: Record<string, boolean>;
  openDialog: (id: Dialogs) => void;
  closeDialog: (id: Dialogs) => void;
  toggleDialog: (id: Dialogs) => void;
};

const dialogStore: StateCreator<DialogState> = (set) => ({
  dialogs: {},
  openDialog: (id: Dialogs) =>
    set((state) => ({ dialogs: { ...state.dialogs, [id]: true } })),
  closeDialog: (id: Dialogs) =>
    set((state) => ({ dialogs: { ...state.dialogs, [id]: false } })),
  toggleDialog: (id: Dialogs) =>
    set((state) => ({
      dialogs: { ...state.dialogs, [id]: !state.dialogs[id] },
    })),
});

const useDialogStore = create<DialogState>(dialogStore);

export default useDialogStore;

import { createContext, useState, useContext, useEffect } from "react";
import { useLocalStorage } from "react-use";
export const MediaKitModalContext = createContext();
export function MediaKitModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <MediaKitModalContext.Provider
      value={{
        open,
        openModal,
        closeModal,
      }}
    >
      {children}
    </MediaKitModalContext.Provider>
  );
}

export default function useMediaKitModal() {
  return useContext(MediaKitModalContext);
}

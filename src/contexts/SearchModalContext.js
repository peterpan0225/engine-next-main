import { createContext, useState, useContext } from "react";
export const SearchModalContext = createContext();
export function SearchModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <SearchModalContext.Provider
      value={{
        open,
        openModal,
        closeModal,
        disabled,
        setDisabled,
      }}
    >
      {children}
    </SearchModalContext.Provider>
  );
}

export default function useSearchModal() {
  return useContext(SearchModalContext);
}

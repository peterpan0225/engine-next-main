import { createContext, useState, useContext } from "react";
export const LoginModalContext = createContext();
export function LoginModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    // Timeout to prevent the instant change (because the modal fades out when it closes)
    setTimeout(() => {
      setMode(null);
    }, 200);
  };
  return (
    <LoginModalContext.Provider
      value={{
        open,
        openModal,
        closeModal,
        mode,
        setMode,
      }}
    >
      {children}
    </LoginModalContext.Provider>
  );
}

export default function useModal() {
  return useContext(LoginModalContext);
}

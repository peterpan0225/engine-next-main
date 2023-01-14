import { createContext, useState, useContext, useEffect } from "react";
import { useLocalStorage } from "react-use";
export const EmailSignupModalContext = createContext();
export function EmailSignupModalProvider({ children }) {
  const [modalInfo, setModalInfo] = useLocalStorage("signupModal", null);

  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    const modalShowedDate = modalInfo?.date ?? new Date();
    const diffTime = Math.abs(new Date(modalShowedDate) - new Date());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 30) {
      setModalInfo({
        showed: false,
        date: new Date(),
      });
    }
  }, []);
  return (
    <EmailSignupModalContext.Provider
      value={{
        open,
        openModal,
        closeModal,
        modalInfo,
        setModalInfo,
      }}
    >
      {children}
    </EmailSignupModalContext.Provider>
  );
}

export default function useEmailSignupModal() {
  return useContext(EmailSignupModalContext);
}

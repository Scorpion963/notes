"use client";
import { createContext, SetStateAction, useContext, useState } from "react";
import Button, { ButtonProps } from "./Button";

type ModalProps = {
  defaultOpen?: boolean;
  children: React.ReactNode;
};

type ModalContextProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextProps | null>(null);

export function useModal() {
  const values = useContext(ModalContext);

  if (values === null)
    throw new Error("useModal must be used inside the Modal component");

  return values;
}

export function Modal({ defaultOpen = false, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function Overlay() {
  return <div className="bg-black/50 fixed inset-0" />;
}

export function ModalContent({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useModal();

  return (
    isOpen && (
      <>
        <Overlay />
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center"
        >
          <div onClick={e => e.stopPropagation()}>
            {children}
          </div>
        </div>
      </>
    )
  );
}

export function ModalTriggerButton({
  children,
  ...props
}: { children: React.ReactNode } & ButtonProps) {
  const { setIsOpen } = useModal();

  return (
    <Button onClick={() => setIsOpen(true)} {...props}>
      {children}
    </Button>
  );
}

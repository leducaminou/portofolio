"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "project-form" | "confirm-delete" | null;

interface ModalContextType {
  isOpen: boolean;
  type: ModalType;
  data: any;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<ModalType>(null);
  const [data, setData] = useState<any>(null);

  const openModal = (type: ModalType, data: any = null) => {
    setType(type);
    setData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setType(null);
      setData(null);
    }, 300); // Wait for animation
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, type, data, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

// components/Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-[550px] w-auto  mb-5 p-6 rounded-lg bg-gray-200 shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          ✖️
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

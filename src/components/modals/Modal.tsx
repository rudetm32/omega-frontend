interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl"
        aria-label="Cerrar modal"
      >
        ✖️
      </button>

      {children}
    </div>
  );
};

export default Modal;

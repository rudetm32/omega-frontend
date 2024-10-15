import React, { useState } from "react";
import Modal from "./Modal";
import RegisterCompany from "../forms/RegisterCompany"; 
import RegisterUser from "../forms/RegisterUser";
import RegisterVehicles from "../forms/RegisterVehicles";

import styles from "./styles/modal.module.css"

const ParentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<"company" | "user" |"unidades"| null>(null);

  const openModal = (modalType: "company" | "user" | "unidades") => {
    setCurrentModal(modalType);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentModal(null);
  };

  return (
    <div>
      {/* Botones para abrir los modales */}
      <button onClick={() => openModal("company")} className={styles.btnModal}>
        Compañía
      </button>
      <button onClick={() => openModal("user")} className={styles.btnModal}>
        Usuario
      </button>
      <button onClick={() => openModal("unidades")} className={styles.btnModal}>
        Unidades
      </button>

      {/* Modal reutilizable */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {/* Renderizamos el contenido correspondiente según el modal actual */}
        {currentModal === "company" && <RegisterCompany onClose={closeModal} />}
        {currentModal === "user" && <RegisterUser onClose={closeModal} />}
      </Modal>
    </div>
  );
};

export default ParentModal;

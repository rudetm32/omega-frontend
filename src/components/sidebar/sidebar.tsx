import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import styles from "../../app/dashboard/dashboard.module.css";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false); // Cerrar el sidebar

  return (
    <aside>
      {/* Menú hamburguesa solo visible en pantallas pequeñas */}
      <div className="md:hidden flex justify-between items-center bg-gray-800 p-4">
        <h1 className="text-white text-lg">Dashboard</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar principal */}
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-gray-800 text-white fixed top-16 md:top-0 md:h-screen p-4 transition-all duration-300 ease-in-out`}
      >
        <ul>
          <li className="mb-4">
            <a href="#zona-registros" onClick={handleClose} className={styles.asideDash}>
              Registros
            </a>
          </li>
          <li className="mb-4">
            <a href="#" onClick={handleClose} className={styles.asideDash}>
              Usuarios
            </a>
          </li>
          <li className="mb-4">
            <a href="#" onClick={handleClose} className={styles.asideDash}>
              Vehículos
            </a>
          </li>
          <li>
            <a href="/login" onClick={handleClose} className={styles.asideDash}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

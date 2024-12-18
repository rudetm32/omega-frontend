import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useCompanyContext } from "@/context/CompanyContext";

import styles from "./styles/form.module.css";

interface FormData {
  id: number;
  name: string;
  email: string;
  telephone: string;
  contactName: string;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface RegisterCompanyProps {
  onClose: () => void;
}

const RegisterCompany: React.FC<RegisterCompanyProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { addCompany } = useCompanyContext();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Datos del formulario:", data);
      await addCompany(data);
      await Swal.fire({
        title: "¡Alta Exitosa!",
        text: `Compañía: ${data.name}`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      onClose();
    } catch (error) {
      console.error("Error al añadir la compañía:", error);
      await Swal.fire({
        title: "Error",
        text: "Hubo un problema al registrar la compañía. Por favor, intenta nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.containerForm}>
        <h1 className={styles.h1Form}>Registro de Compañía</h1>
        <div className={styles.gridForm}>
          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="name">
              Nombre de la Compañía
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "El nombre es requerido" })}
              placeholder="Nombre de la Compañía"
              className={`p-2 border rounded ${
                errors.name ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="nameContact">
              Nombre del Contacto
            </label>
            <input
              type="text"
              id="contactName"
              {...register("contactName", {
                required: "El nombre del contacto es requerido",
              })}
              placeholder="Nombre del Contacto"
              className={`p-2 border rounded ${
                errors.contactName ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            {errors.contactName && (
              <span className="text-red-800 text-sm mt-1">
                {errors.contactName.message}
              </span>
            )}
          </div>

          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "El correo electrónico es requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "El formato del correo es inválido",
                },
              })}
              placeholder="Correo Electrónico"
              className={`p-2 border rounded ${
                errors.email ? "border-red-800" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="telephone">
              Teléfono
            </label>
            <input
              type="tel"
              id="telephone"
              {...register("telephone", {
                required: "El teléfono es requerido",
              })}
              placeholder="Teléfono"
              className={`p-2 border rounded ${
                errors.telephone ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            {errors.telephone && (
              <span className={styles.errorText}>
                {errors.telephone.message}
              </span>
            )}
          </div>
        </div>

        <h2 className={styles.h2Form}>Dirección</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="street">
              Calle
            </label>
            <input
              type="text"
              id="street"
              {...register("address.street", {
                required: "La calle es requerida",
              })}
              placeholder="Calle"
              className={`p-2 border rounded ${
                errors.address?.street ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            {errors.address?.street && (
              <span className={styles.errorText}>
                {errors.address.street.message}
              </span>
            )}
          </div>

          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="number">
              Número
            </label>
            <input
              type="text"
              id="number"
              {...register("address.number", {
                required: "El número es requerido",
              })}
              placeholder="Número"
              className={`p-2 border rounded ${
                errors.address?.number ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            {errors.address?.number && (
              <span className={styles.errorText}>
                {errors.address.number.message}
              </span>
            )}
          </div>

          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="city">
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              {...register("address.city", {
                required: "La ciudad es requerida",
              })}
              placeholder="Ciudad"
              className={`p-2 border rounded ${
                errors.address?.city ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            {errors.address?.city && (
              <span className={styles.errorText}>
                {errors.address.city.message}
              </span>
            )}
          </div>

          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="state">
              Estado
            </label>
            <input
              type="text"
              id="state"
              {...register("address.state", {
                required: "El estado es requerido",
              })}
              placeholder="Estado"
              className={`p-2 border rounded ${
                errors.address?.state ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            {errors.address?.state && (
              <span className={styles.errorText}>
                {errors.address.state.message}
              </span>
            )}
          </div>

          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="zipCode">
              Código Postal
            </label>
            <input
              type="text"
              id="zipCode"
              {...register("address.zipCode", {
                required: "El código postal es requerido",
              })}
              placeholder="Código Postal"
              className={`p-2 border rounded ${
                errors.address?.zipCode ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            {errors.address?.zipCode && (
              <span className={styles.errorText}>
                {errors.address.zipCode.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button type="submit" className={styles.btnForm}>
            Registrar Compañía
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCompany;


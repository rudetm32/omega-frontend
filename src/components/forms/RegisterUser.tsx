import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useCompanyContext } from "../../context/CompanyContext";
import {
  validatePassword,
  validateUsername,
  validateEmail,
  validatePhone,
  validateConfirmPassword,
  validateName,
  validateLastName,
} from "../../middlewares/validations";

import styles from "./styles/form.module.css";

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  telephone: string;
  rol: string;
  company: number;
  password: string;
  confirmPassword: string;
}

interface RegisterUserProps {
  onClose: () => void;
}

const RegisterUser: React.FC<RegisterUserProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const { companies } = useCompanyContext();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const onSubmit = async (data: FormData) => {
    const postData = {
      companyId: Number(data.company),
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      rol: data.rol,
      telephone: data.telephone,
      password: data.password,
    };
    try {
      const response = await fetch("http://localhost:8080/user/create", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error en la creación del usuario");
      }

      await Swal.fire({
        title: "¡Alta Exitosa!",
        text: `Usuario, ${data.firstName} ${data.lastName}`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      onClose();
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      await Swal.fire({
        title: "Error",
        text: "No se pudo registrar el usuario. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    onClose();
  };

  const password = watch("password");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.containerForm}>
        <h1 className={styles.h1Form}>Registro de Usuario</h1>
        <div className={styles.gridForm}>
          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="firstName">
              Nombre
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { validate: validateName })}
              placeholder="Ingrese su nombre"
              className={`p-2 border rounded ${
                errors.firstName ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            <span className={styles.errorText}>
              {errors.firstName?.message}
            </span>
          </div>

          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="lastName">
              Apellido
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { validate: validateLastName })}
              placeholder="Ingrese su apellido"
              className={`p-2 border rounded ${
                errors.lastName ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            <span className={styles.errorText}>{errors.lastName?.message}</span>
          </div>

          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="username">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { validate: validateUsername })}
              placeholder="Ingrese un nombre de usuario"
              className={`p-2 border rounded ${
                errors.username ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            <span className={styles.errorText}>{errors.username?.message}</span>
          </div>

          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { validate: validateEmail })}
              placeholder="Ingrese su email"
              className={`p-2 border rounded ${
                errors.email ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            <span className={styles.errorText}>{errors.email?.message}</span>
          </div>

          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="telephone">
              Teléfono
            </label>
            <input
              type="text"
              id="telephone"
              {...register("telephone", { validate: validatePhone })}
              placeholder="Número de teléfono"
              className={`p-2 border rounded ${
                errors.telephone ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            <span className={styles.errorText}>
              {errors.telephone?.message}
            </span>
          </div>

          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="company">
              Empresa
            </label>
            <select
              id="company"
              {...register("company", { required: "Seleccione una empresa" })}
              className={`p-2 border rounded ${
                errors.company ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            >
              <option disabled>Seleccione una empresa</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            <span className={styles.errorText}>{errors.company?.message}</span>
          </div>

          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="rol">
              Rol
            </label>
            <select
              id="rol"
              {...register("rol", { required: "Seleccione un rol" })}
              className={`p-2 border rounded ${
                errors.rol ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            >
              <option disabled>Seleccione un rol</option>
              <option value="USUARIO">Usuario</option>
              <option value="ADMIN">Administrador</option>
            </select>
            <span className={styles.errorText}>{errors.rol?.message}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { validate: validatePassword })}
              placeholder="Ingrese una contraseña"
              className={`p-2 border rounded ${
                errors.password ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            <span className={styles.errorText}>{errors.password?.message}</span>
          </div>

          <div className={styles.flexLabel}>
            <label className={styles.labelText} htmlFor="confirmPassword">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                validate: validateConfirmPassword(password),
              })}
              placeholder="Confirmar contraseña"
              className={`p-2 border rounded ${
                errors.confirmPassword ? "border-red-600" : "border-gray-300"
              } focus:outline-none focus:ring`}
            />
            <span className={styles.errorText}>
              {errors.confirmPassword?.message}
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button type="submit" className={styles.btnForm}>
            Registrar Usuario
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;

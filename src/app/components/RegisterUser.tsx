import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useCompanyContext } from "../context/CompanyContext";
import { validatePassword, validateUsername, validateEmail, validatePhone, validateConfirmPassword, validateName, validateLastName } from "../utils/validations";

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  telephone: string;
  rol: string;
  company: number; // Asegúrate de que esto sea un número
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
  const onSubmit = async (data: FormData) => {
    const postData = {
      companyId: Number(data.company), // Solo necesitas el ID de la empresa
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      rol: data.rol,
      telephone: data.telephone,
      password: data.password,
    };

    console.log("Datos enviados al backend:", JSON.stringify(postData, null, 2));

    try {
      const response = await fetch("http://localhost:8080/user/create", {
        method: "POST",
        body: JSON.stringify(postData), // Aquí enviamos el postData
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
  };

  const password = watch("password");

  return (
    <div className="flex items-center justify-center min-h-screen max-w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3/4 bg-white p-6 rounded-lg shadow-xl"
      >CGBX
        <h1 className="text-3xl font-bold mb-8 text-center">Registro de Usuario</h1>

        <div className="grid grid-cols-4 gap-4 mb-4">
          {/* Campo de Nombre */}
          <div className="flex flex-col">
            <label className="block mb-1 font-medium" htmlFor="firstName">
              Nombre
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { validate: validateName })}
              placeholder="Ingrese su nombre"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <span className="text-red-500 mt-1 min-h-[20px]">{errors.firstName?.message}</span>
          </div>

          {/* Campo de Apellido */}
          <div className="flex flex-col">
            <label className="block mb-1 font-medium" htmlFor="lastName">
              Apellido
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { validate: validateLastName })}
              placeholder="Ingrese su apellido"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <span className="text-red-500 mt-1 min-h-[20px]">{errors.lastName?.message}</span>
          </div>

          {/* Campo de Nombre de Usuario */}
          <div className="flex flex-col">
            <label className="block mb-1 font-medium" htmlFor="username">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { validate: validateUsername })}
              placeholder="Ingrese un nombre de usuario"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <span className="text-red-500 mt-1 min-h-[20px]">{errors.username?.message}</span>
          </div>

          {/* Campo de Email */}
          <div className="flex flex-col">
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { validate: validateEmail })}
              placeholder="Ingrese su email"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <span className="text-red-500 mt-1 min-h-[20px]">{errors.email?.message}</span>
          </div>

          {/* Campo de Teléfono */}
          <div className="flex flex-col">
            <label className="block mb-1 font-medium" htmlFor="telephone">
              Teléfono
            </label>
            <input
              type="text"
              id="telephone"
              {...register("telephone", { validate: validatePhone })}
              placeholder="Ingrese su número de teléfono"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <span className="text-red-500 mt-1 min-h-[20px]">{errors.telephone?.message}</span>
          </div>

          {/* Campo de Empresa */}
          <div className="flex flex-col">
            <label className="block mb-1 font-medium" htmlFor="company">
              Empresa
            </label>
            <select
              id="company"
              {...register("company", { required: "Seleccione una empresa" })} // Validación para seleccionar una empresa
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Seleccione una empresa</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>
                  {company.name} {/* Esto es lo que el usuario verá */}
                </option>
              ))}
            </select>
            <span className="text-red-500 mt-1 min-h-[20px]">{errors.company?.message}</span>
          </div>

          {/* Campo de Rol */}
          <div className="flex flex-col">
            <label className="block mb-1 font-medium" htmlFor="rol">
              Rol
            </label>
            <select
              id="rol"
              {...register("rol", { required: "Seleccione un rol" })}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Seleccione un rol</option>
              <option value="USUARIO">Usuario</option>
              <option value="ADMIN">Administrador</option>
            </select>
            <span className="text-red-500 mt-1 min-h-[20px]">{errors.rol?.message}</span>
          </div>

          {/* Campo de Contraseña */}
          <div className="flex flex-col">
            <label className="block mb-1 font-medium" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { validate: validatePassword })}
              placeholder="Ingrese una contraseña"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <span className="text-red-500 mt-1 min-h-[20px]">{errors.password?.message}</span>
          </div>

          {/* Campo de Confirmar Contraseña */}
          <div className="flex flex-col">
            <label className="block mb-1 font-medium" htmlFor="confirmPassword">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                validate: (value) => validateConfirmPassword(password, value),
              })}
              placeholder="Confirme su contraseña"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <span className="text-red-500 mt-1 min-h-[20px]">{errors.confirmPassword?.message}</span>
          </div>
        </div>

        {/* Botón de enviar */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="flex-none w-48 bg-gray-800 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;

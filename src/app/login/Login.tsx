"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import logo from "../images/logo1.png";

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const { username, password } = data;
    if (username === "admin" && password === "123456") {
      Swal.fire({
        title: "¡Éxito!",
        text: "Inicio de sesión como administrador exitoso.",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        router.push("/dashboard");
      });
    } else if (username === "usuario" && password === "123456") {
      Swal.fire({
        title: "¡Éxito!",
        text: "Inicio de sesión exitoso.",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        router.push("/");
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Nombre de usuario o contraseña incorrectos",
        icon: "error",
        confirmButtonText: "Reintentar",
      });
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen max-w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-128 bg-white p-6 rounded-lg shadow-xl">
        {/* Agregar el logo aquí */}
        <div className="flex justify-center mb-4">
          <Image
            src={logo}
            alt="Logo"
            className="object-contain h-auto w-32"
            priority // Marca la imagen como de alta prioridad para la carga
          />
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">
          Inicio de sesión
        </h1>

        <div className="mb-6">
          <div className="flex flex-col mb-4">
            <label className="block mb-1 font-medium" htmlFor="username">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "El nombre de usuario es requerido",
              })} // Registro del campo
              placeholder="username"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.username && (
              <span className="text-red-800 font-bold text-xs mt-2">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="block mb-1 font-medium" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "La contraseña es requerida",
              })} // Registro del campo
              autoComplete="current-password"
              placeholder="password"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.password && (
              <span className="text-red-800 font-bold text-xs mt-2">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          <button
            type="submit"
            className="flex-none w-48 bg-gray-800 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Enviar
          </button>
          <button
            type="button"
            className="flex-none w-48 bg-gray-800 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Olvidó su contraseña
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

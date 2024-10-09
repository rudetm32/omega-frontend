import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useCompanyContext } from "../context/CompanyContext";

interface FormData {
id:number;
  name: string;
  email: string;
  telephone: string;
  nameContact: string;
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

  const onSubmit = async (data: FormData) => {
    addCompany(data);
    await Swal.fire({
      title: "¡Alta Exitosa!",
      text: `Compañía: ${data.name}`,
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    onClose();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-xl overflow-y-auto max-h-[80vh]">
        <h1 className="text-3xl font-bold mb-8 text-center">Registro de Compañía</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium" htmlFor="name">
                Nombre de la Compañía
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "El nombre es requerido" })}
                placeholder="Nombre de la Compañía"
                className={`p-2 border rounded w-full ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring`}
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium" htmlFor="email">
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
                className={`p-2 border rounded w-full ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring`}
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
          </div>

          {/* Telephone and NameContact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium" htmlFor="telephone">
                Teléfono
              </label>
              <input
                type="tel"
                id="telephone"
                {...register("telephone", { required: "El teléfono es requerido" })}
                placeholder="Teléfono"
                className={`p-2 border rounded w-full ${errors.telephone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring`}
              />
              {errors.telephone && <span className="text-red-500">{errors.telephone.message}</span>}
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="nameContact">
                Nombre del Contacto
              </label>
              <input
                type="text"
                id="nameContact"
                {...register("nameContact", { required: "El nombre del contacto es requerido" })}
                placeholder="Nombre del Contacto"
                className={`p-2 border rounded w-full ${errors.nameContact ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring`}
              />
              {errors.nameContact && <span className="text-red-500">{errors.nameContact.message}</span>}
            </div>
          </div>

          {/* Address */}
          <h2 className="text-xl font-semibold mt-6">Dirección</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium" htmlFor="street">
                Calle
              </label>
              <input
                type="text"
                id="street"
                {...register("address.street", { required: "La calle es requerida" })}
                placeholder="Calle"
                className={`p-2 border rounded w-full ${errors.address?.street ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring`}
              />
              {errors.address?.street && <span className="text-red-500">{errors.address.street.message}</span>}
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="number">
                Número
              </label>
              <input
                type="text"
                id="number"
                {...register("address.number", { required: "El número es requerido" })}
                placeholder="Número"
                className={`p-2 border rounded w-full ${errors.address?.number ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring`}
              />
              {errors.address?.number && <span className="text-red-500">{errors.address.number.message}</span>}
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="city">
                Ciudad
              </label>
              <input
                type="text"
                id="city"
                {...register("address.city", { required: "La ciudad es requerida" })}
                placeholder="Ciudad"
                className={`p-2 border rounded w-full ${errors.address?.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring`}
              />
              {errors.address?.city && <span className="text-red-500">{errors.address.city.message}</span>}
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="state">
                Estado
              </label>
              <input
                type="text"
                id="state"
                {...register("address.state", { required: "El estado es requerido" })}
                placeholder="Estado"
                className={`p-2 border rounded w-full ${errors.address?.state ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring`}
              />
              {errors.address?.state && <span className="text-red-500">{errors.address.state.message}</span>}
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="zipCode">
                Código Postal
              </label>
              <input
                type="text"
                id="zipCode"
                {...register("address.zipCode", { required: "El código postal es requerido" })}
                placeholder="Código Postal"
                className={`p-2 border rounded w-full ${errors.address?.zipCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring`}
              />
              {errors.address?.zipCode && <span className="text-red-500">{errors.address.zipCode.message}</span>}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-48 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCompany;

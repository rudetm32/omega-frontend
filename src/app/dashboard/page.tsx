"use client";

import React from "react";
import { useUserContext } from "../../context/UserContext";
import { useCompanyContext } from "../../context/CompanyContext";
import ParentModal from "../../components/modals/ParentModal";



const Dashboard: React.FC = () => {
  const { users } = useUserContext();
  const { companies } = useCompanyContext();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-gray-800 text-white h-16 md:h-auto md:min-h-screen p-4">
        <nav>
          <ul>
            <li className="mb-4">
              <a
                href="#zona-registros"
                className="block p-2 rounded hover:bg-gray-700"
              >
                Registros
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="block p-2 rounded hover:bg-gray-700">
                Usuarios
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="block p-2 rounded hover:bg-gray-700">
                Vehiculos
              </a>
            </li>
            <li>
              <a href="/login" className="block p-2 rounded hover:bg-gray-700">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Mesa de control</h1>
          <p className="text-gray-600">
            Gestiona usuarios y unidades registradas
          </p>
        </header>

        <section id="zona-registros" className="mb-8">
          <h2 className="text-xl font-bold mb-4">Altas</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ParentModal />
          </div>
        </section>

        <section className="mb-8 ">
          <h2 className="text-xl font-bold mb-4">Compañias</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Telefono</th>
                  <th className="px-4 py-2">Domicilio</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{company.id}</td>
                    <td className="px-4 py-2">{company.name}</td>
                    <td className="px-4 py-2">{company.telephone}</td>
                    <td className="px-4 py-2">{company.address.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Sección de Usuarios */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Usuarios</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Mostrar lista de usuarios */}
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Apellido</th>
                  <th className="px-4 py-2">Usuario</th>
                  <th className="px-4 py-2">Correo Electrónico</th>
                  <th className="px-4 py-2">Compañia</th>
                </tr>
              </thead>
              <tbody>
                {users.map((usuario, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{usuario.id}</td>
                    <td className="px-4 py-2">{usuario.firstName}</td>
                    <td className="px-4 py-2">{usuario.lastName}</td>
                    <td className="px-4 py-2">{usuario.username}</td>
                    <td className="px-4 py-2">{usuario.email}</td>
                    <td className="px-4 py-2">{usuario.company.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Sección para las métricas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card de Usuarios */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Usuarios Activos</h2>
            <p className="text-2xl font-semibold aling-item-center">
              {users.length}
            </p>
          </div>

          {/* Card de Vehículos */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Vehículos Activos</h2>
            <p className="text-2xl font-semibold">15</p>
          </div>

          {/* Card de Alertas */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Alertas</h2>
            <p className="text-2xl font-semibold">2 Nuevas Alertas</p>
          </div>
        </section>

        {/* Tabla de Vehículos */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Vehículos Registrados</h2>
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Matrícula</th>
                  <th className="px-4 py-2">Modelo</th>
                  <th className="px-4 py-2">Estado</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">ABC123</td>
                  <td className="px-4 py-2">Toyota</td>
                  <td className="px-4 py-2">Disponible</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500">Editar</button>
                    <button className="text-red-500 ml-2">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

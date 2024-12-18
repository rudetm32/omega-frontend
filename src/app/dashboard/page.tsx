"use client";

import React from "react";
import dynamic from "next/dynamic"; 
import { useUserContext } from "@/context/UserContext";
import { useCompanyContext } from "@/context/CompanyContext";
import ParentModal from "@/components/modals/ParentModal";
import Table from "@/components/table/Table";
import Card from "@/components/cards/Card";
import Sidebar from "@/components/sidebar/sidebar";

// Carga dinámica para LocationTracker
const LocationTracker = dynamic(
  () => import("@/components/location/LocationTracker"),
  {
    ssr: false, // Deshabilitar la renderización del servidor
  }
);

// Definición de columnas para las tablas
const userColumns = [
  "ID",
  "Nombre",
  "Apellido",
  "Usuario",
  "Correo Electrónico",
  "Compañía",
];
const vehicleColumns = ["ID", "Matrícula", "Modelo", "Estado", "Acciones"];
const companyColumns = ["ID", "Nombre", "Teléfono", "Domicilio"];

const Dashboard: React.FC = () => {
  const { users } = useUserContext();
  const { companies } = useCompanyContext();

  // Procesar datos de usuarios
  const userData = users.map((user) => ({
    ID: user.id,
    Nombre: user.firstName,
    Apellido: user.lastName,
    Usuario: user.username,
    "Correo Electrónico": user.email,
    Compañía: user.company?.id || "No asignada",
  }));

  // Procesar datos de compañías
  const companyData = companies.map((company) => ({
    ID: company.id,
    Nombre: company.name,
    Teléfono: company.telephone,
    Domicilio: company.address?.city || "Sin domicilio",
  }));

  // Datos estáticos de vehículos
  const vehicleData = [
    {
      ID: 1,
      Matrícula: "ABC123",
      Modelo: "Toyota",
      Estado: "Disponible",
      Acciones: "Editar / Eliminar",
    },
    // Más vehículos estáticos o dinámicos...
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="flex-1 bg-gray-100 p-6 ml-0 md:ml-64">
        {/* Encabezado */}
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Mesa de control</h1>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Mapa en Tiempo Real</h2>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
              <LocationTracker />
            </div>
          </div>
          <p className="text-gray-600">
            Gestiona usuarios y unidades registradas
          </p>
        </header>

        {/* Sección de Altas */}
        <section id="zona-registros" className="mb-8">
          <h2 className="text-xl font-bold mb-4">Altas</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ParentModal />
          </div>
        </section>

        {/* Sección de Compañías */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Compañías</h2>
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <Table columns={companyColumns} data={companyData} />
          </div>
        </section>

        {/* Sección de Usuarios */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Usuarios</h2>
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <Table columns={userColumns} data={userData} />
          </div>
        </section>

        {/* Sección de Vehículos */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Vehículos</h2>
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <Table columns={vehicleColumns} data={vehicleData} />
          </div>
        </section>

        {/* Sección de métricas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card title="Usuarios Activos" value={users.length} />
          <Card title="Vehículos Activos" value={15} />
          <Card title="Alertas" value="2 nuevas alertas" />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

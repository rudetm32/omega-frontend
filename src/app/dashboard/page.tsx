"use client";

import React from "react";

import { useUserContext } from "@/context/UserContext";
import { useCompanyContext } from "@/context/CompanyContext";
import ParentModal from "@/components/modals/ParentModal";
import Table from "@/components/table/Table";
import Card from "@/components/cards/Card";
import Sidebar from "@/components/sidebar/sidebar";
import LocationTracker from "@/components/location/LocationTracker";

const userColumns = [
  "ID",
  "Nombre",
  "Apellido",
  "Usuario",
  "Correo Electrónico",
  "Compañia",
];
const vehicleColumns = ["ID", "Matrícula", "Modelo", "Estado", "Acciones"];
const companyColumns = ["ID", "Nombre", "Telefono", "Domicilio"];

const Dashboard: React.FC = () => {
  const { users } = useUserContext();
  const { companies } = useCompanyContext();

  const userData = users.map((user) => ({
    ID: user.id,
    Nombre: user.firstName,
    Apellido: user.lastName,
    Usuario: user.username,
    email: user.email,
    Compañia: user.company.id,
  }));

  const companyData = companies.map((company) => ({
    ID: company.id,
    Nombre: company.name,
    Telefono: company.telephone,
    Direccion: company.address.city,
  }));

  const vehicleData = [
    {
      ID: 1,
      Matrícula: "ABC123",
      Modelo: "Toyota",
      Estado: "Disponible",
      Acciones: "Editar / Eliminar",
    },
    // más vehículos...
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 bg-gray-100 p-6 ml-0 md:ml-64">
        {" "}
        {/* Ajuste para compensar el espacio del sidebar */}
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Mesa de control</h1>
          <div>
            <h1>Mapa en Tiempo Real</h1>
            <LocationTracker />
          </div>
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
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <Table columns={companyColumns} data={companyData} />
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Usuarios</h2>
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <Table columns={userColumns} data={userData} />
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Vehículos</h2>
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <Table columns={vehicleColumns} data={vehicleData} />
          </div>
        </section>
        <br />
        <br />
        {/* Sección para las métricas */}
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

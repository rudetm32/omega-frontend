import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useCompanyContext } from "../../../context/CompanyContext";

interface FormData {

}

interface RegisterCompanyProps {
  onClose: () => void;
}

const RegisterVehicles: React.FC<RegisterCompanyProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1>Modal Vehiculos</h1>
    </div>
  );
};

export default RegisterVehicles;

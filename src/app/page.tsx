import Link from "next/link";
import Image from "next/image";
import logo from "./images/logo1.png";
import banner from "./images/antares-y-solar-s-web.webp";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-gray-800 via-gray-800 to-black text-white">
      {/* Header sin color propio, integrado con el fondo */}
      <header className="flex justify-between items-center p-6 text-xl">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Logo"
            className="w-[150px] h-auto" // Asegura el uso de Tailwind para el ancho
          />
        </div>

        <nav>
          <ul className="flex space-x-12 mr-16">
            <li>
              <Link
                href="/login"
                className="text-lg hover:text-blue-400 transition duration-300"
              >
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-lg hover:text-blue-400 transition duration-300"
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/servicios"
                className="text-lg hover:text-blue-400 transition duration-300"
              >
                Servicios
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center text-center py-20">
        <h1 className="text-5xl font-bold mb-4">
          Bienvenid@ a Omega Secure Track
        </h1>
        <p className="text-xl mb-8 max-w-xl">
          Plataforma de rastreo de vehículos en tiempo real y gestión eficiente.
        </p>
        <Image
          src={banner}
          alt="Banner"
          width={600}
          height={300}
          className="mb-10"
        />
        <Link
          href="/login"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg transition duration-300 hover:bg-blue-700"
        >
          Comienza a rastrear
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-black/70 py-4 text-center text-white">
        <p>&copy; 2024 Omega Secure Track. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

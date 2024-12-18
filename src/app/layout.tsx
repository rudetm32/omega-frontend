import localFont from "next/font/local";
import type { Metadata } from "next";
import { UserProvider } from "../context/UserContext";
import { CompanyProvider } from "../context/CompanyContext";
import "../styles/globals.css";

// Configuración de las fuentes locales con la versión integrada
const openSans = localFont({ 
  src: "./fonts/OpenSans-VariableFont_wdth,wght.ttf",
   variable: "--font-open-sans", 
   weight: "100 900", // Rango de peso 
   style: "normal", // Si es necesario 
   });

const roboto = localFont({
  src: [
    {
      path: "./fonts/Roboto-Regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/Roboto-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-roboto",
});


export const metadata: Metadata = {
   title: "Omega Secure Track", 
   description: "Plataforma de rastreo satelital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${openSans.variable} antialiased`}>
        <UserProvider>
          <CompanyProvider>{children}</CompanyProvider>
        </UserProvider>
      </body>
    </html>
  );
}

import React from 'react';
import Link from 'next/link';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl text-gray-700">¡Oops! Esta página no existe.</p>
      <Link href="/" className="mt-4 text-blue-600 hover:text-blue-800">
  Volver al inicio
</Link>
    </div>
  );
};

export default NotFoundPage;

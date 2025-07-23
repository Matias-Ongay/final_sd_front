import { useEffect, useState } from "react";
import api from "../api/apiClient";
import { Link } from "react-router-dom";

export default function PublicPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/api/public/hello")
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => setMessage("Error: " + err.message));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gray-950 text-white">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">🌐 Página pública</h1>

        <p className="text-lg mb-4 text-gray-300">
          Esta sección está disponible para cualquier visitante, sin necesidad de iniciar sesión.
        </p>

        <p className="text-md mb-6 text-gray-400">
          Si te logueás, vas a poder acceder a más funcionalidades como secciones privadas, panel de administración, y visualización de usuarios.
        </p>

        <div className="bg-gray-900 rounded p-4 shadow-lg text-green-300 font-mono text-sm">
          {message}
        </div>

        <Link
          to="/"
          className="inline-block mt-8 text-blue-400 hover:underline"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}

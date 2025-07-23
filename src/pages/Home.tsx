import { useAuth } from "../auth/useAuth";
import { Link } from "react-router-dom";
import api from "../api/apiClient";
import { useState } from "react";

export default function Home() {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
    isAdmin,
    isUser,
    isLoading,
  } = useAuth();
 const [publicResult, setPublicResult] = useState<string | null>(null);
 const probarPublicEndpoint = async () => {
  try {
    const res = await api.get("/api/public/hello");
    setPublicResult(`✅ ${res.status}: ${res.data.message}`);
  } catch (err: any) {
    const msg = err?.response?.status
      ? `❌ ${err.response.status}: ${err.response.statusText}`
      : "❌ Error al conectar";
    setPublicResult(msg);
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gray-950 text-white">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">Bienvenido a la app de Final Sistemas Distribuidos</h1>
        <div className="mb-6">
        <button
            onClick={probarPublicEndpoint}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded"
        >
            Probar endpoint público
        </button>
        {publicResult && (
            <p className="mt-2 text-sm text-gray-200">{publicResult}</p>
        )}
        </div>

        {isLoading ? (
          <p className="text-lg">Cargando sesión...</p>
        ) : isAuthenticated ? (
          <>
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-left">
              <p className="text-xl font-semibold mb-2">👋 Hola, {user?.name}</p>
              <p className="text-sm text-gray-300 mb-4">Email: {user?.email}</p>

              <p className="text-sm">
                <span className="font-medium">Rol:</span>{" "}
                <span className="capitalize">
                  {isAdmin ? "Admin" : isUser ? "User" : "Sin rol (irá a /post-login)"}
                </span>
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center gap-2">
              <Link className="text-blue-400 hover:underline" to="/public">
                🌐 Ver página pública
              </Link>
              <Link className="text-blue-400 hover:underline" to="/private">
                🔐 Ver página privada (user/admin)
              </Link>
              <Link className="text-blue-400 hover:underline" to="/probar-endpoints">
                ⚙️ Probar todos los endpoints
              </Link>
              {isAdmin && (
                <>
                  <Link className="text-blue-400 hover:underline" to="/admin">
                    🛠 Dashboard admin
                  </Link>
                  <Link className="text-blue-400 hover:underline" to="/users">
                    👥 Ver usuarios
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="mt-8 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
          >
            Iniciar sesión
          </button>
        )}
      </div>
    </div>
  );
}

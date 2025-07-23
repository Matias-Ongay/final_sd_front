import { useAuth } from "../auth/useAuth";
import { Link } from "react-router-dom";

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gray-950 text-white">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">Bienvenido a la app de Final SD</h1>

        {isLoading ? (
          <p className="text-lg">Cargando sesión...</p>
        ) : isAuthenticated ? (
          <>
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-left">
              <p className="text-xl font-semibold mb-2">👋 Hola, {user?.name}</p>
              <p className="text-sm text-gray-300 mb-4">Email: {user?.email}</p>

              <div className="text-sm bg-gray-900 rounded p-3 mb-4 max-h-48 overflow-auto">
                <pre>{JSON.stringify(user, null, 2)}</pre>
              </div>

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

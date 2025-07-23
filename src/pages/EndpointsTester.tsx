import { useAuth } from "../auth/useAuth";
import { useState } from "react";
import api from "../api/apiClient";
import { Link, useNavigate } from "react-router-dom";

interface EndpointConfig {
  label: string;
  path: string;
  roles: ("admin" | "user" | "public")[];
}

const endpoints: EndpointConfig[] = [
  { label: "GET /api/public/hello", path: "/api/public/hello", roles: ["public", "user", "admin"] },
  { label: "GET /api/private/hello", path: "/api/private/hello", roles: ["user", "admin"] },
  { label: "GET /api/admin/dashboard", path: "/api/admin/dashboard", roles: ["admin"] },
  { label: "GET /api/admin/users", path: "/api/admin/users", roles: ["admin"] },
  { label: "POST /api/users/create-user", path: "/api/users/create-user", roles: ["admin"] },
  { label: "GET /api/users/get-all-users", path: "/api/users/get-all-users", roles: ["admin"] },
];

export default function EndpointsTester() {
  const { getAccessTokenSilently, isAdmin, isUser } = useAuth();
  const [result, setResult] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const getCurrentRole = (): "admin" | "user" | "public" => {
    if (isAdmin) return "admin";
    if (isUser) return "user";
    return "public";
  };

  const role = getCurrentRole();

 const probar = async (endpoint: EndpointConfig) => {
  if (endpoint.path === "/api/users/create-user") {
    navigate("/create-user");
    return;
  }

  try {
    let headers = {};
    if (role !== "public") {
      const token = await getAccessTokenSilently();
      headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    const res = await api.request({
      method: endpoint.label.startsWith("POST") ? "post" : "get",
      url: endpoint.path,
      headers,
    });

    setResult((prev) => ({
      ...prev,
      [endpoint.path]: `✅ ${res.status} ${res.statusText || "OK"} - ${JSON.stringify(res.data)}`,
    }));
  } catch (err: any) {
    const message = err?.response?.status
      ? ` ${err.response.status} - ${err.response.statusText}`
      : " Error al conectar";
    setResult((prev) => ({
      ...prev,
      [endpoint.path]: message,
    }));
  }
};



  return (
    <div className="min-h-screen px-6 py-10 bg-gray-950 text-white flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">🔧 Probar Endpoints</h1>
        <p className="text-md text-center text-gray-400 mb-8">
          Estás actuando como: <span className="capitalize font-semibold text-white">{role}</span>. A continuación se muestran los endpoints disponibles para tu rol actual.
        </p>

        <ul className="space-y-6">
          {endpoints
            .filter((ep) => ep.roles.includes(role))
            .map((ep) => (
              <li key={ep.path} className="bg-gray-900 p-4 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <span className="text-sm font-mono">{ep.label}</span>
                  <button
                    onClick={() => probar(ep)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    Ejecutar
                  </button>
                </div>
                {result[ep.path] && (
                  <div
                    className={`mt-2 p-3 rounded text-sm ${
                      result[ep.path].startsWith("✅")
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {result[ep.path]}
                  </div>
                )}
              </li>
            ))}
        </ul>

        <div className="mt-10 text-center">
          <Link to="/" className="text-blue-400 hover:underline">
            ← Volver al Home
          </Link>
        </div>
      </div>
    </div>
  );
}

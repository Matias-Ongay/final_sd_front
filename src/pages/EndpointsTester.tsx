import { useAuth } from "../auth/useAuth";
import { useState } from "react";
import api from "../api/apiClient";

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
  const { getAccessTokenSilently, isAdmin, isUser, isAuthenticated } = useAuth();
  const [result, setResult] = useState<Record<string, string>>({});

  const getCurrentRole = (): "admin" | "user" | "public" => {
    if (isAdmin) return "admin";
    if (isUser) return "user";
    return "public";
  };

  const role = getCurrentRole();

  const probar = async (endpoint: EndpointConfig) => {
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
        ? `❌ ${err.response.status} - ${err.response.statusText}`
        : "❌ Error al conectar";
      setResult((prev) => ({
        ...prev,
        [endpoint.path]: message,
      }));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Probar Endpoints según tu rol: <span className="capitalize">{role}</span></h1>

      <ul className="space-y-4">
        {endpoints
          .filter((ep) => ep.roles.includes(role))
          .map((ep) => (
            <li key={ep.path}>
              <button
                onClick={() => probar(ep)}
                className="px-4 py-2 bg-blue-600 text-white rounded mr-4"
              >
                {ep.label}
              </button>
              <span className="text-sm">
                {result[ep.path]}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

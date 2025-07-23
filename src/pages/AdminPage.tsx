import { useAuth } from "../auth/useAuth";
import { useEffect, useState } from "react";
import api from "../api/apiClient";

interface Usuario {
  user_id: string;
  name: string;
  email: string;
  nickname: string;
  picture: string;
  identities: {
    provider: string;
    connection: string;
  }[];
}

export default function AdminPage() {
  const { getAccessTokenSilently, isAdmin } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await api.get<Usuario[]>("/api/users/get-all-users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuarios(res.data);
      } catch (err: any) {
        setError("No autorizado o error al traer los usuarios.");
      }
    };

    if (isAdmin) fetchUsers();
    else setError("Acceso denegado.");
  }, [isAdmin]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">👥 Usuarios registrados</h1>

      {error && <p className="text-red-500">{error}</p>}

      {!error && (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-800">
          <table className="min-w-full bg-gray-900 text-white">
            <thead>
              <tr className="bg-gray-800 text-sm uppercase text-gray-400">
                <th className="py-3 px-4 text-left">Foto</th>
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Proveedor</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.user_id} className="border-t border-gray-700 hover:bg-gray-800">
                  <td className="py-2 px-4">
                    <img src={u.picture} alt="avatar" className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="py-2 px-4">{u.name || u.nickname}</td>
                  <td className="py-2 px-4">{u.email}</td>
                  <td className="py-2 px-4">
                    {u.identities?.[0]?.provider || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

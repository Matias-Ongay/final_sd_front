import { useAuth } from "../../auth/useAuth";
import api from "../apiClient";
import { useEffect, useState } from "react";

interface Usuario {
  id: string;
  email: string;
  nombre: string;
  role: string;
}

export default function UsersPage() {
  const { getAccessTokenSilently, isAdmin } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await getAccessTokenSilently();
      const res = await api.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data);
    };

    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Usuarios del sistema</h1>
      {!isAdmin ? (
        <p>No autorizado.</p>
      ) : (
        <ul className="list-disc pl-6">
          {usuarios.map((u) => (
            <li key={u.id}>{u.nombre} ({u.email}) - Rol: {u.role}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

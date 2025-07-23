import { useAuth } from "../auth/useAuth";
import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function AdminPage() {
  const { getAccessTokenSilently, isAdmin } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isAdmin) {
      setMessage("Acceso denegado.");
      return;
    }

    const fetchAdmin = async () => {
      const token = await getAccessTokenSilently();
      const res = await api.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data);
    };

    fetchAdmin().catch((err) => setMessage("Error: " + err.message));
  }, [isAdmin]);

  return (
    <div className="p-6">
      <h1 className="text-2xl">Dashboard Admin</h1>
      <p>{message}</p>
    </div>
  );
}

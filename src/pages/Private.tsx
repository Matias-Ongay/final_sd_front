import { useAuth } from "../auth/useAuth";
import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function PrivatePage() {
  const { getAccessTokenSilently } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPrivate = async () => {
      const token = await getAccessTokenSilently();
      const res = await api.get("/api/private/hello", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      console.log(res);
    };

    fetchPrivate().catch((err) => setMessage("Error: " + err.message));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl">Privada (user/admin)</h1>
      <p>{message}</p>
    </div>
  );
}

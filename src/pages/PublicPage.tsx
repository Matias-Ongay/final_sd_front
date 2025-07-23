import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function PublicPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/api/public/hello")
      .then((res) => {
        setMessage(res.data.message);
        console.log(res);
      })
      .catch((err) => setMessage("Error: " + err.message));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl">Pública</h1>
      <p>{message}</p>
    </div>
  );
}

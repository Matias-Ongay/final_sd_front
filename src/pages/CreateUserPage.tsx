import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import api from "../api/apiClient";
import { Link } from "react-router-dom";

export default function CreateUserPage() {
  const { getAccessTokenSilently } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently();
      const res = await api.post("/api/users/create-user", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResult(JSON.stringify(res.data, null, 2));
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.response?.statusText || "Error desconocido";
      setResult(` Error al crear usuario: ${message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-md mx-auto bg-gray-900 rounded-xl p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Crear nuevo usuario</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Crear usuario
          </button>
        </form>

        {result && (
            <div className="mt-4 bg-gray-800 p-3 rounded text-sm overflow-x-auto max-w-full">
                <pre className="whitespace-pre-wrap break-words">{result}</pre>
            </div>
                    )}


        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-400 hover:underline">
            ← Volver al Home
          </Link>
        </div>
      </div>
    </div>
  );
}

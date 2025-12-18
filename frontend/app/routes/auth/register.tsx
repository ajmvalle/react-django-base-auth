import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import type { Route } from "../+types/register";
import { apiFetch } from "../../lib/api";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register" }];
}

export default function Register() {
  const { user, loading, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // ✅ Redirección correcta (side-effect)
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, user, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await apiFetch("/api/auth/register/", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();

        // DRF devuelve errores por campo en forma de arrays
        const messages: string[] = [];

        for (const key in data) {
          if (Array.isArray(data[key])) {
            messages.push(...data[key]);
          } else if (typeof data[key] === "string") {
            messages.push(data[key]);
          }
        }

        setErrors(messages.length ? messages : ["Error al registrar usuario"]);
        return;
      }

      // Backend ya hizo login → solo refrescar
      await refreshUser();
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setSubmitting(false);
    }
  }

  // ⏳ Mientras carga la sesión inicial
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Cargando…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Crear cuenta
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Usuario
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 lowercase"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errors.length > 0 && (
            <ul className="text-sm text-red-600 dark:text-red-400 space-y-1 text-center">
              {errors.map((msg, i) => (
                <li key={i}>• {msg}</li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold
                       py-2 rounded-md transition disabled:opacity-50"
          >
            {submitting ? "Creando cuenta…" : "Registrarse"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          ¿Ya tienes cuenta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}

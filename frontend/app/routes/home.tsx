import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mi App" },
    { name: "description", content: "Plataforma moderna" },
  ];
}

export default function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Cargando…</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700
                    flex items-center justify-center px-6 text-white"
    >
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Bienvenido a <span className="text-yellow-300">Mi App</span>
        </h1>

        <p className="text-lg text-blue-100">
          Gestiona tu plataforma de forma simple y segura.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          {!user && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 rounded-md bg-white text-blue-700 font-semibold
                           hover:bg-blue-50 transition"
              >
                Iniciar sesión
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 rounded-md bg-yellow-400 text-blue-900 font-semibold
                           hover:bg-yellow-300 transition"
              >
                Crear cuenta
              </button>
            </>
          )}

          {user && (
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 rounded-md bg-green-500 text-white font-semibold
                         hover:bg-green-400 transition"
            >
              Ir a Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Auth Django + React | TailAdmin" },
    {
      name: "description",
      content:
        "Aplicación de autenticación Django - React con TailAdmin, React Router y Tailwind CSS",
    },
  ];
}

export default function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-theme-sm">
          Cargando…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Texto */}
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-brand-50 px-4 py-1.5 text-theme-sm font-medium text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">
                Plantilla base educativa
              </span>

              <h1 className="text-title-lg font-semibold text-gray-900 dark:text-white">
                Aplicación de autenticación <br />
                <span className="text-brand-500">
                  Django · React · TailAdmin
                </span>
              </h1>

              <p className="text-theme-xl text-gray-600 dark:text-gray-400">
                Proyecto base moderno para enseñar y construir aplicaciones
                reales con autenticación, frontend desacoplado y buenas
                prácticas desde el día uno.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                {!user && (
                  <>
                    <button
                      onClick={() => navigate("/auth/login")}
                      className="rounded-lg bg-brand-500 px-6 py-3 text-white text-sm font-medium shadow-theme-sm hover:bg-brand-600 transition"
                    >
                      Iniciar sesión
                    </button>

                    <button
                      onClick={() => navigate("/auth/register")}
                      className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition
                                 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
                    >
                      Crear cuenta
                    </button>
                  </>
                )}

                {user && (
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="rounded-lg bg-success-500 px-6 py-3 text-white text-sm font-medium shadow-theme-sm hover:bg-success-600 transition"
                  >
                    Ir al Dashboard
                  </button>
                )}
              </div>
            </div>

            {/* Card visual */}
            <div className="relative">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-theme-lg dark:border-gray-800 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                  ¿Qué incluye esta plantilla?
                </h3>

                <ul className="space-y-3 text-theme-sm text-gray-600 dark:text-gray-400">
                  <li>✔️ Autenticación con Django</li>
                  <li>✔️ React Router (nueva API)</li>
                  <li>✔️ Tailwind CSS v4 + TailAdmin</li>
                  <li>✔️ Dark mode listo</li>
                  <li>✔️ Arquitectura clara para alumnos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECNOLOGÍAS */}
      <section className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-10 text-center text-title-sm font-semibold text-gray-900 dark:text-white">
            Stack Tecnológico
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Django",
                desc: "Backend robusto, seguro y escalable",
              },
              {
                title: "React",
                desc: "Frontend moderno y desacoplado",
              },
              {
                title: "React Router",
                desc: "Ruteo moderno con loaders y actions",
              },
              {
                title: "TailAdmin",
                desc: "UI profesional lista para producción",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-theme-sm
                           dark:border-gray-800 dark:bg-gray-800"
              >
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-theme-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

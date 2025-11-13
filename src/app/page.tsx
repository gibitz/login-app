"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  async function fetchTasks() {
    try {
      const res = await fetch("/api/task/list", {
        cache: "no-store",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Erro ao buscar tarefas");

      const { tasks } = await res.json();
      setTasks(tasks);
    } catch (e) {
      console.log("Erro ao buscar tarefas", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <main className="flex justify-center items-start pt-24 pb-6 px-4 min-h-screen">
      <div className="w-full max-w-6xl h-[calc(100vh-8rem)] flex flex-col">
        <div className="sm:hidden flex-1 overflow-y-auto flex flex-col gap-4 bg-card rounded-xl p-4 shadow-lg">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-background/40 p-4 rounded-lg"
              onClick={() => setSelectedTask(task)}
            >
              <h2 className="font-semibold text-lg mb-1 truncate">
                {task.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-3 truncate">
                {task.description || "Sem descrição"}
              </p>
              <p className="text-xs text-gray-400">
                Usuário: {task.user.email}
              </p>
              <p className="text-xs text-gray-400">
                Criado em:{" "}
                {new Date(task.createdAt).toLocaleString().split(",")[0]}
              </p>
            </div>
          ))}
        </div>

        <div className="hidden sm:flex justify-center">
          <div className="w-full bg-card rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-y-auto h-[calc(100vh-10rem)]">
              <table className="w-full text-sm">
                <colgroup>
                  <col className="w-[8%]" />
                  <col className="w-[25%]" />
                  <col className="w-[30%]" />
                  <col className="w-[22%]" />
                  <col className="w-[15%]" />
                </colgroup>
                <thead>
                  <tr className="bg-gray-600/80 text-left text-white">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Tarefa</th>
                    <th className="py-3 px-4">Descrição</th>
                    <th className="py-3 px-4">Usuário</th>
                    <th className="py-3 px-4">Criado em</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, i) => (
                    <tr
                      key={task.id}
                      className={`cursor-pointer ${
                        i % 2 === 0 ? "bg-background/30" : "bg-background/10"
                      } hover:bg-background/50 transition-colors`}
                      onClick={() => setSelectedTask(task)}
                    >
                      <td className="py-3 px-4 whitespace-nowrap">{task.id}</td>
                      <td className="py-3 px-4 font-medium max-w-0 truncate">
                        {task.title}
                      </td>
                      <td className="py-3 px-4 max-w-0 truncate">
                        {task.description || "Sem descrição"}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {task.user.email}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {
                          new Date(task.createdAt)
                            .toLocaleString()
                            .split(",")[0]
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedTask && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card rounded-xl shadow-xl max-w-2xl w-[90%] max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
              onClick={() => setSelectedTask(null)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4 wrap-break-word">
              {selectedTask.title}
            </h2>
            <p className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap wrap-break-word">
              {selectedTask.description || "Sem descrição"}
            </p>
            <p className="text-xs text-gray-400">
              Usuário: {selectedTask.user.email}
            </p>
            <p className="text-xs text-gray-400">
              Criado em:{" "}
              {new Date(selectedTask.createdAt).toLocaleString().split(",")[0]}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

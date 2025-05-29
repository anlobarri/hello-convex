"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import AddTask from "./AddTask";

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  const setCompleted = useMutation(api.tasks.setCompleted);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <div>
        {tasks === undefined ? (
          <p>Cargando tareas...</p>
        ) : (
          tasks.map(({ _id, text, isCompleted }) => (
            <div key={_id} className="flex items-center gap-2">
              <span
                style={{
                  textDecoration: isCompleted ? "line-through" : "none",
                  color: isCompleted ? "#888" : "inherit",
                }}
              >
                {text}
              </span>
              <button
                onClick={() => setCompleted({ taskId: _id, isCompleted: true })}
                disabled={isCompleted}
              >
                {isCompleted ? "Completada" : "Marcar como completada"}
              </button>
            </div>
          ))
        )}
      </div>
      <div>
        <AddTask />
      </div>
    </main>
  );
}

import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export default function AddTask() {
  const [text, setText] = useState("");
  const createTask = useMutation(api.tasks.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await createTask({ text });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button type="submit">Añadir</button>
    </form>
  );
}

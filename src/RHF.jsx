import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

export default function RHF() {
  const [todos, setTodos] = useState([]);
  const { register, handleSubmit, formState: { errors, isValid, isSubmitted }, reset } = useForm();

  function removeTodo(indexToRemove) {
    const newTodos = todos.filter((todo, i) => i !== indexToRemove);
    setTodos(newTodos);
  }

  function onSubmit(data) {
    console.log("data:", data);
    setTodos([...todos, data.todo]);
    reset();
  }

  return (
    <main className="w-full min-h-screen flex flex-col">
      <p className="w-full bg-teal-500 text-black font-bold text-center p-2">
        To-Do react-hook-form
      </p>
      <form
        className="flex flex-row gap-2 justify-center p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Ingresa una tarea"
          className={clsx("p-2 rounded text-white w-full max-w-screen-sm", { "border-2 border-red-500 bg-red-300": errors.todo })}
          required
          {...register('todo', {
            required: { value: true, message: "Campo requerido papu" },
            minLength: { value: 3, message: "Minimo 3 caracteres" },
            maxLength: { value: 180, message: "Máximo 180 caracteres (Mucho texto)" },
          })}
        />
        <button
          className={"text-black px-3 rounded bg-white disabled:bg-stone-400"}
          disabled={isSubmitted ? !isValid : false}
        >
          + Agregar
        </button>
      </form>

      {errors.todo && (
        <p className="text-red-500 text-center text-sm font-bold-sm">
          {errors.todo.message}
        </p>
      )}

      <div className="max-w-screen-sm w-full mx-auto p-4 flex flex-col gap-3">
        {todos.length === 0 && <p className="text-white/50">Sin tareas pendientes 🙅‍♂️</p>}
        {todos.map((todo, i) => {
          return (
            <div key={`todo-${i}`} className="bg-white/10 rounded p-4 flex flex-row justify-between select-none">
              <span className="select-none">{todo}</span>
              <span
                className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1 size-5 text-center items-center flex"
                onClick={() => removeTodo(i)}
              >
                x
              </span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
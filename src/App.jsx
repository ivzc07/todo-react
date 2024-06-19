import { useState} from "react";

export default function App () {

  const [todos, setTodos] = useState([])
  const [text, setText] = useState("")

  function addTodo (){
    // todos.push(text);
    setTodos([... todos, text])
  }
  
  function removeTodo(indexToRemove) {
    todos.splice(indexToRemove, 1);
    setTodos([... todos]);
  }
    
  function onSubmit(event) {
    event.preventDefault();
    addTodo()
    setText('')
  }

  return (
    <>
    <main className="w-full min-h-screen flex flex-col ">
        <form 
          className="flex flex-row gap-2 justify-center p-5"
          onSubmit={onSubmit}
        >
          <input 
            type="text"
            className="p-2 rounded-md text-white w-full max-w-screen-sm"
            placeholder="Ingresa Tarea" 
            value= {text}
            onChange = {(event) => setText(event.target.value)}
          />

          <button 
           className="px-3 rounded text-white"
            
          > 
            + Agregar 
          </button>  
        </form>

        <div className="max-w-screen-sm w-full mx-auto flex flex-col gap-1">
        { todos.length === 0 && (
            <p className="text-white/50"> No tienes tareas pendientes 🤷🏽</p>
        )}
        {   
            todos.length > 0 &&
              todos.map((todo,idx) => {
                return (
                  <div 
                    key = { `todo -${idx}`}
                    className=" bg-white/10 rounded p-4 flex flex-row justify-between select-none"
                  >
                    <span >
                      {todo}
                    </span>
                    <span className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1 size-5 text-center items-center" onClick={ () => removeTodo(idx)}>X</span>
                  </div>
                )
              })
          }
        </div>
      </main>
    </>
  )
}
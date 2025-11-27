import { useState } from "react";
import Card from "./Card";

function Home() {
  const [todos, setTodos] = useState([
    "Buy groceries",
    "Wash the car",
    "Cook dinner",
    "Do laundry",
    "Call mom",
  ]);

  //   const newText = "";
  const [newText, setNewText] = useState("");

  const handleSave = (text) => {
    if (text.trim() === "") {
      return;
    }

    const newTodos = [...todos, text];
    setTodos(newTodos);
    setNewText("");
  };

  const handleEdit = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index] = newText;
    setTodos(newTodos);
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 p-4">
      <div className="flex flex-col max-h-[80vh] bg-white p-8 rounded-sm shadow-2xl w-full max-w-lg transition-all duration-300 ease-in-out">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center border-b-2 border-indigo-400 pb-2 tracking-wide">
          To-Do List 📝✨
        </h1>
        <div className="flex mb-4">
          <input
            className="p-2 w-full border-2 border-gray-300 rounded-md outline-none"
            type="text"
            value={newText}
            placeholder="Add your task"
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave(newText);
              }
            }}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold h-full  p-2 ml-2 rounded-md"
            type="button"
            onClick={() => handleSave(newText)}
          >
            Save
          </button>
        </div>
        <div className="flex-1 overflow-y-scroll pr-2 min-h-[53vh]">
          {todos.map((todo, index) => (
            <Card
              todo={todo}
              key={index}
              onDelete={() => handleDelete(index)}
              onEdit={(editedText) => handleEdit(index, editedText)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from "react";

function Card({ todo, onDelete, onEdit, onCancel, onSave }) {
  const editMode = false;
  return (
    <div
      className="flex justify-between items-center p-3 mb-2 rounded-sm bg-gray-100 hover:bg-gray-200 transition hover:shadow-md hover:scale-105 transition-all duration-200
"
    >
      {editMode ? (
        <input
          className="p-2"
          type="text"
          value={todo}
          onChange={(e) => onEdit(e.target.value)}
        />
      ) : (
        <h1 className="text-gray-800 font-medium">
          <span>📃</span>
          {todo}
        </h1>
      )}

      {editMode ? (
        <div className="flex gap-2">
          <button
            onClick={onSave}
            className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md transition duration-200"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition duration-200"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md transition duration-200"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition duration-200"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;

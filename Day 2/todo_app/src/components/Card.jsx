import React, { useState } from "react";

function Card({ todo, onDelete, onEdit }) {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(todo);

  const handleEditSave = () => {
    if (editedText.trim() === "") {
      setEditedText(todo);
      setEditMode(false);
      return;
    }

    onEdit(editedText);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditedText(todo);
    setEditMode(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditSave();
    }
    if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div
      className="flex justify-between items-center p-3 mb-2 rounded-sm bg-gray-100 hover:bg-gray-200 transition hover:shadow-md hover:scale-105 transition-all duration-200
"
    >
      {editMode ? (
        <input
          className="p-2 w-full border-2 border-indigo-300 rounded-md outline-none flex-1 mr-4"
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
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
            onClick={handleEditSave}
            className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md transition duration-200"
          >
            Save
          </button>
          <button
            onClick={handleCancelEdit}
            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition duration-200"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => setEditMode(true)}
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

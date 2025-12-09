import React from "react";

const EditDialoge = ({ editInput, setEditInput, onClose, onSave }) => {
  return (
    <div
      style={{ margin: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4 w-80">
        <h2 className="text-lg font-semibold">Edit Task</h2>

        <input
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
          className="w-full border rounded-xl p-2 focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDialoge;

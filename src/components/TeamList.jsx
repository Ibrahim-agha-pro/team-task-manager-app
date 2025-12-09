import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RemoveDialog = ({ onClose, members, onConfirm }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4 w-96">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Remove Members</h2>

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {members.map((m) => (
            <div
              key={m.id}
              onClick={() =>
                setSelectedIds((prev) =>
                  prev.includes(m.id)
                    ? prev.filter((id) => id !== m.id)
                    : [...prev, m.id]
                )
              }
              className={`cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition flex justify-between items-center ${
                selectedIds.includes(m.id) ? "bg-gray-100" : ""
              }`}
            >
              <span>{m.name}</span>
              {selectedIds.includes(m.id) && (
                <span className="text-sm text-red-600">Selected</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm(selectedIds);
            }}
            disabled={selectedIds.length === 0}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const TeamList = () => {
  const { teamMembers, dispatch } = useContext(AppContext);

  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [newMember, setNewMember] = useState("");

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>

      <div className="flex gap-2">
        <button
          onClick={() => setShowRemoveDialog(true)}
          className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 shadow"
        >
          Remove Member(s)
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {teamMembers.map((m) => (
          <Link
            key={m.id}
            to={`/member/${m.id}`}
            className="block p-6 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition transform"
          >
            <div className="text-xl font-bold text-gray-800">{m.name}</div>
            <p className="text-gray-500 text-sm mt-1">Click to view details</p>
          </Link>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl shadow space-y-4">
        <label className="block font-medium text-gray-700">
          Add New Member
        </label>

        <input
          className="w-full border rounded-xl p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="Member name"
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
          onClick={() => {
            if (!newMember.trim()) return;
            dispatch({ type: "ADD_MEMBER", payload: { name: newMember } });
            setNewMember("");
          }}
        >
          Add Member
        </button>
      </div>

      {showRemoveDialog && (
        <RemoveDialog
          members={teamMembers}
          onClose={() => setShowRemoveDialog(false)}
          onConfirm={(ids) => {
            if (ids.length === 0) return;
            dispatch({ type: "REMOVE_MEMBERS", payload: ids });
            setShowRemoveDialog(false);
          }}
        />
      )}
    </div>
  );
};

export default TeamList;

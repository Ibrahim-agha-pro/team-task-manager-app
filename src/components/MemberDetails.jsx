import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import EditDialoge from "./EditDialoge";
import { AppContext } from "../context/AppContext";
import { DeleteDialoge } from "./DeleteDialoge";

const MemberDetails = () => {
  const { teamMembers, dispatch } = useContext(AppContext);
  const { memberId } = useParams();
  const numericMemberId = Number(memberId);

  const member = teamMembers.find((m) => m.id === numericMemberId);

  const [filter, setFilter] = useState("all");
  const [newTaskInput, setNewTaskInput] = useState("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [editInput, setEditInput] = useState("");

  if (!member) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold">Member not found</h2>
        <p className="mt-3">The requested member does not exist.</p>
        <Link
          to="/teamlist"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Team Members
        </Link>
      </div>
    );
  }

  const tasks = member.tasks || [];

  const tasksToRender =
    filter === "all"
      ? tasks
      : ["todo", "in-progress", "done"].includes(filter)
      ? tasks.filter((t) => t.status === filter)
      : ["low", "medium", "high"].includes(filter)
      ? tasks.filter((t) => t.priority === filter)
      : [];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Hello, {member.name}</h1>

      {/* Add new task */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow space-y-4">
        <p className="font-medium">Add New Task</p>

        <input
          value={newTaskInput}
          onChange={(e) => setNewTaskInput(e.target.value)}
          className="w-full border rounded-xl p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Task Title"
        />

        <button
          onClick={() => {
            if (!newTaskInput.trim()) return;
            dispatch({
              type: "ADD_NEW_TASK",
              payload: {
                memberId: numericMemberId,
                newTaskTitle: newTaskInput,
              },
            });
            setNewTaskInput("");
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition"
        >
          Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-around flex-wrap gap-2">
        {["all", "todo", "in-progress", "done", "low", "medium", "high"].map(
          (f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-xl font-bold transition ${
                filter === f ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          )
        )}
      </div>

      {/* Tasks list */}
      <div className="space-y-4">
        {tasksToRender.map((task) => (
          <div
            key={task.id}
            className={`p-5 rounded-2xl shadow-md hover:shadow-lg transition space-y-3 ${
              task.status === "todo"
                ? "bg-red-100"
                : task.status === "in-progress"
                ? "bg-yellow-100"
                : "bg-green-100"
            }`}
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {task.title}
            </h2>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Due: {task.dueDate || "—"}
              </span>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  task.priority === "high"
                    ? "bg-red-500 text-white"
                    : task.priority === "medium"
                    ? "bg-yellow-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {task.priority}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {["todo", "in-progress", "done"].map((status) => (
                <button
                  key={status}
                  className="px-3 py-1 rounded-xl bg-gray-200 hover:bg-gray-300 text-sm"
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_TASK_STATUS",
                      payload: {
                        memberId: numericMemberId,
                        taskId: task.id,
                        newStatus: status,
                      },
                    })
                  }
                >
                  {status}
                </button>
              ))}

              <button
                className="px-3 py-1 rounded-xl bg-yellow-400 text-black hover:bg-yellow-500 text-sm"
                onClick={() => {
                  setSelectedTaskId(task.id);
                  setEditInput(task.title);
                  setShowEditDialog(true);
                }}
              >
                Edit
              </button>

              <button
                className="px-3 py-1 rounded-xl bg-red-600 text-white hover:bg-red-700 text-sm"
                onClick={() => {
                  setShowDeleteDialog(true);
                  setSelectedTaskId(task.id);
                }}
              >
                Delete
              </button>
            </div>

            {/* Change priority */}
            <div className="flex items-center gap-2 mt-3">
              <p>Priority:</p>
              <select
                value={task.priority}
                onChange={(e) => {
                  dispatch({
                    type: "CHANGE_TASK_PRIORITY",
                    payload: {
                      memberId: numericMemberId,
                      taskId: task.id,
                      changedPriority: e.target.value,
                    },
                  });
                }}
                className="border rounded-lg p-1"
              >
                {["low", "medium", "high"].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        {tasksToRender.length === 0 && (
          <p className="text-center text-gray-500">No tasks to show.</p>
        )}
      </div>

      {/* Edit Dialog */}
      {showEditDialog && (
        <EditDialoge
          editInput={editInput}
          setEditInput={setEditInput}
          onClose={() => {
            setShowEditDialog(false);
            setSelectedTaskId(null);
          }}
          onSave={() => {
            dispatch({
              type: "EDIT_TASK",
              payload: {
                memberId: numericMemberId,
                taskId: selectedTaskId,
                editedTask: editInput,
              },
            });
            setShowEditDialog(false);
            setSelectedTaskId(null);
          }}
        />
      )}
      {/* Delete Dialog */}
      {showDeleteDialog && (
        <DeleteDialoge
          onClose={() => {
            setShowDeleteDialog(false);
            setSelectedTaskId(null);
          }}
          onCofirm={() => {
            dispatch({
              type: "DELETE_TASK",
              payload: {
                memberId: numericMemberId,
                taskId: selectedTaskId,
              },
            });
            setShowDeleteDialog(false);
            setSelectedTaskId(null);
          }}
        />
      )}
    </div>
  );
};

export default MemberDetails;

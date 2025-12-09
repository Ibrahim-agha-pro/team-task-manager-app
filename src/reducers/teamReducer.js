export const teamReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // Add a member. payload: { name: string }
    case "ADD_MEMBER": {
      if (!payload || !payload.name || !payload.name.trim()) return state;
      const newMember = {
        id: Date.now(),
        name: payload.name.trim(),
        tasks: [],
      };
      return [...state, newMember];
    }

    // Remove one or multiple members. payload: id number OR array of ids
    case "REMOVE_MEMBERS": {
      if (!payload) return state;
      const idsToRemove = Array.isArray(payload) ? payload : [payload];
      return state.filter((m) => !idsToRemove.includes(m.id));
    }

    // Add new task to a member. payload: { memberId, newTaskTitle }
    case "ADD_NEW_TASK": {
      const { memberId, newTaskTitle } = payload || {};
      if (!newTaskTitle || !newTaskTitle.trim()) return state;
      return state.map((member) => {
        if (member.id === memberId) {
          const newTask = {
            id: Date.now(),
            title: newTaskTitle.trim(),
            status: "todo",
            priority: "medium",
            dueDate: new Date().toISOString().split("T")[0],
          };
          return { ...member, tasks: [...member.tasks, newTask] };
        }
        return member;
      });
    }

    // Change task status. payload: { memberId, taskId, newStatus }
    case "CHANGE_TASK_STATUS": {
      const { memberId, taskId, newStatus } = payload || {};
      return state.map((member) => {
        if (member.id === memberId) {
          return {
            ...member,
            tasks: member.tasks.map((t) =>
              t.id === taskId ? { ...t, status: newStatus } : t
            ),
          };
        }
        return member;
      });
    }

    // Edit task title. payload: { memberId, taskId, editedTask }
    case "EDIT_TASK": {
      const { memberId, taskId, editedTask } = payload || {};
      return state.map((member) => {
        if (member.id === memberId) {
          return {
            ...member,
            tasks: member.tasks.map((t) =>
              t.id === taskId ? { ...t, title: editedTask } : t
            ),
          };
        }
        return member;
      });
    }

    // Change task priority. payload: { memberId, taskId, changedPriority }
    case "CHANGE_TASK_PRIORITY": {
      const { memberId, taskId, changedPriority } = payload || {};
      return state.map((member) => {
        if (member.id === memberId) {
          return {
            ...member,
            tasks: member.tasks.map((t) =>
              t.id === taskId ? { ...t, priority: changedPriority } : t
            ),
          };
        }
        return member;
      });
    }

    // Delete a task. payload: { memberId, taskId }
    case "DELETE_TASK": {
      const { memberId, taskId } = payload || {};
      return state.map((member) => {
        if (member.id === memberId) {
          return {
            ...member,
            tasks: member.tasks.filter((t) => t.id !== taskId),
          };
        }
        return member;
      });
    }

    default:
      return state;
  }
};

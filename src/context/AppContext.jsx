import React, { createContext, useEffect, useReducer } from "react";
import { teamReducer } from "../reducers/teamReducer";

export const AppContext = createContext();

const initialState = [
  {
    id: 1,
    name: "Omar",
    tasks: [
      {
        id: 201,
        title: "Implement Login Page",
        description: "Create a responsive login page with validation",
        status: "todo",
        priority: "high",
        dueDate: "2025-12-07",
      },
      {
        id: 202,
        title: "Integrate Auth API",
        description: "Connect login form with backend authentication",
        status: "in-progress",
        priority: "high",
        dueDate: "2025-12-07",
      },
      {
        id: 203,
        title: "Dark Mode Toggle",
        description: "Add theme switcher for light/dark mode",
        status: "done",
        priority: "medium",
        dueDate: "2025-12-07",
      },
      {
        id: 204,
        title: "Error Handling",
        description: "Implement global error boundaries and fallback UI",
        status: "todo",
        priority: "low",
        dueDate: "2025-12-07",
      },
    ],
  },
  {
    id: 2,
    name: "Ahmad",
    tasks: [
      {
        id: 205,
        title: "Database Schema",
        description: "Design MongoDB schema for users and tasks",
        status: "in-progress",
        priority: "high",
        dueDate: "2025-12-07",
      },
      {
        id: 206,
        title: "API Documentation",
        description: "Write Swagger docs for all endpoints",
        status: "todo",
        priority: "medium",
        dueDate: "2025-12-07",
      },
      {
        id: 207,
        title: "JWT Refresh Tokens",
        description: "Add refresh token rotation for security",
        status: "done",
        priority: "high",
        dueDate: "2025-12-07",
      },
      {
        id: 208,
        title: "Rate Limiting",
        description: "Prevent abuse by implementing rate limit middleware",
        status: "todo",
        priority: "medium",
        dueDate: "2025-12-07",
      },
    ],
  },
];

const LS_KEY = "team-data-v1";

const initializer = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return initialState;
    return parsed;
  } catch (e) {
    console.error("Failed to parse localStorage team data:", e);
    return initialState;
  }
};

const AppProvider = ({ children }) => {
  const [teamMembers, dispatch] = useReducer(
    teamReducer,
    initialState,
    initializer
  );

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(teamMembers));
    } catch (e) {
      console.error("Failed to save team data to localStorage:", e);
    }
  }, [teamMembers]);

  return (
    <AppContext.Provider
      value={{
        teamMembers,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

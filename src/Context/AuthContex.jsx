import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
const states = ["todo", "doing", "done"];
const apiUrl = "https://task-api-zdam.onrender.com/";

const initialState = {
  user: null,
  isAuthed: false,
  token: null,
  error: "",
  isLoading: false,
};

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "login":
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
        })
      );
      return {
        ...state,
        isAuthed: true,
        user: action.payload.user,
        token: action.payload.token,
        error: "",
        isLoading: false,
      };
    case "fail/login":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "fail/close":
      return { ...state, error: "" };
    case "logout":
      localStorage.clear("user");
      return initialState;
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthed, token, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(
    function () {
      const savedData = JSON.parse(localStorage.getItem("user")) || null;
      if (savedData)
        dispatch({
          type: "login",
          payload: { user: savedData.user, token: savedData.token },
        });
    },
    [isAuthed]
  );

  async function login(username, password) {
    if (!username || !password)
      return dispatch({
        type: "fail/login",
        payload: "Please fill all fields",
      });
    dispatch({ type: "loading" });

    const user = { username, password };
    const res = await fetch(`${apiUrl}/auth/login`, {
      ...options,
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: "login", payload: data });
    }
    if (!res.ok) {
      dispatch({ type: "fail/login", payload: data.message });
    }
  }

  async function signup(name, username, password, passwordConfirm) {
    if (!name || !username || !password || !passwordConfirm) {
      return dispatch({
        type: "fail/login",
        payload: "Please fill all fields!",
      });
    }
    if (password !== passwordConfirm) {
      return dispatch({
        type: "fail/login",
        payload: "Password and Confirm Password Should be the same!",
      });
    }
    const user = { name, username, password, passwordConfirm };
    const res = await fetch(`${apiUrl}/auth/signup`, {
      ...options,
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: "login", payload: data });
    }
    if (!res.ok) {
      dispatch({ type: "fail/login", payload: data.message });
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, signup, isAuthed, login, token, error, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("Used in Wrong Place!");
  return context;
}

export { useAuth, AuthProvider };

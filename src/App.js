import React, { useReducer, useState } from "react";
import Todo from "./Todo.js";

export const Actions = {
  ADD_TODO: "ADD_TODO",
  EDIT_TODO: "EDIT_TODO",
  DELETE_TODO: "DELETE_TODO",
  FETCH_COMPLETED: "FETCH_COMPLETED",
};
const reducer = (state, action) => {
  switch (action.type) {
    case Actions.ADD_TODO:
      return [action.todo, ...state];
    case Actions.EDIT_TODO:
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    case Actions.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case Actions.FETCH_COMPLETED:
      return state.filter((todo) => todo.completed !== true);
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const [item, setItem] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    if (item === "" || item.length === 0) return;
    e.preventDefault();
    dispatch({
      type: Actions.ADD_TODO,
      todo: { name: item, id: Date.now(), completed: false },
    });
    setItem("");
    document.getElementById("todo-add").value = "";
  };
  const toggleCompleted = () => {
    setCompleted(!completed);
  };
  return (
    <div className="todo">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setItem(e.target.value)}
          id="todo-add"
          placeholder="add new task"
        />
        <button className="add-icon" onClick={handleSubmit}>
          <img
            src="https://image.flaticon.com/icons/svg/929/929409.svg"
            alt="add-icon"
          ></img>
        </button>
      </form>
      <div className="buttons">
        <button
          onClick={toggleCompleted}
          className="btn completed"
          style={completed ? active : inactive}
        >
          completed
        </button>
        <button
          onClick={toggleCompleted}
          className="btn inprogress"
          style={!completed ? active : inactive}
        >
          in progress{" "}
        </button>
      </div>
      {state &&
        state.map((item) => {
          if (item.completed === completed)
            return <Todo todo={item} key={item.id} dispatch={dispatch} />;
        })}
    </div>
  );
}

export default App;

const active = {
  backgroundColor: "green",
  color: "white",
};

const inactive = {
  backgroundColor: "white",
  color: "black",
};

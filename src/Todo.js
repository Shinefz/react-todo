import React from "react";
import { Actions } from "./App";
export default function Todo({ todo, dispatch }) {
  return (
    <div className="todos">
      <div
        style={{ color: todo.completed ? "grey" : "black" }}
        className="todo-name"
      >
        {todo.name}
      </div>
      <div className="icons">
        <img
          src="https://image.flaticon.com/icons/svg/715/715750.svg"
          alt="edit-icon"
          onClick={() => dispatch({ type: Actions.EDIT_TODO, id: todo.id })}
          className="edit-icon"
        />
      </div>
      <div className="icons">
        <img
          src="https://image.flaticon.com/icons/svg/1828/1828843.svg"
          alt="delete-icon"
          className="delete-icon"
          onClick={() => dispatch({ type: Actions.DELETE_TODO, id: todo.id })}
        />
      </div>
    </div>
  );
}

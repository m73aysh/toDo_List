import React, { useState } from "react";

export default function Add(props) {
  const [newtitle, setNewtitle] = useState("");

  const creatNewTodo = () => {
    console.log("create new task");
    props.createFunction({ title: newtitle, isCompleted: false });
  };

  return (
    <div className="Add">
      <div class="form-floating m-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="Write new task"
          onChange={(e) => {
            setNewtitle(e.target.value);
          }}
        />
        <label for="floatingInput">Write new task</label>
      </div>

      <button className="button m-3" onClick={creatNewTodo}>
        Add new task
      </button>
    </div>
  );
}

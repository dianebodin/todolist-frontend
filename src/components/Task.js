import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Task = (props) => {

  const { tasks, handleClickCheck, handleClickRemove } = props;


  return (
    <ul>
      {tasks.length > 0 && tasks.map((task, i) => {
        return (
          <li key={i} style={{ backgroundColor: task.done ? "#f2f2f2" : "white" }}>
            <div className="task">

              <span key={i}>
                {task.title}
              </span>
              <span>
                <FontAwesomeIcon icon="trash" onClick={() => handleClickRemove(task._id)} className="trash" />
                <FontAwesomeIcon icon="check" onClick={() => handleClickCheck(task._id)} className="check" style={{ color: task.done ? "#5c47d3" : "black" }} />
              </span>

            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Task;
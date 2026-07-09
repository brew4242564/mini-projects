import styles from "./Task.module.css";
import { Trash } from "lucide-react";
import { HoverIcon } from "../HoverIcon/HoverIcon";
const Task = ({ taskName, deleteTask, taskID, toggleTask, taskDone }) => {
  console.log(taskDone);

  return (
    <tr className={styles.container}>
      <td className={taskDone ? styles.done : ""}>
        <span>{taskName}</span>
      </td>
      <td className={styles.action}>
        <input
          type="checkbox"
          checked={taskDone}
          onChange={() => toggleTask(taskID)}
          className={styles.checkbox}
        ></input>
        <button onClick={() => deleteTask(taskID)} className={styles.btn}>
          <HoverIcon
            default={Trash}
            hovered={Trash}
            hoveredProps={{ color: "red" }}
          />
        </button>
      </td>
    </tr>
  );
};

export default Task;

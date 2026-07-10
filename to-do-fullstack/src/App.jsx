import { useState, useEffect } from "react";
import Table from "./components/Table/Table";
import Task from "./components/Task/Task";
import "./App.css";
import { supabase } from "./services/supabaseClient";
import {
  insertTask,
  removeTask,
  updateTaskDone,
  fetchTasks,
} from "./services/taskService";
function App() {
  const [list, setLists] = useState([]);
  const [inputValue, setInputValue] = useState("");

  
  useEffect(() => {
    const fetchTask = async () => {
      const { data, error } = await fetchTasks();

      if (error) {
        console.error("Error fetching task: ", error);
        return;
      }
      setLists(data);
    };
    fetchTask();
  }, []);

  const addTask = async () => {
    if (inputValue === "") return;
    try {
      const { data, error } = await insertTask(inputValue);
      if (error) {
        console.error("Error adding task: ", error);
        return;
      }
      setLists([...list, data[0]]);
      setInputValue("");
    } catch (err) {
      console.error("addTask Error: ", err);
    }
  };

  const toggleTask = async (taskID) => {
    const task = list.find((l) => l.id === taskID);
    try {
      const { error } = await updateTaskDone(taskID, !task.done);
      if (error) {
        console.error("Error actualizando tarea: ", error);
        return;
      }

      setLists((prevList) =>
        prevList.map((l) => (l.id === taskID ? { ...l, done: !l.done } : l)),
      );
    } catch (err) {
      console.error("toggleTask error: ", err);
    }
  };

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const deleteTask = async (taskID) => {
    try {
      const { error } = await removeTask(taskID);
      if (error) {
        console.error("Error deleting task", error);
      }
      setLists(list.filter((l) => l.id != taskID));
    } catch (err) {
      console.error("deleteTask: ", err);
    }
  };

  return (
    <>
      <h1 className="title">TO-DO</h1>
      <div className="add-form">
        <input type="text" onChange={handleInputValue} value={inputValue} />
        <button onClick={addTask}>Add</button>
      </div>
      <Table>
        {list.map((l) => (
          <Task
            taskName={l.text}
            key={l.id}
            taskID={l.id}
            deleteTask={deleteTask}
            taskDone={l.done}
            toggleTask={toggleTask}
          />
        ))}
      </Table>
    </>
  );
}

export default App;

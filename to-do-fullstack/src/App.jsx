import { useState, useEffect } from "react";
import Table from "./components/Table/Table";
import Task from "./components/Task/Task";
import "./App.css";
function App() {
  const [list, setLists] = useState(() => {
    const savedList = localStorage.getItem("taskList");
    return savedList ? JSON.parse(savedList) : [];
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(list));
  }, [list]);

  const addTask = () => {
    if (inputValue == "") return;
    const task = { name: inputValue, done: false, id: crypto.randomUUID() };
    setLists([...list, task]);
    setInputValue("");
  };

  const toggleTask = (taskID) => {
    setLists(list.map((l) => (l.id === taskID ? { ...l, done: !l.done } : l)));
    console.log(list)
  };

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const deleteTask = (taskID) => {
    setLists(list.filter((l) => l.id != taskID));
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
            taskName={l.name}
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

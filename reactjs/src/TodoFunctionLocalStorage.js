import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles";

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("taskList");
    return saved ? JSON.parse(saved) : [];
  });
  const [taskInput, setTaskInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (e) => setTaskInput(e.target.value);

  const saveTask = () => {
    if (!taskInput.trim()) return;
    const updatedTasks = editingIndex !== null
      ? tasks.map((task, i) => (i === editingIndex ? taskInput : task))
      : [...tasks, taskInput];

    setTasks(updatedTasks);
    setTaskInput("");
    setEditingIndex(null);
  };

  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  const startEditing = (index) => {
    setTaskInput(tasks[index]);
    setEditingIndex(index);
  };

  return (
    <div style={styles.container}>
      <h2>Todo List</h2>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={taskInput}
          onChange={handleChange}
          placeholder="Enter a task..."
        />
        <button style={styles.button} onClick={saveTask}>
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul style={styles.list}>
        {tasks.map((task, index) => (
          <li key={index} style={styles.item}>
            <span>{task}</span>
            <div>
              <button style={styles.editButton} onClick={() => startEditing(index)}>Edit</button>
              <button style={styles.deleteButton} onClick={() => deleteTask(index)}>X</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/" style={styles.link}>Back to Home</Link>
    </div>
  );
};



export default TodoApp;

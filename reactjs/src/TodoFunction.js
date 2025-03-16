import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles"; 

const TodoFunction = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => setInput(e.target.value);

  const addOrUpdateTask = () => {
    if (input.trim()) {
      let updatedTasks = [...tasks];
      if (editIndex !== null) {
        updatedTasks[editIndex] = input;
      } else {
        updatedTasks.push(input);
      }
      setTasks(updatedTasks);
      setInput("");
      setEditIndex(null);
    }
  };

  const removeTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  const editTask = (index) => {
    setInput(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Todo without LocalStorage</h2>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={handleChange}
          placeholder="Add a task..."
        />
        <button style={styles.button} onClick={addOrUpdateTask}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul style={styles.list}>
        {tasks.map((task, index) => (
          <li style={styles.item} key={index}>
            <span style={styles.taskText}>{task}</span>
            <div>
              <button style={styles.editButton} onClick={() => editTask(index)}>
                Edit
              </button>
              <button style={styles.deleteButton} onClick={() => removeTask(index)}>
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <Link to="/" style={styles.backButton}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default TodoFunction;

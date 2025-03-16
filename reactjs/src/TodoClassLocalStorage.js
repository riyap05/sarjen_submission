
import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles"; 
class TodoClass extends Component {
  constructor(props) {
    super(props);
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.state = {
      tasks: savedTasks,
      input: "",
      editIndex: null,
    };
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  addOrUpdateTask = () => {
    if (this.state.input.trim()) {
      let updatedTasks;
      if (this.state.editIndex !== null) {
        updatedTasks = [...this.state.tasks];
        updatedTasks[this.state.editIndex] = this.state.input;
      } else {
        updatedTasks = [...this.state.tasks, this.state.input];
      }
      this.setState({ tasks: updatedTasks, input: "", editIndex: null }, () => {
        localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
      });
    }
  };

  removeTask = (index) => {
    const updatedTasks = this.state.tasks.filter((_, i) => i !== index);
    this.setState({ tasks: updatedTasks }, () => {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    });
  };

  editTask = (index) => {
    this.setState({ input: this.state.tasks[index], editIndex: index });
  };

  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.header}>Todo with LocalStorage</h2>
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            value={this.state.input}
            onChange={this.handleChange}
            placeholder="Add a task..."
          />
          <button style={styles.button} onClick={this.addOrUpdateTask}>
            {this.state.editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
        <ul style={styles.list}>
          {this.state.tasks.map((task, index) => (
            <li style={styles.item} key={index}>
              <span style={styles.taskText}>{task}</span>
              <div>
                <button
                  style={styles.editButton}
                  onClick={() => this.editTask(index)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => this.removeTask(index)}
                >
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
  }
}
export default TodoClass;

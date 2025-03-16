
import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles"; 
class TodoClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      input: "",
      editIndex: null,
    };
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  addOrUpdateTask = () => {
    if (this.state.input.trim()) {
      if (this.state.editIndex !== null) {
        const updatedTasks = [...this.state.tasks];
        updatedTasks[this.state.editIndex] = this.state.input;
        this.setState({ tasks: updatedTasks, input: "", editIndex: null });
      } else {
        this.setState((prevState) => ({
          tasks: [...prevState.tasks, prevState.input],
          input: "",
        }));
      }
    }
  };

  removeTask = (index) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((_, i) => i !== index),
    }));
  };

  editTask = (index) => {
    this.setState({ input: this.state.tasks[index], editIndex: index });
  };

  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.header}>Todo without localstorage</h2>
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
        <Link to="/" style={styles.link}>Back to Home</Link>
        </div>
      </div>
    );
  }
}

export default TodoClass;

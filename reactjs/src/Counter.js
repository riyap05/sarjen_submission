import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles"; 

class Counter extends Component {
  constructor(props) {
    super(props);
    const storedCount = localStorage.getItem("count");
    this.state = {
      count: storedCount ? parseInt(storedCount) : 0,
    };
  }

  increment = () => {
    this.setState((prevState) => {
      const newCount = prevState.count + 1;
      localStorage.setItem("count", newCount);
      return { count: newCount };
    });
  };

  decrement = () => {
    this.setState((prevState) => {
      const newCount = prevState.count - 1;
      localStorage.setItem("count", newCount);
      return { count: newCount };
    });
  };

  reset = () => {
    localStorage.setItem("count", 0);
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Counter: {this.state.count}</h1>
        <div style={styles.buttonContainer}>
          <button
            onClick={this.increment}
            style={{ ...styles.button, ...styles.incrementButton }}
          >
            +
          </button>
          <button
            onClick={this.decrement}
            style={{ ...styles.button, ...styles.decrementButton }}
          >
            -
          </button>
          <button
            onClick={this.reset}
            style={{ ...styles.button, ...styles.resetButton }}
          >
            Reset
          </button>
        </div>
        <Link to="/" style={styles.link}>
          Back to Home
        </Link>
      </div>
    );
  }
}

export default Counter;

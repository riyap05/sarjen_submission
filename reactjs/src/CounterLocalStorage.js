import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles"; 


class CounterLocalStorage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const storedCount = localStorage.getItem("count");
    if (storedCount) {
      this.setState({ count: parseInt(storedCount) });
    }
  }

  updateCount = (newCount) => {
    this.setState({ count: newCount });
    localStorage.setItem("count", newCount);
  };

  increment = () => this.updateCount(this.state.count + 1);
  decrement = () => this.updateCount(this.state.count - 1);
  reset = () => this.updateCount(0);

  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.counter}>Counter: {this.state.count}</h1>
        <div>
          <button onClick={this.increment} style={styles.button}>
            +
          </button>
          <button
            onClick={this.decrement}
            style={{ ...styles.button, backgroundColor: "#ff6b6b" }}
          >
            -
          </button>
          <button
            onClick={this.reset}
            style={{ ...styles.button, backgroundColor: "#f7b731" }}
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

export default CounterLocalStorage;

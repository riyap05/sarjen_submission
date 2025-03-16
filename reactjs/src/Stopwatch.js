import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles"; 
class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isRunning: false,
    };
    this.timer = null;
  }

  handleStart = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.timer = setInterval(() => {
        this.setState((prevState) => ({ time: prevState.time + 1 }));
      }, 1000);
    }
  };

  handleStop = () => {
    this.setState({ isRunning: false });
    clearInterval(this.timer);
  };

  handleReset = () => {
    this.setState({ time: 0, isRunning: false });
    clearInterval(this.timer);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Stopwatch</h1>
        <p style={styles.timeDisplay}>{this.state.time} s</p>
        <div style={styles.buttonGroup}>
          <button
            onClick={this.handleStart}
            style={{ ...styles.button, ...styles.startButton }}
          >
            Start
          </button>
          <button
            onClick={this.handleStop}
            style={{ ...styles.button, ...styles.stopButton }}
          >
            Stop
          </button>
          <button
            onClick={this.handleReset}
            style={{ ...styles.button, ...styles.resetButton }}
          >
            Reset
          </button>
        </div>
        <Link to="/" style={styles.backButton}>
          Back to Home
        </Link>
      </div>
    );
  }
}

export default Stopwatch;

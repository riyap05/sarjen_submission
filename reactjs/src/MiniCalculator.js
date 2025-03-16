import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles"; 

class MiniCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: "",
      num2: "",
      result: "",
    };
  }

  calculate = (operator) => {
    const { num1, num2 } = this.state;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      this.setState({ result: "Invalid Input" });
      return;
    }

    let res = 0;
    switch (operator) {
      case "+":
        res = n1 + n2;
        break;
      case "-":
        res = n1 - n2;
        break;
      case "*":
        res = n1 * n2;
        break;
      case "/":
        res = n2 !== 0 ? n1 / n2 : "Error";
        break;
      default:
        res = "Invalid";
    }

    this.setState({ result: res });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Mini Calculator</h2>
        <input
          type="number"
          name="num1"
          value={this.state.num1}
          onChange={this.handleChange}
          placeholder="Enter number"
          style={styles.input}
        />
        <input
          type="number"
          name="num2"
          value={this.state.num2}
          onChange={this.handleChange}
          placeholder="Enter number"
          style={styles.input}
        />
        <div>
          <button onClick={() => this.calculate("+")} style={styles.button}>
            +
          </button>
          <button onClick={() => this.calculate("-")} style={styles.button}>
            -
          </button>
          <button onClick={() => this.calculate("*")} style={styles.button}>
            ×
          </button>
          <button onClick={() => this.calculate("/")} style={styles.button}>
            ÷
          </button>
        </div>
        <h3 style={styles.result}>Result: {this.state.result}</h3>
        <Link to="/" style={styles.link}>Back to Home</Link>
      </div>
    );
  }
}



export default MiniCalculator;

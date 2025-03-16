import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles"; 

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "",
      city: "",
      hobbies: [],
      mobile: "",
      email: "",
      errors: {},
    };
  }

  validateField = (name, value) => {
    let errors = { ...this.state.errors };

    switch (name) {
      case "name":
        errors.name =
          value === ""
            ? "Name is required"
            : /^[A-Za-z]{2,}$/.test(value)
            ? ""
            : "Name must be at least 2 characters and contain only letters";
        break;
      case "mobile":
        errors.mobile =
          value === ""
            ? "Mobile number is required"
            : /^[0-9]{10}$/.test(value)
            ? ""
            : "Mobile number must be exactly 10 digits";
        break;
      case "email":
        errors.email =
          value === ""
            ? "Email is required"
            : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "Enter a valid email";
        break;
      case "gender":
        errors.gender = value ? "" : "Please select a gender";
        break;
      case "city":
        errors.city = value ? "" : "Please select a city";
        break;
      default:
        break;
    }
    this.setState({ errors });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => this.validateField(name, value));
  };

  handleHobbyChange = (e) => {
    const { hobbies } = this.state;
    const value = e.target.value;
    const updatedHobbies = e.target.checked
      ? [...hobbies, value]
      : hobbies.filter((hobby) => hobby !== value);
    this.setState({ hobbies: updatedHobbies });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!this.state.name) errors.name = "Name is required";
    if (!this.state.gender) errors.gender = "Please select a gender";
    if (!this.state.city) errors.city = "Please select a city";
    if (!this.state.hobbies.length)
      errors.hobbies = "Select at least one hobby";
    if (!/^[0-9]{10}$/.test(this.state.mobile))
      errors.mobile = "Mobile number must be exactly 10 digits";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email))
      errors.email = "Enter a valid email";

    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      alert("Form submitted successfully!");
      this.setState({
        name: "",
        gender: "",
        city: "",
        hobbies: [],
        mobile: "",
        email: "",
        errors: {},
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={styles.formContainer}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          style={styles.input}
        />
        {this.state.errors.name && (
          <span style={styles.error}>{this.state.errors.name}</span>
        )}
        <label style={styles.label}>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={this.state.gender === "Male"}
          onChange={this.handleChange}
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={this.state.gender === "Female"}
          onChange={this.handleChange}
        />{" "}
        Female
        {this.state.errors.gender && (
          <span style={styles.error}>{this.state.errors.gender}</span>
        )}
        <label style={styles.label}>City:</label>
        <select
          name="city"
          value={this.state.city}
          onChange={this.handleChange}
          style={styles.input}
        >
          <option value="">Select City</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Vadodara">Vadodara</option>
          <option value="Rajkot">Rajkot</option>
        </select>
        {this.state.errors.city && (
          <span style={styles.error}>{this.state.errors.city}</span>
        )}
        <label style={styles.label}>Hobbies:</label>
        <input
          type="checkbox"
          value="Reading"
          checked={this.state.hobbies.includes("Reading")}
          onChange={this.handleHobbyChange}
        />{" "}
        Reading
        <input
          type="checkbox"
          value="Painting"
          checked={this.state.hobbies.includes("Painting")}
          onChange={this.handleHobbyChange}
        />{" "}
        Traveling
        <input
          type="checkbox"
          value="Dancing"
          checked={this.state.hobbies.includes("Dancing")}
          onChange={this.handleHobbyChange}
        />{" "}
        Gaming
        {this.state.errors.hobbies && (
          <span style={styles.error}>{this.state.errors.hobbies}</span>
        )}
        <label style={styles.label}>Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={this.state.mobile}
          onChange={this.handleChange}
          style={styles.input}
        />
        {this.state.errors.mobile && (
          <span style={styles.error}>{this.state.errors.mobile}</span>
        )}
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          style={styles.input}
        />
        {this.state.errors.email && (
          <span style={styles.error}>{this.state.errors.email}</span>
        )}
        <button type="submit" style={styles.button}>
          Submit
        </button>
        <div>
        <Link to="/" style={styles.link}>Back to Home</Link>
        </div>
      </form>
    );
  }
}

export default InputForm;

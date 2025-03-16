import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles"; 

const CRUDApp = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.name)) {
      setError("Name must contain only letters");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const addOrUpdateUser = () => {
    if (!validateForm()) return;
    let updatedUsers;
    if (editIndex !== null) {
      updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
    } else {
      updatedUsers = [...users, formData];
    }
    setUsers(updatedUsers);
    setFormData({
      name: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setEditIndex(null);
  };

  const removeUser = (index) => setUsers(users.filter((_, i) => i !== index));

  const editUser = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>User Management</h2>
      <div style={styles.formContainer}>
        <input
          style={styles.input}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <select
          style={styles.input}
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          style={styles.input}
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          style={styles.input}
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        {error && <p style={styles.error}>{error}</p>}
        <button style={styles.button} onClick={addOrUpdateUser}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Gender</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.gender}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>
                <button
                  style={styles.editButton}
                  onClick={() => editUser(index)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => removeUser(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <Link to="/" style={styles.link}>Back to Home</Link>
      </div>
    </div>
  );
};

export default CRUDApp;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles"; 


const CrudApi = () => {
  const [editAddModal, setEditAddModal] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState({ todo_list: [] });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://akashsir.in/myapi/crud/todo-list-api.php")
      .then((res) => setData(res.data));
  };

  const handleClose = () => {
    setEditAddModal(false);
    setDeleteTask(false);
    setId("");
    setTitle("");
    setDescription("");
    setEditMode(false);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("todo_title", title);
    formData.append("todo_details", description);

    if (editMode) {
      formData.append("todo_id", id);
      axios
        .post("https://akashsir.in/myapi/crud/todo-update-api.php", formData)
        .then(() => {
          setEditAddModal(false);
          fetchData();
        });
    } else {
      axios
        .post("https://akashsir.in/myapi/crud/todo-add-api.php", formData)
        .then(() => {
          setEditAddModal(false);
          fetchData();
        });
    }
  };

  const handleEdit = (id) => {
    axios
      .get(`https://akashsir.in/myapi/crud/todo-detail-api.php?todo_id=${id}`)
      .then((res) => {
        setEditAddModal(true);
        setEditMode(true);
        setId(id);
        setTitle(res.data.todo_title);
        setDescription(res.data.todo_details);
      });
  };

  const handleDelete = (id) => {
    setDeleteTask(true);
    setId(id);
  };

  const deleteData = () => {
    const formData = new FormData();
    formData.append("todo_id", id);
    axios
      .post("https://akashsir.in/myapi/crud/todo-delete-api.php", formData)
      .then(() => {
        setDeleteTask(false);
        fetchData();
      });
  };

  return (
    <div style={styles.container}>
      <h2>CRUD Operations with help of API</h2>
      <button
        style={{ ...styles.button, ...styles.addButton }}
        onClick={() => setEditAddModal(true)}
      >
        Add New Item
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.thTd}>ID</th>
            <th style={styles.thTd}>Title</th>
            <th style={styles.thTd}>Details</th>
            <th style={styles.thTd}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.todo_list?.map((item) => (
            <tr key={item.todo_id}>
              <td style={styles.thTd}>{item.todo_id}</td>
              <td style={styles.thTd}>{item.todo_title}</td>
              <td style={styles.thTd}>{item.todo_details}</td>
              <td style={styles.thTd}>
                <button
                  style={{ ...styles.button, ...styles.editButton }}
                  onClick={() => handleEdit(item.todo_id)}
                >
                  Edit
                </button>
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onClick={() => handleDelete(item.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editAddModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>{editMode ? "Edit" : "Add"} Item</h3>
            <input
              style={styles.input}
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              style={styles.input}
              type="text"
              placeholder="Details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div style={styles.modalButtons}>
              <button style={styles.closeButton} onClick={handleClose}>
                Cancel
              </button>
              <button style={styles.saveButton} onClick={handleSubmit}>
                {editMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTask && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Delete Confirmation</h3>
            <p>Are you sure you want to delete this item?</p>
            <div style={styles.modalButtons}>
              <button style={styles.closeButton} onClick={handleClose}>
                No
              </button>
              <button style={styles.deleteButton} onClick={deleteData}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
      <Link to="/" style={styles.link}>Back to Home</Link>
      </div>
    </div>
  );
};

export default CrudApi;

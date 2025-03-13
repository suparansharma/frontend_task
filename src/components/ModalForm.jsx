import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalForm = ({ onSubmit }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    isbn: "",
    publish_date: "",
    status: "Available",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call handleSubmit from App.js
    handleClose();
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-primary" onClick={handleShow}>
        Open Modal Form
      </button>

      {show && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Book</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ISBN</label>
                    <input
                      type="text"
                      className="form-control"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Publish Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="publish_date"
                      value={formData.publish_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-control"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="Available">Available</option>
                      <option value="Checked Out">Checked Out</option>
                      <option value="Reserved">Reserved</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={handleClose}>
                    Close
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalForm;

import React, { useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import ModalForm from "./components/ModalForm";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa"; // Importing Font Awesome icons
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      name: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "9780743273565",
      publish_date: "1925-04-10",
      status: "Available",
    },
    {
      id: 2,
      name: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "9780061120084",
      publish_date: "1960-07-11",
      status: "Checked Out",
    },
  ]);

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8000/api/books", formData);
      console.log(response);
      setBooks([...books, { id: response.data.id, ...formData }]);
      alert("Book created successfully!");
    } catch (error) {
      console.error("Error creating book:", error);
      alert("Failed to create book.");
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://your-api-url.com/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
      alert("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book.");
    }
  };

  const handleView = (book) => {
    alert(`Viewing Book: ${book.name}`);
  };

  const handleEdit = (book) => {
    alert(`Editing Book: ${book.name}`);
  };

  const columns = [
    { name: "Title", selector: (row) => row.name, sortable: true },
    { name: "Author", selector: (row) => row.author, sortable: true },
    { name: "ISBN", selector: (row) => row.isbn, sortable: true },
    { name: "Publish Date", selector: (row) => row.publish_date, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-info btn-sm" onClick={() => handleView(row)}>
            <FaEye /> {/* View Icon */}
          </button>
          <button className="btn btn-warning btn-sm" onClick={() => handleEdit(row)}>
            <FaEdit /> {/* Edit Icon */}
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
            <FaTrashAlt /> {/* Delete Icon */}
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Book List</h2>

      <ModalForm onSubmit={handleSubmit} />

      <DataTable
        title="Books"
        columns={columns}
        data={books}
        pagination
        responsive
        highlightOnHover
      />
    </div>
  );
}

export default App;

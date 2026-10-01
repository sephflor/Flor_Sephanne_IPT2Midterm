import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/sessions";

function App() {
  const [sessions, setSessions] = useState([]);

  const [form, setForm] = useState({
    unit_number: "",
    customer: "",
    time_started: "",
    hours: "",
    amount: "",
  });

  const [editingId, setEditingId] = useState(null);

  // =========================
  // GET - Fetch Sessions
  // =========================
  const fetchSessions = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // =========================
  // Handle Input
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // POST / PUT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = editingId ? "PUT" : "POST";

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unit_number: form.unit_number,
          customer: form.customer,
          time_started: form.time_started,
          hours: Number(form.hours),
          amount: Number(form.amount),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save session");
      }

      alert(
        editingId
          ? "Session updated successfully!"
          : "Session added successfully!"
      );

      resetForm();
      fetchSessions();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this session?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete session");
      }

      alert("Session deleted successfully!");

      fetchSessions();
    } catch (error) {
      console.error(error);
      alert("Failed to delete session.");
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (session) => {
    setEditingId(session.id);

    setForm({
      unit_number: session.unit_number,
      customer: session.customer,
      time_started: session.time_started
        ? session.time_started.slice(0, 16)
        : "",
      hours: session.hours,
      amount: session.amount,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setEditingId(null);

    setForm({
      unit_number: "",
      customer: "",
      time_started: "",
      hours: "",
      amount: "",
    });
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div>
          <h1>💻 Computer Shop Time Log</h1>
          <p>Manage computer shop customer sessions</p>
        </div>
      </header>

      <main className="container">

        {/* FORM */}
        <section className="card">

          <h2>
            {editingId
              ? "✏️ Update Session"
              : "➕ Add New Session"}
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">
                <label>Unit Number</label>

                <input
                  type="text"
                  name="unit_number"
                  placeholder="Example: PC-01"
                  value={form.unit_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Customer</label>

                <input
                  type="text"
                  name="customer"
                  placeholder="Customer name"
                  value={form.customer}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Time Started</label>

                <input
                  type="datetime-local"
                  name="time_started"
                  value={form.time_started}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Hours</label>

                <input
                  type="number"
                  name="hours"
                  step="0.5"
                  min="0.5"
                  placeholder="Example: 2"
                  value={form.hours}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Amount</label>

                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  min="0"
                  placeholder="Example: 40.00"
                  value={form.amount}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="buttons">

              <button
                type="submit"
                className="btn primary"
              >
                {editingId
                  ? "Update Session"
                  : "Add Session"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn cancel"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>

        {/* TABLE */}
        <section className="card">

          <div className="table-header">

            <div>
              <h2>📋 Session Records</h2>

              <p>
                Total Sessions: <strong>
                  {sessions.length}
                </strong>
              </p>
            </div>

            <button
              className="btn refresh"
              onClick={fetchSessions}
            >
              🔄 Refresh
            </button>

          </div>

          {sessions.length === 0 ? (

            <div className="empty">
              <h3>No sessions found</h3>
              <p>Add your first computer shop session above.</p>
            </div>

          ) : (

            <div className="table-container">

              <table>

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Unit</th>
                    <th>Customer</th>
                    <th>Time Started</th>
                    <th>Hours</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {sessions.map((session) => (

                    <tr key={session.id}>

                      <td>{session.id}</td>

                      <td>
                        <span className="unit">
                          {session.unit_number}
                        </span>
                      </td>

                      <td>{session.customer}</td>

                      <td>
                        {new Date(
                          session.time_started
                        ).toLocaleString()}
                      </td>

                      <td>
                        {session.hours}
                      </td>

                      <td className="amount">
                        ₱{Number(session.amount).toFixed(2)}
                      </td>

                      <td>

                        <div className="actions">

                          <button
                            className="btn edit"
                            onClick={() =>
                              handleEdit(session)
                            }
                          >
                            ✏️ Edit
                          </button>

                          <button
                            className="btn delete"
                            onClick={() =>
                              handleDelete(session.id)
                            }
                          >
                            🗑️ Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default App;
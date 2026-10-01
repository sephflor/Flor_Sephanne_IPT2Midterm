import { useState } from "react";

function SessionForm() {
  const [formData, setFormData] = useState({
    unitNumber: "",
    customer: "",
    timeStarted: "",
    hours: "",
    amount: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("Form submitted successfully.");

    console.log("Session data:", formData);
  };

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <h2>New Computer Session</h2>
          <p>Record a customer's computer usage</p>
        </div>
      </div>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      <form className="session-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="unitNumber">
            Unit Number
          </label>

          <input
            type="text"
            id="unitNumber"
            name="unitNumber"
            value={formData.unitNumber}
            onChange={handleChange}
            placeholder="Example: PC-01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="customer">
            Customer Name
          </label>

          <input
            type="text"
            id="customer"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            placeholder="Enter customer name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="timeStarted">
            Time Started
          </label>

          <input
            type="datetime-local"
            id="timeStarted"
            name="timeStarted"
            value={formData.timeStarted}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="hours">
            Hours
          </label>

          <input
            type="number"
            id="hours"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            placeholder="Example: 2"
            min="0"
            step="0.5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">
            Amount
          </label>

          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Example: 50.00"
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
          >
            + Add Session
          </button>
        </div>
      </form>
    </section>
  );
}

export default SessionForm;
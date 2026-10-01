function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div>
          <h1>Computer Shop Time Log</h1>
          <p>Manage customer computer sessions</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container">

        {/* Dashboard Statistics */}
        <section className="dashboard">
          <div className="stat-card">
            <div className="stat-icon">🖥️</div>
            <div>
              <p>Total Sessions</p>
              <h2>0</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div>
              <p>Total Hours</p>
              <h2>0.00</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">₱</div>
            <div>
              <p>Total Amount</p>
              <h2>₱0.00</h2>
            </div>
          </div>
        </section>

        {/* Session Form */}
        <section className="card">
          <div className="section-header">
            <div>
              <h2>New Computer Session</h2>
              <p>Record a customer's computer usage</p>
            </div>
          </div>

          <form className="session-form">

            <div className="form-group">
              <label htmlFor="unitNumber">
                Unit Number
              </label>

              <input
                type="text"
                id="unitNumber"
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="hours">
                Hours
              </label>

              <input
                type="number"
                id="hours"
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
                placeholder="Example: 50.00"
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                + Add Session
              </button>
            </div>

          </form>
        </section>

        {/* Session Table */}
        <section className="card">
          <div className="section-header">
            <div>
              <h2>Computer Sessions</h2>
              <p>View and manage customer sessions</p>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Unit</th>
                  <th>Customer</th>
                  <th>Time Started</th>
                  <th>Hours</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan="6" className="empty-message">
                    No computer sessions found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;
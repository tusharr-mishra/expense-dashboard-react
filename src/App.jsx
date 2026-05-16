import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryPanel from "./components/SummaryPanel";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  const [expenses, setExpenses] = useState([]);

  // Persist theme preference across sessions
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply dark class to root and save preference
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleAddExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  // Calculate total across all expenses
  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="app-root">

      {/* ── HEADER ── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-icon">₹</div>
            <span className="brand-name">ExpenseDesk</span>
          </div>

          <div className="header-right">
            <span className="date-pill">
              <span>📅</span>
              {today}
            </span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
              title="Toggle theme"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="app-main">
        <div className="page-container">

          {/* Page title + running total */}
          <div className="page-title-row">
            <div className="page-title-left">
              <h1 className="page-title">My Dashboard</h1>
              <p className="page-subtitle">Track, manage and review your daily expenses.</p>
            </div>
            <div className="total-badge">
              Total: ₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
          </div>

          {/* Two-column layout — sidebar + main content */}
          <div className="dashboard-grid">

            {/* ── LEFT SIDEBAR ── */}
            <aside className="sidebar">
              <ExpenseForm onAddExpense={handleAddExpense} />
              <SummaryPanel expenses={expenses} />
              <CurrencyConverter totalAmount={totalAmount} />
            </aside>

            {/* ── RIGHT: Expense list ── */}
            <section className="main-content">
              <ExpenseList
                expenses={expenses}
                onDeleteExpense={handleDeleteExpense}
              />
            </section>

          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="app-footer">
        <div className="footer-inner">
          <span className="footer-text">
            Built by <strong>Tushar Mishra</strong>
          </span>
          <span className="footer-text">
            React · Vite · Frankfurter API
          </span>
        </div>
      </footer>

    </div>
  );
}

export default App;

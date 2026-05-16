import { useState } from "react";

const categories = [
  { label: "Food 🍔", value: "Food" },
  { label: "Travel ✈️", value: "Travel" },
  { label: "Utilities 💡", value: "Utilities" },
  { label: "Marketing 📈", value: "Marketing" },
  { label: "Other 📝", value: "Other" },
];

function ExpenseForm({ onAddExpense }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !amount || Number(amount) <= 0) {
      alert("Please enter a valid expense name and amount.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: name.trim(),
      amount: parseFloat(Number(amount).toFixed(2)),
      category,
    };

    onAddExpense(newExpense);
    setName("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <div className="card">

      {/* Card header */}
      <div className="form-card-header">
        <div className="form-card-icon">✏️</div>
        <div>
          <h2>Add Expense</h2>
          <p className="card-subtitle">Log a new transaction</p>
        </div>
      </div>

      <div className="card-divider" />

      {/* Form fields */}
      <form onSubmit={handleSubmit} className="expense-form">

        <div className="form-group">
          <label htmlFor="expense-name" className="form-label">
            Expense Name
          </label>
          <input
            id="expense-name"
            type="text"
            placeholder="e.g. Lunch, Uber, Internet"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expense-amount" className="form-label">
            Amount <span className="form-label-note">(₹)</span>
          </label>
          <input
            id="expense-amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expense-category" className="form-label">
            Category
          </label>
          <select
            id="expense-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary">
          + Add Expense
        </button>

      </form>
    </div>
  );
}

export default ExpenseForm;

// Emoji per category
const categoryEmojis = {
  Food: "🍔",
  Travel: "✈️",
  Utilities: "💡",
  Marketing: "📈",
  Other: "📝",
};

function ExpenseList({ expenses, onDeleteExpense }) {

  // Empty state
  if (expenses.length === 0) {
    return (
      <div className="card expense-list-empty">
        <div className="empty-icon">📋</div>
        <p className="empty-title">No expenses yet</p>
        <p className="empty-subtitle">
          Add your first expense using the form on the left.
        </p>
      </div>
    );
  }

  return (
    <div className="card">

      {/* Header */}
      <div className="list-card-header">
        <div className="form-card-header">
          <div className="form-card-icon">📋</div>
          <div>
            <h2>Your Expenses</h2>
            <p className="card-subtitle">All recent transactions</p>
          </div>
        </div>
        <span className="item-count-badge">
          {expenses.length} {expenses.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="card-divider" />

      {/* Expense rows */}
      <div className="expense-rows">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-row">

            {/* Category color bar */}
            <div className={`category-bar category-bar-${expense.category.toLowerCase()}`} />

            {/* Emoji */}
            <div className="expense-emoji">
              {categoryEmojis[expense.category] || "📝"}
            </div>

            {/* Name + category label */}
            <div className="expense-info">
              <p className="expense-name">{expense.name}</p>
              <p className="expense-category">{expense.category}</p>
            </div>

            {/* Amount */}
            <span className="expense-amount">
              ₹{expense.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>

            {/* Delete */}
            <button
              onClick={() => onDeleteExpense(expense.id)}
              className="delete-btn"
              title="Delete expense"
            >
              ✕
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default ExpenseList;

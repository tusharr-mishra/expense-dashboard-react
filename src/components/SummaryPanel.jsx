// Emoji per category
const categoryEmojis = {
  Food: "🍔",
  Travel: "✈️",
  Utilities: "💡",
  Marketing: "📈",
  Other: "📝",
};

function SummaryPanel({ expenses }) {
  // Total across all entries
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Group amounts by category
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  return (
    <div className="card">

      {/* Card header */}
      <div className="form-card-header">
        <div className="form-card-icon">💵</div>
        <div>
          <h2>Summary</h2>
          <p className="card-subtitle">Spending breakdown</p>
        </div>
      </div>

      <div className="card-divider" />

      {/* Total block */}
      <div className="summary-total-block">
        <div>
          <p className="summary-total-label">Total Spent</p>
          <p className="summary-total-amount">
            ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="summary-entries">
          <p className="summary-entries-label">Entries</p>
          <p className="summary-entries-count">{expenses.length}</p>
        </div>
      </div>

      {/* Category breakdown header */}
      <div className="summary-breakdown-header">
        <p className="summary-section-label">By Category</p>
        <span className="summary-active-count">
          {Object.keys(categoryTotals).length} active
        </span>
      </div>

      {/* Empty state */}
      {Object.keys(categoryTotals).length === 0 ? (
        <div className="summary-empty">
          <p>No data yet — add an expense to see breakdown.</p>
        </div>
      ) : (
        <div className="category-list">
          {Object.entries(categoryTotals).map(([category, amount]) => {
            const percentage = total > 0 ? (amount / total) * 100 : 0;

            return (
              <div key={category} className="category-item">

                {/* Row: name + percentage + amount */}
                <div className="category-item-row">
                  <div className="category-item-left">
                    <span className="category-emoji">
                      {categoryEmojis[category] || "📝"}
                    </span>
                    <span className="category-name">{category}</span>
                  </div>
                  <div className="category-item-right">
                    <span className="category-percent">
                      {percentage.toFixed(0)}%
                    </span>
                    <span className="category-amount">
                      ₹{amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="progress-track">
                  <div
                    className={`progress-fill progress-fill-${category.toLowerCase()}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default SummaryPanel;

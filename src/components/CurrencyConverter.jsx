import { useState, useEffect } from "react";

const currencies = ["INR", "USD", "EUR", "GBP"];

const currencySymbols = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const currencyLabels = {
  INR: "Indian Rupee",
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
};

function CurrencyConverter({ totalAmount }) {
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // No API needed for INR to INR
    if (targetCurrency === "INR") {
      setRate(1);
      setError(null);
      setLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchRate = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.frankfurter.dev/v1/latest?from=INR&to=${targetCurrency}`
        );

        if (!response.ok) throw new Error("Failed to fetch rates");

        const data = await response.json();
        const fetchedRate = data.rates[targetCurrency];

        if (!isCancelled) {
          setRate(fetchedRate);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Unable to fetch exchange rates.");
          setRate(null);
          setLoading(false);
        }
      }
    };

    fetchRate();

    // Cleanup to avoid setting state on unmounted component
    return () => { isCancelled = true; };
  }, [targetCurrency]);

  const convertedAmount = rate !== null
    ? (totalAmount * rate).toFixed(2)
    : null;

  return (
    <div className="card">

      {/* Card header */}
      <div className="form-card-header">
        <div className="form-card-icon">💱</div>
        <div>
          <h2>Currency Converter</h2>
          <p className="card-subtitle">Live rates via Frankfurter</p>
        </div>
      </div>

      <div className="card-divider" />

      {/* Currency selector */}
      <div className="converter-selector-section">
        <p className="converter-section-label">Convert to</p>
        <div className="currency-btn-grid">
          {currencies.map((cur) => (
            <button
              key={cur}
              onClick={() => setTargetCurrency(cur)}
              className={`currency-btn ${targetCurrency === cur ? "currency-btn-active" : ""}`}
            >
              {currencySymbols[cur]} {cur}
            </button>
          ))}
        </div>
      </div>

      {/* Conversion result */}
      <div className="converter-result-box">
        {loading ? (
          <div className="converter-loading">
            <span className="spinner" />
            <p className="converter-loading-text">Fetching latest rates…</p>
          </div>
        ) : error ? (
          <p className="converter-error">{error}</p>
        ) : (
          <div>
            {/* From row */}
            <div className="converter-row">
              <p className="converter-currency-label">INR</p>
              <p className="converter-from-amount">
                ₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
            </div>

            {/* Arrow divider */}
            <div className="converter-arrow-row">
              <div className="converter-line" />
              <span className="converter-arrow">↓</span>
              <div className="converter-line" />
            </div>

            {/* To row */}
            <div className="converter-row">
              <div>
                <p className="converter-currency-label">{targetCurrency}</p>
                <p className="converter-currency-name">
                  {currencyLabels[targetCurrency]}
                </p>
              </div>
              <p className="converter-to-amount">
                {currencySymbols[targetCurrency]}
                {convertedAmount !== null
                  ? Number(convertedAmount).toLocaleString()
                  : "—"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Rate note */}
      {!loading && !error && rate !== null && targetCurrency !== "INR" && (
        <p className="converter-rate-note">
          1 INR = {rate.toFixed(5)} {targetCurrency}
        </p>
      )}

    </div>
  );
}

export default CurrencyConverter;

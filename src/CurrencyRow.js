import React from "react";
import "./CurrencyRow.css";

function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onAmountChange,
  } = props;
  return (
    <div className="currency_row">
      <input type="number" value={amount} onChange={onAmountChange} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyRow;

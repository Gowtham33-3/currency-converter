import React, { useState, useEffect } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";
const BASE_URL =
  "  http://api.exchangeratesapi.io/v1/latest?access_key=075b6544d0142b55cc7f3fd3e0279f8f";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [toCurrency, setToCurrency] = useState();
  const [fromCurrency, setFromCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [exchangeRates, setExchangeRates] = useState();
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRates;
  } else {
    fromAmount = amount / exchangeRates;
    toAmount = amount;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRates(data.rates[firstCurrency]);
      });
  }, []);
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}&base=${fromCurrency}?symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRates(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);
  function handleFromAmount(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmount(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }
  //http://api.exchangeratesapi.io/v1/latest

  // ? access_key = YOUR_ACCESS_KEY
  // & base = GBP
  // & symbols = USD,AUD,CAD,PLN,MXN
  return (
    <div className="app">
      <h1>CURRENCY CONVERTER</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onAmountChange={handleFromAmount}
      />
      <h1 className="equals">=</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        onAmountChange={handleToAmount}
      />
    </div>
  );
}

export default App;

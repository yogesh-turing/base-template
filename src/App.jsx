import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

// Currency conversion rates relative to USD
const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.90,
  GBP: 0.75,
  INR: 83.816
};

function CurrencyInput({ currency, value, onValueChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {currency}
      </label>
      <Input 
        type="number" 
        value={value} 
        onChange={(e) => onValueChange(currency, e.target.value)} 
        className="mt-1"
      />
    </div>
  );
}

function App() {
  const [amounts, setAmounts] = useState({
    USD: 0, EUR: 0, GBP: 0, INR: 0
  });

  // Function to convert currency
  const convertCurrency = (fromCurrency, amount) => {
    const usdValue = amount / CURRENCY_RATES[fromCurrency];
    return Object.keys(CURRENCY_RATES).reduce((acc, curr) => {
      if (curr === fromCurrency) {
        acc[curr] = (usdValue * CURRENCY_RATES[curr])  
      } else {
        acc[curr] = (usdValue * CURRENCY_RATES[curr]).toFixed(2);
      }
      return acc;
    }, {});
  };

  const handleAmountChange = (currency, value) => {
    const newAmounts = convertCurrency(currency, value);
    setAmounts(newAmounts);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Currency Converter</CardTitle>
        </CardHeader>
        <CardContent>
          {['USD', 'EUR', 'GBP', 'INR'].map(currency => (
            <CurrencyInput 
              key={currency} 
              currency={currency} 
              value={amounts[currency]} 
              onValueChange={handleAmountChange} 
            />
          ))}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={() => setAmounts({USD: 0, EUR: 0, GBP: 0, INR: 0})}>
            Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
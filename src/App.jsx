import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CURRENCIES = {
  USD: { rate: 1, symbol: '$' },
  EUR: { rate: 0.90, symbol: '€' },
  GBP: { rate: 0.75, symbol: '£' },
  INR: { rate: 83.816, symbol: '₹' }
};

function CurrencyInput({ currency, value, onChange, onSelect }) {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor={currency}>{currency}</Label>
      <div className="flex items-center">
        <span className="mr-2">{CURRENCIES[currency].symbol}</span>
        <Input
          id={currency}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="number"
          className="flex-grow"
        />
        <Button onClick={() => onSelect(currency)} variant="outline" className="ml-2">
          Select
        </Button>
      </div>
    </div>
  );
}

export default function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [conversions, setConversions] = useState({});

  useEffect(() => {
    if (amount && !isNaN(amount)) {
      const baseAmount = parseFloat(amount) / CURRENCIES[fromCurrency].rate;
      const newConversions = Object.keys(CURRENCIES).reduce((acc, curr) => {
        acc[curr] = (baseAmount * CURRENCIES[curr].rate).toFixed(2);
        return acc;
      }, {});
      setConversions(newConversions);
    } else {
      setConversions({});
    }
  }, [amount, fromCurrency]);

  const handleCurrencyChange = (currency) => {
    setFromCurrency(currency);
    setAmount(conversions[currency] || '');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Currency Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.keys(CURRENCIES).map(currency => (
            <CurrencyInput
              key={currency}
              currency={currency}
              value={conversions[currency] || ''}
              onChange={(value) => setAmount(value)}
              onSelect={handleCurrencyChange}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
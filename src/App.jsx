import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

import {
  Button, 
} from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

const InvoiceBuilder = () => {
  const [invoice, setInvoice] = useState({
    number: Math.floor(Math.random() * 10000),
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    tax: 0,
    client: { name: '', address: '', contact: '', email: '' },
    company: { name: '', address: '', bankName: '', accountNumber: '' },
    items: [{ name: '', quantity: 1, unitPrice: 0, itemPrice: 0 }],
  });

  const updateField = (field, value, section = null) => {
    if (section) {
      setInvoice(prev => ({...prev, [section]: {...prev[section], [field]: value}}));
    } else if (field === 'items') {
      setInvoice(prev => ({...prev, items: value}));
    } else {
      setInvoice({...invoice, [field]: value});
    }
  };

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, unitPrice: 0, itemPrice: 0 }]
    }));
  };

  const calculateTotal = () => {
    const subtotal = invoice.items.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice), 0);
    const taxAmount = subtotal * (invoice.tax / 100);
    return subtotal + taxAmount;
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Invoice Builder</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Invoice Details */}
          <div className="mb-4">
            <Label>Invoice Number: {invoice.number}</Label>
            <Input className="mt-2" type="date" value={invoice.date} onChange={(e) => updateField('date', e.target.value)} />
          </div>

          {/* Client Details */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Client Details</h3>
            {['name', 'address', 'contact', 'email'].map(field => (
              <Input key={field} placeholder={`Client ${field}`} value={invoice.client[field]} onChange={(e) => updateField(field, e.target.value, 'client')} />
            ))}
          </div>

          {/* Items */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Items</h3>
            {invoice.items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-2 mb-2">
                <Input placeholder="Name" value={item.name} onChange={(e) => {
                  let items = [...invoice.items];
                  items[idx].name = e.target.value;
                  items[idx].itemPrice = items[idx].unitPrice * items[idx].quantity;
                  updateField('items', items);
                }} />
                <Input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => {
                  let items = [...invoice.items];
                  items[idx].quantity = Number(e.target.value);
                  items[idx].itemPrice = items[idx].unitPrice * items[idx].quantity;
                  updateField('items', items);
                }} />
                <Input type="number" placeholder="Unit Price" value={item.unitPrice} onChange={(e) => {
                  let items = [...invoice.items];
                  items[idx].unitPrice = Number(e.target.value);
                  items[idx].itemPrice = items[idx].unitPrice * items[idx].quantity;
                  updateField('items', items);
                }} />
                <Label>Price: {item.itemPrice}</Label>
              </div>
            ))}
            <Button onClick={addItem}>Add Item</Button>
          </div>

          {/* Company Details */}
          <div>
            <h3 className="text-lg font-semibold">Company Details</h3>
            {['name', 'address', 'bankName', 'accountNumber'].map(field => (
              <Input key={field} placeholder={`Company ${field}`} value={invoice.company[field]} onChange={(e) => updateField(field, e.target.value, 'company')} />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={printInvoice}>Print Invoice</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default function App() {
  return <InvoiceBuilder />;
}
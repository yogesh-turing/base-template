import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter,
  Input,
  Button,
  Label,
} from "@/components/ui/card";

function App() {
  const [invoiceNumber, setInvoiceNumber] = useState(1000);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [client, setClient] = useState({ name: '', address: '', contact: '', email: '' });
  const [items, setItems] = useState([{ name: '', quantity: 1, unitPrice: 0 }]);
  const [company, setCompany] = useState({
    name: '', 
    address: '', 
    bankAccount: '', 
    bankName: ''
  });

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    newItems[index].itemPrice = newItems[index].quantity * newItems[index].unitPrice;
    setItems(newItems);
    calculateTotal();
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, unitPrice: 0, itemPrice: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    calculateTotal();
  };

  const calculateTotal = () => {
    const subtotal = items.reduce((acc, item) => acc + (item.itemPrice || 0), 0);
    setAmount(subtotal);
    setTax(subtotal * 0.1); // Assuming 10% tax for simplicity
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Invoice Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Invoice Details */}
            <div>
              <Label>Invoice Number</Label>
              <Input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} readOnly />
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <Label>Amount</Label>
              <Input value={amount} readOnly />
            </div>
            <div>
              <Label>Tax</Label>
              <Input value={tax} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Input label="Name" value={client.name} onChange={(e) => setClient({...client, name: e.target.value})} />
          <Input label="Address" value={client.address} onChange={(e) => setClient({...client, address: e.target.value})} />
          <Input label="Contact Number" value={client.contact} onChange={(e) => setClient({...client, contact: e.target.value})} />
          <Input label="Email" value={client.email} onChange={(e) => setClient({...client, email: e.target.value})} />
        </CardContent>
      </Card>

      {/* Item Details */}
      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 mb-2 items-center">
              <Input label="Name" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} />
              <Input label="Qty" type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))} />
              <Input label="Unit Price" type="number" value={item.unitPrice} onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))} />
              <Button variant="destructive" onClick={() => removeItem(index)}>Remove</Button>
            </div>
          ))}
          <Button onClick={addItem}>Add Item</Button>
        </CardContent>
      </Card>

      {/* Company Details */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Input label="Company Name" value={company.name} onChange={(e) => setCompany({...company, name: e.target.value})} />
          <Input label="Address" value={company.address} onChange={(e) => setCompany({...company, address: e.target.value})} />
          <Input label="Bank Account" value={company.bankAccount} onChange={(e) => setCompany({...company, bankAccount: e.target.value})} />
          <Input label="Bank Name" value={company.bankName} onChange={(e) => setCompany({...company, bankName: e.target.value})} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
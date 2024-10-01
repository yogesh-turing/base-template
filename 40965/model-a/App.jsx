import React, { useState } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle, 
  CardFooter, Button, Input, Label, Textarea 
} from "@/components/ui";

// Invoice Item Component
const InvoiceItem = ({ item, onChange, onRemove }) => {
  return (
    <Card className="mb-4">
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <Label>Name</Label>
            <Input value={item.name} onChange={(e) => onChange({...item, name: e.target.value})} />
          </div>
          <div>
            <Label>Quantity</Label>
            <Input type="number" value={item.quantity} onChange={(e) => onChange({...item, quantity: e.target.value})} />
          </div>
          <div>
            <Label>Unit Price</Label>
            <Input type="number" value={item.unitPrice} onChange={(e) => onChange({...item, unitPrice: e.target.value})} />
          </div>
          <div>
            <Label>Item Price</Label>
            <Input disabled value={(item.quantity * item.unitPrice).toFixed(2)} />
          </div>
        </div>
        <Button className="mt-2" variant="destructive" onClick={onRemove}>Remove</Button>
      </CardContent>
    </Card>
  );
};

// Main App Component
export default function App() {
  const [invoice, setInvoice] = useState({
    number: Math.floor(Math.random() * 10000), // Simple auto-generation
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    tax: 0,
    client: { name: '', address: '', contactNumber: '', email: '' },
    company: { name: '', address: '', bankDetails: '' },
    items: [{ name: '', quantity: 1, unitPrice: 0, itemPrice: 0 }]
  });

  const updateInvoice = (field, value) => {
    setInvoice(prev => ({...prev, [field]: value}));
  };

  const updateItem = (index, updatedItem) => {
    const items = [...invoice.items];
    items[index] = updatedItem;
    items[index].itemPrice = updatedItem.quantity * updatedItem.unitPrice;
    updateInvoice('items', items);
    calculateTotal();
  };

  const addItem = () => {
    setInvoice(prev => ({
      ...prev, 
      items: [...prev.items, { name: '', quantity: 1, unitPrice: 0, itemPrice: 0 }]
    }));
  };

  const removeItem = (index) => {
    const items = invoice.items.filter((_, i) => i !== index);
    updateInvoice('items', items);
    calculateTotal();
  };

  const calculateTotal = () => {
    const amount = invoice.items.reduce((sum, item) => sum + (item.itemPrice || 0), 0);
    const tax = amount * 0.10; // Assuming 10% tax for simplicity
    updateInvoice('amount', amount);
    updateInvoice('tax', tax);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Invoice Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input label="Invoice Number" disabled value={invoice.number} />
            <Input label="Date" type="date" value={invoice.date} onChange={(e) => updateInvoice('date', e.target.value)} />
            {/* Client Details */}
            {['name', 'address', 'contactNumber', 'email'].map(field => (
              <Input 
                key={field} 
                label={`Client ${field.replace(/^\w/, c => c.toUpperCase())}`} 
                value={invoice.client[field]} 
                onChange={(e) => updateInvoice('client', {...invoice.client, [field]: e.target.value})} 
              />
            ))}
            {/* Items */}
            {invoice.items.map((item, index) => (
              <InvoiceItem 
                key={index} 
                item={item} 
                onChange={(updatedItem) => updateItem(index, updatedItem)}
                onRemove={() => removeItem(index)}
              />
            ))}
            <Button onClick={addItem}>Add Item</Button>
            {/* Company Details */}
            <Textarea 
              label="Company Details" 
              value={`${invoice.company.name}\n${invoice.company.address}\nBank: ${invoice.company.bankDetails}`}
              onChange={(e) => {
                const [name, address, bankDetails] = e.target.value.split('\n');
                updateInvoice('company', { name, address, bankDetails });
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <p>Total Amount: ${invoice.amount.toFixed(2)}</p>
          <p>Tax: ${invoice.tax.toFixed(2)}</p>
          <p>Grand Total: ${(invoice.amount + invoice.tax).toFixed(2)}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
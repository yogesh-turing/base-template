import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const InvoiceBuilder = () => {
  const [invoice, setInvoice] = useState({
    number: Math.floor(Math.random() * 10000),
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    tax: 0,
    client: { name: '', address: '', contact: '', email: '' },
    items: [{ name: '', quantity: 1, unitPrice: 0, itemPrice: 0 }],
    company: { name: '', address: '', bank: { accountNumber: '', bankName: '' } }
  });

  const calculateTotal = () => {
    const total = invoice.items.reduce((acc, item) => acc + item.itemPrice, 0);
    return total + (total * invoice.tax / 100);
  };

  const updateField = (field, value, parent = null) => {
    if (parent) {
      setInvoice(prev => ({ ...prev, [parent]: { ...prev[parent], [field]: value } }));
    } else {
      setInvoice(prev => ({ ...prev, [field]: value }));
    }
  };

  const updateItem = (index, field, value) => {
    const items = [...invoice.items];
    items[index] = { ...items[index], [field]: value, itemPrice: items[index].quantity * items[index].unitPrice };
    items[index].itemPrice = (items[index].quantity || 0) * (items[index].unitPrice || 0)
    setInvoice(prev => ({ ...prev, items, amount: calculateTotal() }));
  };

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, unitPrice: 0, itemPrice: 0 }]
    }));
  };

  const invoiceRef = useRef();

  const handlePrint = () => {
    const printContents = invoiceRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <div className="p-4 sm:p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Invoice Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={invoiceRef} className="mb-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Invoice Number</Label>
                <Input value={invoice.number} readOnly />
              </div>
              <div>
                <Label>Date</Label>
                <Input type="date" value={invoice.date} onChange={(e) => updateField('date', e.target.value)} />
              </div>
            </div>
           
              <Label className="border-b-2">Client Details</Label>
              {['name', 'address', 'contact', 'email'].map(field => (
                <div class="flex">
                  <div className='w-16 mr-2 align-bottom pt-2'><Label className="" >{field.replace(/^\w/, c => c.toUpperCase())}</Label></div>
                  <div>
                    <Input 
                      key={field} placeholder={field.replace(/^\w/, c => c.toUpperCase())}
                      value={invoice.client[field]}
                      onChange={(e) => updateField(field, e.target.value, 'client')}
                      className="mt-2 w-fit" 
                    />
                  </div>
                </div>
              ))}

            <div className="mb-4 mt-4">
              <Label className="border-b-2">Company Details</Label>
              {['name', 'address'].map(field => (
                <div class="flex">
                  <div className='w-16 mr-2 align-bottom pt-2'>
                    <Label className="" >{field.replace(/^\w/, c => c.toUpperCase())}</Label>
                  </div>
                  <div>
                    <Input 
                      key={field} placeholder={field.replace(/^\w/, c => c.toUpperCase())}
                      value={invoice.company[field]}
                      onChange={(e) => updateField(field, e.target.value, 'company')}
                      className="mt-2 w-fit" 
                    />
                  </div>
                </div>
              ))}
              <div class="flex">
                <div className='w-16 mr-2 align-bottom pt-2'>
                  <Label>Account Number</Label>
                </div>
                <div>
                  <Input 
                    placeholder="Account Number" value={invoice.company.bank.accountNumber}
                    onChange={(e) => updateField('accountNumber', e.target.value, 'company.bank')}
                    className="mt-2 w-fit" 
                  />
                </div>
              </div>

              <div class="flex">
                <div className='w-16 mr-2 align-bottom pt-2'>
                  <Label>Bank Name</Label>
                </div>
                <div>
                  <Input 
                    placeholder="Bank Name" value={invoice.company.bank.bankName}
                    onChange={(e) => updateField('bankName', e.target.value, 'company.bank')}
                    className="mt-2 w-fit" 
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <Label className="border-b-2">Items</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell><Input placeholder="Item name" value={item.name} onChange={(e) => updateItem(index, 'name', e.target.value)} /></TableCell>
                      <TableCell><Input type="number" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', e.target.value)} /></TableCell>
                      <TableCell><Input type="number" value={item.unitPrice} onChange={(e) => updateItem(index, 'unitPrice', e.target.value)} /></TableCell>
                      <TableCell>{item.itemPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button onClick={addItem} className="mt-2">Add Item</Button>
            </div>
            <div class="flex">
                <div className='w-16 mr-2 align-bottom pt-2'>
                  <Label>Text (%):</Label>
                </div>
                <div>
                  <Input 
                    type="number" placeholder="Tax (%)" value={invoice.tax} onChange={(e) => updateField('tax', e.target.value)}
                    className="mt-2 w-fit" 
                  />
                </div>
            </div>
            <div class="flex">
                <div className='w-16 mr-2 align-bottom pt-2'>
                  <Label>Total:</Label>
                </div>
                <div className='w-16 mr-2 align-bottom pt-2'>
                    ${calculateTotal().toFixed(2)}
                </div>
            </div>
          </div>
          <Button onClick={handlePrint}>Print Invoice</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default function App() {
  return <InvoiceBuilder />;
}
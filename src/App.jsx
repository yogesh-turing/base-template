// App.jsx
import React, { useState, useRef } from 'react';
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { number } from 'zod';

const getRandomCharFrom = (str) => str.charAt(Math.floor(Math.random() * str.length))
const stringInsertAt = (input, index, string) => input.substr(0, index) + string + input.substr(index);

const App = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [useSpecialChars, setUseSpecialChars] = useState(true);
  const [useCapitals, setUseCapitals] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    let password = '', capitals = '', numbers = '', specialChars = ''
    let n = length;
    
    if (useCapitals) {
      capitals += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      n = n - 2;
      capitals = getRandomCharFrom(capitals) + getRandomCharFrom(capitals)
    }
    if (useNumbers) {
      n = n - 2;
      numbers += "0123456789";
      numbers = getRandomCharFrom(numbers) + getRandomCharFrom(numbers)
    }

    if (useSpecialChars) {
      n = n - 2;
      specialChars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
      specialChars = getRandomCharFrom(specialChars) + getRandomCharFrom(specialChars)
    }

    for (let i = 0; i < n; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    for (let i = 0; i < 2; i++) {
      if (useCapitals) password = stringInsertAt(password, Math.floor(Math.random() * password.length), capitals[i])
      if (useNumbers) password = stringInsertAt(password, Math.floor(Math.random() * password.length), numbers[i])
      if (useSpecialChars) password = stringInsertAt(password, Math.floor(Math.random() * password.length), specialChars[i])
    }
    setPassword(password);
  };

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 5000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 sm:px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Password Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="length">Password Length</Label>
              <Input 
                id="length" 
                type="number" 
                value={length} 
                onChange={(e) => setLength(e.target.value)} 
                min="8" 
                max="64" 
              />
            </div>
            <div>
              <Checkbox 
                id="specialChars" 
                checked={useSpecialChars} 
                onCheckedChange={setUseSpecialChars}
                className="mr-2"
              >
              </Checkbox>
              <Label htmlFor="specialChars">Include Special Characters</Label>
            </div>
            <div>
              <Checkbox 
                id="capitals" 
                checked={useCapitals} 
                onCheckedChange={setUseCapitals}
                className="mr-2"
              >
              </Checkbox>
              <Label htmlFor="capitals" className="ml-2">Include Capital Letters</Label>
              
            </div>
            <div>
              <Checkbox 
                id="numbers" 
                checked={useNumbers} 
                onCheckedChange={setUseNumbers}
                className="mr-2"
              >
              </Checkbox>
              <Label htmlFor="numbers" className="ml-2">Include Numbers</Label>
            </div>
            <Input 
              ref={passwordRef}
              value={password} 
              readOnly 
              className="mb-2"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={generatePassword}>Generate New Password</Button>
          <Button onClick={copyToClipboard} disabled={!password} variant="outline">
            <Copy className='mr-2' />Copy Password</Button>
        </CardFooter>
        <div>
          {copySuccess && 
              <Alert variant="success">
                <AlertTitle>Copied!</AlertTitle>
                Password copied to clipboard.
              </Alert>
            }
          </div>
      </Card>
    </div>
  );
};

export default App;

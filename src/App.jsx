// App.jsx
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "@/components/ui/alert";

const getRandomCharsFrom = (str, n) => {
  let output = "";
  for (let i=0; i<n; i++) {
    output = output + str.charAt(Math.floor(Math.random() * str.length))
  }
  return output;
}

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
      let nParts = Math.ceil(Math.random() * length/ 4);
      capitals += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      n = n - nParts;
      capitals = getRandomCharsFrom(capitals, nParts)
    }
    if (useNumbers) {
      let nParts = Math.ceil(Math.random() * length/ 4);
      numbers += "0123456789";
      n = n - nParts;
      numbers = getRandomCharsFrom(numbers, nParts)
    }

    if (useSpecialChars) {
      let nParts = Math.ceil(Math.random() * length/ 4);
      specialChars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
      n = n - nParts;
      specialChars = getRandomCharsFrom(specialChars, nParts)
    }

    for (let i = 0; i < n; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    for (const char of capitals) 
      password = stringInsertAt(password, Math.floor(Math.random() * password.length), char)
    for (const char of numbers) 
      password = stringInsertAt(password, Math.floor(Math.random() * password.length), char)
    for (const char of specialChars) 
      password = stringInsertAt(password, Math.floor(Math.random() * password.length), char)
    
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
              <Label htmlFor="capitals">Include Capital Letters</Label>
            </div>
            <div>
              <Checkbox 
                id="numbers" 
                checked={useNumbers} 
                onCheckedChange={setUseNumbers}
                className="mr-2"
              >
              </Checkbox>
              <Label htmlFor="numbers">Include Numbers</Label>
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
            Copy Password</Button>
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

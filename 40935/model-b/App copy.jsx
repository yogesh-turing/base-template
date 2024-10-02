// App.jsx
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "@/components/ui/alert";

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
    let password = '';
    
    if (useCapitals) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) chars += "0123456789";
    if (useSpecialChars) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
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
                min="4" 
                max="64" 
              />
            </div>
            <div>
              <Checkbox 
                id="specialChars" 
                checked={useSpecialChars} 
                onCheckedChange={setUseSpecialChars}
              >
                <Label className="ml-2">Include Special Characters</Label>
              </Checkbox>
            </div>
            <div>
              <Checkbox 
                id="capitals" 
                checked={useCapitals} 
                onCheckedChange={setUseCapitals}
              >
                <Label className="ml-2">Include Capital Letters</Label>
              </Checkbox>
            </div>
            <div>
              <Checkbox 
                id="numbers" 
                checked={useNumbers} 
                onCheckedChange={setUseNumbers}
              >
                <Label className="ml-2">Include Numbers</Label>
              </Checkbox>
            </div>
            <Input 
              ref={passwordRef}
              value={password} 
              readOnly 
              className="mb-2"
            />
            {copySuccess && 
              <Alert variant="success">
                <AlertTitle>Copied!</AlertTitle>
                Password copied to clipboard.
              </Alert>
            }
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={generatePassword}>Generate New Password</Button>
          <Button onClick={copyToClipboard} disabled={!password}>Copy Password</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
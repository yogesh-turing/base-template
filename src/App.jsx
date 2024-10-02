import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipProvider } from '@radix-ui/react-tooltip';


const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [includeCaps, setIncludeCaps] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    let specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let numbers = '0123456789';
    let caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (includeSpecial) chars += specialChars;
    if (includeCaps) chars += caps;
    if (includeNumbers) chars += numbers;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  }, [length, includeSpecial, includeCaps, includeNumbers]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    });
  };

  return (
    <Card className="max-w-sm mx-auto mt-10 sm:mt-20">
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
        <CardDescription>Create a secure password with ease.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label htmlFor="passwordLength">Password Length</Label>
          <Input
            id="passwordLength"
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min="4"
            max="32"
          />

          <div>
            <Checkbox
              checked={includeSpecial}
              onCheckedChange={setIncludeSpecial}
            >
              Include Special Characters
            </Checkbox>
          </div>

          <div>
            <Checkbox
              checked={includeCaps}
              onCheckedChange={setIncludeCaps}
            >
              Include Capital Letters
            </Checkbox>
          </div>

          <div>
            <Checkbox
              checked={includeNumbers}
              onCheckedChange={setIncludeNumbers}
            >
              Include Numbers
            </Checkbox>
          </div>

          <Button onClick={generatePassword}>Generate Password</Button>

          {password && (
            <div className="mt-4">
              <Input
                value={password}
                readOnly
                className="mb-2"
              />
              <div className="flex justify-between">
                <Button onClick={generatePassword}>Regenerate</Button>
                <TooltipProvider>
                  <Tooltip content={copied ? "Copied!" : "Copy to clipboard"}>
                    <Button onClick={copyToClipboard} variant="outline">
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <PasswordGenerator />
    </div>
  );
}
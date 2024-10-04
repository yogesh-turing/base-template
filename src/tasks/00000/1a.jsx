import React, { useState, useRef } from 'react';
// import { Button, Input, Select, Slider, Card, CardContent } from "@/components/ui";

import {  Button } from "@/components/ui/button";
import {  Input  } from "@/components/ui/input";
import {  Select, SelectItem } from "@/components/ui/select";
import {  Slider } from "@/components/ui/slider";
import {  Card, CardContent  } from "@/components/ui/card";
import { SelectContent, SelectValue, SelectTrigger } from '@radix-ui/react-select';


// import { DownloadIcon, RefreshIcon } from "@radix-ui/react-icons";
// import html2canvas from 'html2canvas';

// Shape Component to render different SVG shapes
const Shape = ({ type, color, size = 100 }) => {
  const viewBox = "0 0 100 100";
  const shapes = {
    Circle: <circle cx="50" cy="50" r="45" fill={color} />,
    Square: <rect x="5" y="5" width="90" height="90" fill={color} />,
    Triangle: <polygon points="50,5 95,95 5,95" fill={color} />,
    Pentagon: <polygon points="50,5 90,35 70,90 30,90 10,35" fill={color} />,
    Hexagon: <polygon points="25,50 50,5 75,50 75,75 50,95 25,75" fill={color} />,
  };

  return (
    <svg width={size} height={size} viewBox={viewBox}>
      {shapes[type]}
    </svg>
  );
};

// Main App Component
export default function App() {
  const [businessName, setBusinessName] = useState('');
  const [shape, setShape] = useState('Circle');
  const [logoColor, setLogoColor] = useState('#4a5568');
  const [textColor, setTextColor] = useState('#a0aec0');
  const [fontSize, setFontSize] = useState(30);
  const previewRef = useRef();

  const initials = businessName.split(' ').map(name => name[0]).join('').toUpperCase();

  const downloadPreview = () => {
    // html2canvas(previewRef.current).then(canvas => {
    //   const link = document.createElement('a');
    //   link.download = 'logo.png';
    //   link.href = canvas.toDataURL();
    //   link.click();
    // });
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-300 p-4 flex flex-col items-center">
      <Card className="w-full max-w-lg p-4 bg-gray-900">
        <CardContent>
          <Input 
            value={businessName} 
            onChange={(e) => setBusinessName(e.target.value)} 
            placeholder="Enter Business Name" 
            className="mb-4"
          />
          <Select onValueChange={setShape} defaultValue={shape}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a shape" />
            </SelectTrigger>
            {['Circle', 'Square', 'Triangle', 'Pentagon', 'Hexagon'].map(s => 
              // <Select.Item key={s} value={s}>{s}</Select.Item>
              <SelectContent key={s}>
                <SelectItem value={s}>{s}</SelectItem>
              </SelectContent>
            )}
          </Select>
          <div className="flex space-x-4 my-4">
            <input type="color" value={logoColor} onChange={(e) => setLogoColor(e.target.value)} className="h-10 w-10" />
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-10 w-10" />
          </div>
          <Slider 
            defaultValue={[30]} 
            max={50} 
            min={20} 
            step={1} 
            onValueChange={(value) => setFontSize(value[0])} 
            className="mb-4"
          />
        </CardContent>
        <div className="flex justify-between p-4">
          <Button onClick={() => setBusinessName('')}>
            {/* <RefreshIcon className="mr-2" />  */}
            Reset
          </Button>
          <Button onClick={downloadPreview}>
            {/* <DownloadIcon className="mr-2" />  */}
            Download
          </Button>
        </div>
      </Card>
      
      <div ref={previewRef} className="mt-8">
        <Shape type={shape} color={logoColor} />
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          fontSize: `${fontSize}px`, 
          color: textColor 
        }}>
          {initials}
        </div>
      </div>
    </div>
  );
}
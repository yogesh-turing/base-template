import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent,SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const shapes = {
  Circle: 'circle',
  Square: 'rect',
  Triangle: 'polygon',
  Pentagon: 'polygon',
  Hexagon: 'polygon'
};

function LogoPreview({ name, shape, logoColor, textColor, fontSize }) {
  const points = {
    Triangle: '50,0 0,100 100,100',
    Pentagon: '50,0 100,38 82,100 18,100 0,38',
    Hexagon: '25,0 75,0 100,50 75,100 25,100 0,50'
  };

  return (
    <div className="h-24 flex justify-center items-center">
      <svg width="100" height="100">
        <g transform="scale(1)">
          {shape === 'Circle' && <circle cx="50" cy="50" r="50" fill={logoColor} />}
          {shape === 'Square' && <rect x="0" y="0" width="100" height="100" fill={logoColor} />}
          {(shape === 'Triangle' || shape === 'Pentagon' || shape === 'Hexagon') && 
            <polygon points={points[shape]} fill={logoColor} />}
          <text 
            x="50" 
            y="55" 
            fontSize={`${fontSize}px`} 
            fill={textColor} 
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {name.split(' ').map(word => word[0]).join('').toUpperCase()}
          </text>
        </g>
      </svg>
    </div>
  );
}

export default function App() {
  const [name, setName] = useState('');
  const [shape, setShape] = useState('Circle');
  const [logoColor, setLogoColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState(30);
  const svgRef = useRef(null);

  const downloadLogo = () => {
    const svg = svgRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${name}-logo.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4 sm:p-8">
      <Card className="w-full max-w-lg bg-gray-800 text-white">
        <CardHeader>
          <CardTitle>Logo Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            label="Business Name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your business name" 
            className="text-black"
          />
          <Select 
            label="Logo Shape" 
            value={shape} 
            onValueChange={setShape}
          >
            <SelectTrigger className="w-[180px] text-black">
              <SelectValue placeholder="Select a shape" />
            </SelectTrigger>
            <SelectContent>
            {Object.keys(shapes).map(shape => 
              <SelectItem key={shape} value={shape}>{shape}</SelectItem>
            )}
            </SelectContent>
          </Select>
          <div>
            <Label className="mr-2 align-text-top">Logo Color</Label>
            <input type="color" value={logoColor} onChange={(e) => setLogoColor(e.target.value)} />
          </div>
          <div>
            <Label className="mr-2 align-text-top">Text Color</Label>
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
          </div>
          <Slider 
            value={[fontSize]} 
            onValueChange={(value) => setFontSize(value[0])} 
            max={50} 
            min={20} 
            step={1}
            className="w-full"
          />
          <Label className="my-4">Font Size: {fontSize}px</Label>
          <div className="flex justify-center">
            <div ref={svgRef}>
              <LogoPreview 
                name={name} 
                shape={shape} 
                logoColor={logoColor} 
                textColor={textColor} 
                fontSize={fontSize}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={downloadLogo}>Download Logo</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
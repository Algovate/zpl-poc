"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ZPLElement } from "@/types/zpl"

interface ElementPropertiesProps {
  element: ZPLElement | null
  onUpdateElement: (updates: Partial<ZPLElement>) => void
}

export function ElementProperties({ element, onUpdateElement }: ElementPropertiesProps) {
  if (!element) return null

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-sm"></div>
          <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">Element Properties</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-slate-600">X Position</Label>
            <Input
              type="number"
              value={element.x}
              onChange={(e) => onUpdateElement({ x: parseInt(e.target.value) || 0 })}
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-slate-600">Y Position</Label>
            <Input
              type="number"
              value={element.y}
              onChange={(e) => onUpdateElement({ y: parseInt(e.target.value) || 0 })}
              className="h-8 text-sm"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs font-medium text-slate-600">Content/Field</Label>
          <Input
            value={element.content}
            onChange={(e) => onUpdateElement({ content: e.target.value })}
            placeholder="e.g., senderName, trackingNumber"
            className="h-8 text-sm"
          />
        </div>

        {element.type === 'text' && (
          <>
            <div>
              <Label className="text-xs font-medium text-slate-600">Font</Label>
              <Select
                value={element.font || 'A0'}
                onValueChange={(value) => onUpdateElement({ font: value })}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A0">A0 (Default)</SelectItem>
                  <SelectItem value="A1">A1</SelectItem>
                  <SelectItem value="A2">A2</SelectItem>
                  <SelectItem value="B0">B0</SelectItem>
                  <SelectItem value="B1">B1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-600">Font Size</Label>
              <Input
                type="number"
                value={element.size || 28}
                onChange={(e) => onUpdateElement({ size: parseInt(e.target.value) || 0 })}
                className="h-8 text-sm"
              />
            </div>
          </>
        )}

        {element.type === 'barcode' && (
          <>
            <div>
              <Label className="text-xs font-medium text-slate-600">Barcode Type</Label>
              <Select
                value={element.barcodeType || '128'}
                onValueChange={(value) => onUpdateElement({ barcodeType: value })}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="128">Code 128</SelectItem>
                  <SelectItem value="39">Code 39</SelectItem>
                  <SelectItem value="93">Code 93</SelectItem>
                  <SelectItem value="EAN13">EAN-13</SelectItem>
                  <SelectItem value="EAN8">EAN-8</SelectItem>
                  <SelectItem value="UPCA">UPC-A</SelectItem>
                  <SelectItem value="UPCE">UPC-E</SelectItem>
                  <SelectItem value="QR">QR Code</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-600">Height</Label>
              <Input
                type="number"
                value={element.height || 50}
                onChange={(e) => onUpdateElement({ height: parseInt(e.target.value) || 0 })}
                className="h-8 text-sm"
              />
            </div>
          </>
        )}

        {(element.type === 'box' || element.type === 'line') && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-medium text-slate-600">Width</Label>
              <Input
                type="number"
                value={element.width || 100}
                onChange={(e) => onUpdateElement({ width: parseInt(e.target.value) || 0 })}
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-slate-600">Height</Label>
              <Input
                type="number"
                value={element.height || 50}
                onChange={(e) => onUpdateElement({ height: parseInt(e.target.value) || 0 })}
                className="h-8 text-sm"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

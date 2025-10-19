"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ZPLElement } from "@/types/zpl"

interface ElementToolsProps {
  onAddElement: (type: ZPLElement['type']) => void
  elementCount: number
}

export function ElementTools({ onAddElement, elementCount }: ElementToolsProps) {
  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm"></div>
          <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">Add Elements</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onAddElement('text')}
            className="h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200"
          >
            📝 Text
          </Button>
          <Button
            onClick={() => onAddElement('barcode')}
            className="h-12 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200"
          >
            📊 Barcode
          </Button>
          <Button
            onClick={() => onAddElement('box')}
            className="h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200"
          >
            ⬜ Box
          </Button>
          <Button
            onClick={() => onAddElement('line')}
            className="h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200"
          >
            📏 Line
          </Button>
        </div>
        <div className="mt-3 text-center text-sm text-slate-600">
          {elementCount} elements
        </div>
      </CardContent>
    </Card>
  )
}

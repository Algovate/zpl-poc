"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ZPLElement } from "@/types/zpl"

interface ElementsListProps {
  elements: ZPLElement[]
  selectedElementIndex: number | null
  onSelectElement: (index: number) => void
  onRemoveElement: (index: number) => void
}

export function ElementsList({ 
  elements, 
  selectedElementIndex, 
  onSelectElement, 
  onRemoveElement 
}: ElementsListProps) {
  const getElementIcon = (type: ZPLElement['type']) => {
    switch (type) {
      case 'text': return '📝'
      case 'barcode': return '📊'
      case 'box': return '⬜'
      case 'line': return '📏'
      default: return '❓'
    }
  }

  const getElementColor = (type: ZPLElement['type']) => {
    switch (type) {
      case 'text': return 'bg-green-500'
      case 'barcode': return 'bg-blue-500'
      case 'box': return 'bg-orange-500'
      case 'line': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full shadow-sm"></div>
          <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
            Elements ({elements.length})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {elements.length === 0 ? (
            <div className="text-center text-slate-500 py-12 border-2 border-dashed border-slate-300 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50">
              <div className="text-4xl mb-3">📝</div>
              <p className="font-semibold text-slate-600">No elements added yet</p>
              <p className="text-sm text-slate-500 mt-1">Use the buttons to add elements</p>
            </div>
          ) : (
            elements.map((element, index) => (
              <div
                key={index}
                className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedElementIndex === index
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 hover:shadow-sm'
                }`}
                onClick={() => onSelectElement(index)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getElementIcon(element.type)}</span>
                    <div className={`w-3 h-3 rounded-full ${getElementColor(element.type)}`}></div>
                    <span className="font-medium text-sm">{element.type.toUpperCase()}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveElement(index)
                    }}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    ✕
                  </Button>
                </div>
                <div className="text-xs text-slate-600">
                  Position: ({element.x}, {element.y}) • Content: {element.content}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

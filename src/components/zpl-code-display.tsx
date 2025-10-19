"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ZPLCodeDisplayProps {
  zpl: string
  onCopy: () => void
}

export function ZPLCodeDisplay({ zpl, onCopy }: ZPLCodeDisplayProps) {
  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full shadow-sm"></div>
            <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">Generated ZPL</span>
          </CardTitle>
          <Button
            onClick={onCopy}
            className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white h-9 text-sm shadow-lg hover:shadow-xl transition-all duration-200"
          >
            📋 Copy
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 overflow-auto max-h-64 border border-slate-700">
          <pre className="text-green-400 text-xs font-mono leading-relaxed">
            {zpl}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}

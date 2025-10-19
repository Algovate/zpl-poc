"use client"

import { useState, useEffect } from "react"
import { zplSimulator } from "@/lib/zpl-simulator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ZPLSimulatorPage() {
  const [receivedZPL, setReceivedZPL] = useState<string[]>([])
  const [latestZPL, setLatestZPL] = useState<string | null>(null)
  const [printerStatus, setPrinterStatus] = useState(zplSimulator.getPrinterStatus())
  const [capabilities, setCapabilities] = useState(zplSimulator.getPrinterCapabilities())

  // Set up ZPL simulator listener
  useEffect(() => {
    const handleNewZPL = (zpl: string) => {
      setReceivedZPL(prev => [...prev, zpl])
      setLatestZPL(zpl)
    }

    zplSimulator.addListener(handleNewZPL)
    setReceivedZPL(zplSimulator.getReceivedZPL())
    setLatestZPL(zplSimulator.getLatestZPL())

    return () => {
      zplSimulator.removeListener(handleNewZPL)
    }
  }, [])

  const clearHistory = () => {
    zplSimulator.clearHistory()
    setReceivedZPL([])
    setLatestZPL(null)
  }

  const copyZPL = (zpl: string) => {
    navigator.clipboard.writeText(zpl)
  }

  const openZPLViewer = (zpl: string) => {
    const encodedZPL = encodeURIComponent(zpl)
    window.open(`http://labelary.com/viewer.html?zpl=${encodedZPL}`, '_blank')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="container mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-2">ZPL Simulator</h1>
          <p className="text-slate-600 text-lg">Monitor and analyze ZPL commands sent to printers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Printer Status */}
          <Card className="bg-white/70 backdrop-blur-md shadow-xl border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Printer Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${printerStatus.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-slate-700">{printerStatus.online ? 'Online' : 'Offline'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${printerStatus.ready ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span className="text-slate-700">{printerStatus.ready ? 'Ready' : 'Busy'}</span>
              </div>
              {printerStatus.error && (
                <div className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">
                  Error: {printerStatus.error}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Printer Capabilities */}
          <Card className="bg-white/70 backdrop-blur-md shadow-xl border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Printer Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-slate-700">
                <span className="font-medium">Max Size:</span> {capabilities.maxWidth} x {capabilities.maxHeight} dots
              </div>
              <div className="text-slate-700">
                <span className="font-medium">Formats:</span> {capabilities.supportedFormats.join(', ')}
              </div>
              <div className="text-slate-700">
                <span className="font-medium">Barcodes:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {capabilities.supportedBarcodes.map(barcode => (
                    <Badge key={barcode} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                      {barcode}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="bg-white/70 backdrop-blur-md shadow-xl border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-slate-700">
                <span className="font-medium">Total Commands:</span> {receivedZPL.length}
              </div>
              <div className="text-slate-700">
                <span className="font-medium">Latest Command:</span> {latestZPL ? 'Available' : 'None'}
              </div>
              <Button onClick={clearHistory} variant="outline" size="sm" className="w-full bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100">
                Clear History
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Latest ZPL Command */}
        {latestZPL && (
          <Card className="bg-white/70 backdrop-blur-md shadow-xl border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Latest ZPL Command</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <pre className="bg-slate-100 p-4 rounded-lg text-slate-800 text-xs overflow-auto max-h-64 font-mono">
                  {latestZPL}
                </pre>
                <div className="flex space-x-2">
                  <Button onClick={() => copyZPL(latestZPL)} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Copy ZPL
                  </Button>
                  <Button onClick={() => openZPLViewer(latestZPL)} size="sm" variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100">
                    View in Labelary
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ZPL History */}
        <Card className="bg-white/70 backdrop-blur-md shadow-xl border border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800">ZPL Command History</CardTitle>
          </CardHeader>
          <CardContent>
            {receivedZPL.length === 0 ? (
              <div className="text-center text-slate-500 py-8 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50">
                <p className="font-medium">No ZPL commands received yet</p>
                <p className="text-sm">Use the Integration Test page to send ZPL commands</p>
              </div>
            ) : (
              <div className="space-y-4">
                {receivedZPL.map((zpl, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700">Command #{index + 1}</span>
                      <div className="flex space-x-2">
                        <Button onClick={() => copyZPL(zpl)} size="sm" variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100">
                          Copy
                        </Button>
                        <Button onClick={() => openZPLViewer(zpl)} size="sm" variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100">
                          View
                        </Button>
                      </div>
                    </div>
                    <pre className="bg-slate-50 p-2 rounded text-xs overflow-auto max-h-32 font-mono text-slate-800">
                      {zpl}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

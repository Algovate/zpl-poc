"use client"

import { useState } from "react"
import { PrinterManager, PrinterConfig } from "@/lib/printer-manager"
import { ZPLGenerator } from "@/lib/zpl-generator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PrinterTestPage() {
  const [printerConfig, setPrinterConfig] = useState<PrinterConfig>({
    id: 'test-printer',
    name: 'Test Printer',
    protocol: 'tcp',
    host: '192.168.1.100',
    port: 9100,
    timeout: 5000
  })

  const [testResult, setTestResult] = useState<string>('')
  const [isPrinting, setIsPrinting] = useState(false)

  const printerManager = new PrinterManager()
  const zplGenerator = new ZPLGenerator()

  const handleTestPrinter = async () => {
    setIsPrinting(true)
    setTestResult('Testing printer...')

    try {
      const success = await printerManager.testPrinter(printerConfig)
      setTestResult(success ? 'Printer test successful!' : 'Printer test failed!')
    } catch (error) {
      setTestResult(`Printer test error: ${error}`)
    } finally {
      setIsPrinting(false)
    }
  }

  const handlePrintLabel = async () => {
    setIsPrinting(true)
    setTestResult('Printing label...')

    const elements = [
      {
        type: 'text' as const,
        x: 10,
        y: 10,
        content: 'Test Label',
        font: 'A0',
        size: 28
      },
      {
        type: 'barcode' as const,
        x: 10,
        y: 50,
        content: '123456789',
        barcodeType: '128',
        height: 50
      }
    ]

    const zpl = zplGenerator.generate(elements)

    try {
      const success = await printerManager.sendZPL(zpl, printerConfig)
      setTestResult(success ? 'Label printed successfully!' : 'Label print failed!')
    } catch (error) {
      setTestResult(`Print error: ${error}`)
    } finally {
      setIsPrinting(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Printer Communication POC</h1>

      <Card>
        <CardHeader>
          <CardTitle>Printer Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Printer Name</Label>
              <Input
                id="name"
                value={printerConfig.name}
                onChange={(e) => setPrinterConfig(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="protocol">Protocol</Label>
              <Select
                value={printerConfig.protocol}
                onValueChange={(value) => setPrinterConfig(prev => ({ ...prev, protocol: value as 'tcp' | 'usb' | 'http' | 'simulator' }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tcp">TCP/IP</SelectItem>
                  <SelectItem value="usb">USB</SelectItem>
                  <SelectItem value="http">HTTP</SelectItem>
                  <SelectItem value="simulator">ZPL Simulator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {printerConfig.protocol === 'tcp' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="host">Host/IP</Label>
                <Input
                  id="host"
                  value={printerConfig.host || ''}
                  onChange={(e) => setPrinterConfig(prev => ({ ...prev, host: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="port">Port</Label>
                <Input
                  id="port"
                  type="number"
                  value={printerConfig.port || 9100}
                  onChange={(e) => setPrinterConfig(prev => ({ ...prev, port: parseInt(e.target.value) }))}
                />
              </div>
            </div>
          )}

          {printerConfig.protocol === 'usb' && (
            <div>
              <Label htmlFor="devicePath">Device Path</Label>
              <Input
                id="devicePath"
                value={printerConfig.devicePath || ''}
                onChange={(e) => setPrinterConfig(prev => ({ ...prev, devicePath: e.target.value }))}
                placeholder="/dev/usb/lp0"
              />
            </div>
          )}

          {printerConfig.protocol === 'http' && (
            <div>
              <Label htmlFor="endpoint">HTTP Endpoint</Label>
              <Input
                id="endpoint"
                value={printerConfig.endpoint || ''}
                onChange={(e) => setPrinterConfig(prev => ({ ...prev, endpoint: e.target.value }))}
                placeholder="http://printer.local:8080/print"
              />
            </div>
          )}

          <div>
            <Label htmlFor="timeout">Timeout (ms)</Label>
            <Input
              id="timeout"
              type="number"
              value={printerConfig.timeout}
              onChange={(e) => setPrinterConfig(prev => ({ ...prev, timeout: parseInt(e.target.value) }))}
            />
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleTestPrinter}
              disabled={isPrinting}
            >
              Test Printer
            </Button>
            <Button
              onClick={handlePrintLabel}
              disabled={isPrinting}
            >
              Print Test Label
            </Button>
          </div>

          {testResult && (
            <div className={`p-4 rounded ${testResult.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {testResult}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

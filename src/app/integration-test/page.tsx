"use client"

import { useState, useEffect, useMemo } from "react"
import { ZPLGenerator } from "@/lib/zpl-generator"
import { PrinterManager, PrinterConfig } from "@/lib/printer-manager"
import { templateStorage } from "@/lib/template-storage"
import { testModels, TestModelData, generateRandomTestData } from "@/lib/test-models"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ZPLPreview } from "@/components/zpl-preview"

export default function IntegrationTestPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [selectedPrinter, setSelectedPrinter] = useState<string>('')
  const [selectedTestModel, setSelectedTestModel] = useState<string>('')
  const [testData, setTestData] = useState<TestModelData>(testModels[0].data)

  const [result, setResult] = useState<string>('')
  const [generatedZPL, setGeneratedZPL] = useState<string>('')

  const printerManager = useMemo(() => new PrinterManager(), [])
  const zplGenerator = useMemo(() => new ZPLGenerator(), [])

  const templates = templateStorage.listTemplates()
  const printers: PrinterConfig[] = [
    {
      id: 'printer1',
      name: 'Zebra ZD420',
      protocol: 'tcp',
      host: '192.168.1.100',
      port: 9100,
      timeout: 5000
    },
    {
      id: 'printer2',
      name: 'USB Printer',
      protocol: 'usb',
      devicePath: '/dev/usb/lp0',
      timeout: 5000
    },
    {
      id: 'simulator',
      name: 'ZPL Simulator',
      protocol: 'simulator',
      timeout: 5000
    }
  ]

  // Handle test model selection
  useEffect(() => {
    if (selectedTestModel) {
      const model = testModels.find(m => m.id === selectedTestModel)
      if (model) {
        setTestData(model.data)
      }
    }
  }, [selectedTestModel])

  // Generate ZPL when template or data changes
  useEffect(() => {
    if (selectedTemplate) {
      const template = templateStorage.getTemplate(selectedTemplate)
      if (template) {
        const elementsWithData = template.elements.map(element => ({
          ...element,
          content: getFieldValue(element.content, testData)
        }))
        const zpl = zplGenerator.generate(elementsWithData)
        setGeneratedZPL(zpl)
      }
    }
  }, [selectedTemplate, testData, zplGenerator])

  const handleGenerateRandomData = () => {
    setTestData(generateRandomTestData())
  }

  const handlePrint = async () => {
    if (!selectedTemplate || !selectedPrinter) {
      setResult('Please select both template and printer')
      return
    }

    setResult('Printing...')

    try {
      const template = templateStorage.getTemplate(selectedTemplate)
      const printer = printers.find(p => p.id === selectedPrinter)

      if (!template || !printer) {
        setResult('Template or printer not found')
        return
      }

      // Replace template content with test data
      const elementsWithData = template.elements.map(element => ({
        ...element,
        content: getFieldValue(element.content, testData)
      }))

      const zpl = zplGenerator.generate(elementsWithData)
      const success = await printerManager.sendZPL(zpl, printer)

      setResult(success ? 'Print successful!' : 'Print failed!')
    } catch (error) {
      setResult(`Error: ${error}`)
    }
  }

  const getFieldValue = (field: string, data: TestModelData): string => {
    // Handle both new structured data and legacy flat data
    switch (field) {
      case 'serviceType':
        return data.serviceType
      case 'originTrackingNumber':
        return data.originTrackingNumber
      case 'deliveredTrackingNumber':
        return data.deliveredTrackingNumber
      case 'senderName':
        return data.senderName || data.sender.name
      case 'senderAddress':
        return data.senderAddress || `${data.sender.address}, ${data.sender.city}, ${data.sender.state} ${data.sender.zipCode}`
      case 'receiverName':
        return data.receiverName || data.receiver.name
      case 'receiverAddress':
        return data.receiverAddress || `${data.receiver.address}, ${data.receiver.city}, ${data.receiver.state} ${data.receiver.zipCode}`
      case 'weight':
        return data.weight || data.package.weight
      case 'senderCity':
        return data.sender.city
      case 'senderState':
        return data.sender.state
      case 'senderZipCode':
        return data.sender.zipCode
      case 'receiverCity':
        return data.receiver.city
      case 'receiverState':
        return data.receiver.state
      case 'receiverZipCode':
        return data.receiver.zipCode
      case 'packageDescription':
        return data.package.description
      case 'packageDimensions':
        return data.package.dimensions
      case 'packageValue':
        return data.package.value || ''
      case 'trackingNumber':
        return data.tracking.trackingNumber
      case 'estimatedDelivery':
        return data.tracking.estimatedDelivery
      case 'serviceLevel':
        return data.tracking.serviceLevel
      default:
        // Fallback to legacy field or return the field name
        return (data as unknown as Record<string, string>)[field] || field
    }
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
      <div className="container mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Integration Test</h1>
          <p className="text-slate-600 text-sm">Test templates with real data and send to printers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Test Configuration */}
          <Card className="bg-white/70 backdrop-blur-md shadow-xl border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Test Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-select" className="text-slate-600">Select Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger id="template-select" className="bg-slate-50 border-slate-200 text-slate-800">
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="printer-select" className="text-slate-600">Select Printer</Label>
                <Select value={selectedPrinter} onValueChange={setSelectedPrinter}>
                  <SelectTrigger id="printer-select" className="bg-slate-50 border-slate-200 text-slate-800">
                    <SelectValue placeholder="Choose a printer" />
                  </SelectTrigger>
                  <SelectContent>
                    {printers.map(printer => (
                      <SelectItem key={printer.id} value={printer.id}>
                        {printer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handlePrint} className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                Print Test Label
              </Button>

              {result && (
                <div className={`p-4 rounded-lg ${
                  result.includes('successful') ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${result.includes('successful') ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    {result}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test Model Selection */}
          <Card className="bg-white/70 backdrop-blur-md shadow-xl border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Test Model</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-model-select" className="text-slate-600">Select Test Scenario</Label>
                <Select value={selectedTestModel} onValueChange={setSelectedTestModel}>
                  <SelectTrigger id="test-model-select" className="bg-slate-50 border-slate-200 text-slate-800">
                    <SelectValue placeholder="Choose a test scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    {testModels.map(model => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{model.name}</span>
                          <span className="text-xs text-slate-500">{model.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={handleGenerateRandomData} 
                  variant="outline" 
                  className="w-full bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
                >
                  🎲 Generate Random Data
                </Button>
              </div>

              {/* Test Data Preview */}
              {testData && (
                <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="font-medium text-slate-800 text-sm">Current Test Data</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Service:</span>
                      <span className="font-medium">{testData.serviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">From:</span>
                      <span className="font-medium">{testData.sender.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">To:</span>
                      <span className="font-medium">{testData.receiver.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Weight:</span>
                      <span className="font-medium">{testData.package.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tracking:</span>
                      <span className="font-medium font-mono text-xs">{testData.deliveredTrackingNumber}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Live Preview */}
          <Card className="bg-white/70 backdrop-blur-md shadow-xl border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedZPL ? (
                <ZPLPreview zpl={generatedZPL} width={800} height={600} dpi={203} />
              ) : (
                <div className="text-center text-slate-500 py-8 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50">
                  <p className="font-medium">No template selected</p>
                  <p className="text-sm">Select a template to see preview</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Generated ZPL Code */}
        {generatedZPL && (
          <Card className="bg-slate-900 shadow-xl border border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Generated ZPL Code</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-800 p-4 rounded-lg text-green-300 text-xs overflow-auto max-h-96 font-mono">
                {generatedZPL}
              </pre>
              <div className="flex space-x-2 mt-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  onClick={() => copyZPL(generatedZPL)}
                >
                  Copy ZPL <span className="ml-2">📋</span>
                </Button>
                <Button
                  variant="outline"
                  className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                  onClick={() => openZPLViewer(generatedZPL)}
                >
                  View in Labelary <span className="ml-2">🔗</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

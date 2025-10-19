"use client"

import { useEffect, useRef, useState, useCallback } from "react"

import { ZPLPreviewProps, ZPLElement } from "@/types/zpl"

export function ZPLPreview({ zpl, width = 800, height = 600, dpi = 203 }: ZPLPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)

  // Convert dots to pixels (assuming 96 DPI for display) with 2x scale for better visibility
  const dotsToPixels = useCallback((dots: number) => (dots * 96 * 2) / dpi, [dpi])

  const parseZPL = (zplString: string): ZPLElement[] => {
    const elements: ZPLElement[] = []
    const lines = zplString.split('\n')

    let currentElement: Partial<ZPLElement> = {}
    let inField = false
    let globalFont = 'A0'
    let globalSize = 28

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      console.log(`Processing line ${i}:`, line)

      // Field Origin (position) - ^FO
      if (line.startsWith('^FO')) {
        const coords = line.substring(3).split(',')
        if (coords.length >= 2) {
          currentElement.x = parseInt(coords[0]) || 0
          currentElement.y = parseInt(coords[1]) || 0
        }
      }

      // Field Typeset (position) - ^FT (alternative to ^FO)
      else if (line.startsWith('^FT')) {
        const coords = line.substring(3).split(',')
        if (coords.length >= 2) {
          currentElement.x = parseInt(coords[0]) || 0
          currentElement.y = parseInt(coords[1]) || 0
        }
      }

      // Font selection - ^A
      else if (line.startsWith('^A')) {
        // Handle both ^A0N,28,28 and ^A0,N,28,28 formats
        const fontMatch = line.match(/\^A(\w+),?(\w+)?,?(\d+)?,?(\d+)?/)
        if (fontMatch) {
          const font = fontMatch[1]
          const orientation = fontMatch[2] || 'N'
          const size = parseInt(fontMatch[3]) || 28

          console.log('Font command:', line, 'Parsed:', { font, orientation, size })

          // If we have a current element, set its font
          if (currentElement.x !== undefined) {
            currentElement.font = font
            currentElement.size = size
            console.log('Set font for current element:', currentElement)
          } else {
            // Set global font for subsequent elements
            globalFont = font
            globalSize = size
            console.log('Set global font:', { globalFont, globalSize })
          }
        } else {
          console.log('Font command did not match pattern:', line)
        }
      }

      // Barcode - ^BC
      else if (line.startsWith('^BC')) {
        const barcodeMatch = line.match(/\^BC(\w+),(\d+),Y,N,N/)
        if (barcodeMatch) {
          currentElement.type = 'barcode'
          currentElement.barcodeType = barcodeMatch[1]
          currentElement.height = parseInt(barcodeMatch[2]) || 50
        }
      }

      // Graphic Box - ^GB
      else if (line.startsWith('^GB')) {
        const boxMatch = line.match(/\^GB(\d+),(\d+),(\d+)/)
        if (boxMatch) {
          currentElement.type = 'box'
          currentElement.width = parseInt(boxMatch[1]) || 100
          currentElement.height = parseInt(boxMatch[2]) || 50
        }
      }

      // Field Data - ^FD
      else if (line.startsWith('^FD')) {
        currentElement.content = line.substring(3)
        inField = true
        console.log('Field data:', currentElement.content, 'Current element:', currentElement)
      }

      // Field Separator (end of field) - ^FS
      else if (line === '^FS') {
        console.log('Field separator found. Current element:', currentElement, 'In field:', inField)
        console.log('Element has x:', currentElement.x !== undefined, 'y:', currentElement.y !== undefined, 'content:', currentElement.content)
        if (inField && currentElement.x !== undefined && currentElement.y !== undefined) {
          // If no type specified, assume text
          if (!currentElement.type) {
            currentElement.type = 'text'
          }

          // Use global font if element doesn't have its own
          if (!currentElement.font) {
            currentElement.font = globalFont
          }
          if (!currentElement.size) {
            currentElement.size = globalSize
          }

          const finalElement = {
            type: currentElement.type as ZPLElement['type'],
            x: currentElement.x,
            y: currentElement.y,
            content: currentElement.content || '',
            font: currentElement.font,
            size: currentElement.size,
            width: currentElement.width,
            height: currentElement.height,
            barcodeType: currentElement.barcodeType
          }

          console.log('Adding element:', finalElement)
          elements.push(finalElement)
        } else {
          console.log('Skipping element - missing required fields')
        }

        currentElement = {}
        inField = false
      }
    }

    return elements
  }


  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawElement = (ctx: CanvasRenderingContext2D, element: ZPLElement) => {
      const x = dotsToPixels(element.x)
      const y = dotsToPixels(element.y)

      console.log('Drawing element:', element, 'At pixels:', { x, y })

      ctx.save()

      switch (element.type) {
        case 'text':
          const fontSize = dotsToPixels(element.size || 28)
          ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`
          ctx.fillStyle = '#000000'
          console.log('Drawing text:', element.content, 'at', { x, y }, 'font size:', fontSize)
          ctx.fillText(element.content, x, y + fontSize)
          break

        case 'barcode':
          // Draw a more realistic barcode representation
          const barcodeHeight = dotsToPixels(element.height || 50)
          const barcodeWidth = dotsToPixels(element.content.length * 6) // More realistic width

          console.log('Drawing barcode:', element.content, 'at', { x, y }, 'size:', { barcodeWidth, barcodeHeight })

          // Draw barcode pattern (simplified Code 128 representation)
          ctx.fillStyle = '#000000'
          ctx.fillRect(x, y, barcodeWidth, barcodeHeight)

          // Add some white bars to simulate barcode pattern
          ctx.fillStyle = '#ffffff'
          const barWidth = barcodeWidth / (element.content.length * 2 + 4) // Approximate bar width
          for (let i = 0; i < element.content.length; i++) {
            const barX = x + (i * barWidth * 2) + barWidth
            ctx.fillRect(barX, y, barWidth * 0.5, barcodeHeight)
          }

          // Add barcode text below
          const textY = y + barcodeHeight + 20 // Increased spacing
          ctx.font = '14px Arial' // Increased font size
          ctx.fillStyle = '#000000'
          ctx.textAlign = 'center'
          console.log('Drawing barcode text:', element.content, 'at', { x: x + barcodeWidth / 2, y: textY })
          ctx.fillText(element.content, x + barcodeWidth / 2, textY)
          ctx.textAlign = 'left' // Reset text alignment
          break

        case 'box':
          const boxWidth = dotsToPixels(element.width || 100)
          const boxHeight = dotsToPixels(element.height || 50)

          ctx.strokeStyle = '#000000'
          ctx.lineWidth = dotsToPixels(3)
          ctx.strokeRect(x, y, boxWidth, boxHeight)
          break

        case 'line':
          const lineWidth = dotsToPixels(element.width || 100)
          const lineHeight = dotsToPixels(element.height || 0)

          ctx.strokeStyle = '#000000'
          ctx.lineWidth = dotsToPixels(3)
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + lineWidth, y + lineHeight)
          ctx.stroke()
          break
      }

      ctx.restore()
    }

    try {
      setError(null)

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Enable high DPI rendering
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      // Set white background
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw border
      ctx.strokeStyle = '#cccccc'
      ctx.lineWidth = 1
      ctx.strokeRect(0, 0, canvas.width, canvas.height)

      // Parse and draw ZPL elements
      const elements = parseZPL(zpl)
      console.log('Parsed ZPL elements:', elements)
      elements.forEach(element => {
        drawElement(ctx, element)
      })

    } catch (err) {
      setError(`Preview error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }, [zpl, width, height, dpi, dotsToPixels])

  const canvasWidth = dotsToPixels(width)
  const canvasHeight = dotsToPixels(height)

  return (
    <div className="space-y-4">
      {error ? (
        <div className="text-red-600 text-sm p-4 border border-red-200 rounded-lg bg-red-50 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
          {error}
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              className="border-2 border-slate-200 rounded-lg bg-white shadow-lg"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg">
        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
        {width} × {height} dots @ {dpi} DPI
      </div>
    </div>
  )
}

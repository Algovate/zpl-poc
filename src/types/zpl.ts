export interface ZPLElement {
  type: 'text' | 'barcode' | 'box' | 'line'
  x: number
  y: number
  content: string
  font?: string
  size?: number
  width?: number
  height?: number
  barcodeType?: string
}

export interface ZPLTemplate {
  id: string
  name: string
  width: number
  height: number
  dpi: number
  elements: ZPLElement[]
  createdAt: Date
  updatedAt: Date
}

export interface PrinterConfig {
  id: string
  name: string
  protocol: 'tcp' | 'usb' | 'http' | 'simulator'
  host?: string
  port?: number
  devicePath?: string
  endpoint?: string
  timeout: number
}

export interface ZPLPreviewProps {
  zpl: string
  width?: number
  height?: number
  dpi?: number
}

export interface TemplateManagerReturn {
  template: ZPLTemplate
  selectedElementIndex: number | null
  previewZPL: string
  selectedElement: ZPLElement | null
  templates: ZPLTemplate[]
  updateTemplate: (updates: Partial<ZPLTemplate>) => void
  addElement: (type: ZPLElement['type']) => void
  updateElement: (index: number, updates: Partial<ZPLElement>) => void
  removeElement: (index: number) => void
  saveTemplate: () => boolean
  loadTemplate: (templateId: string) => boolean
  createNewTemplate: () => void
  setSelectedElementIndex: (index: number | null) => void
  copyZPL: () => void
}

import { useState, useMemo, useCallback } from "react"
import { ZPLGenerator } from "@/lib/zpl-generator"
import { templateStorage } from "@/lib/template-storage"
import { ZPLElement, ZPLTemplate, TemplateManagerReturn } from "@/types/zpl"

export function useTemplateManager(): TemplateManagerReturn {
  const [template, setTemplate] = useState<ZPLTemplate>({
    id: '',
    name: '',
    width: 800,
    height: 600,
    dpi: 203,
    elements: [],
    createdAt: new Date(),
    updatedAt: new Date()
  })

  const [selectedElementIndex, setSelectedElementIndex] = useState<number | null>(null)
  const [previewZPL, setPreviewZPL] = useState('')

  const generator = useMemo(() => new ZPLGenerator(), [])

  // Update preview when elements change
  useMemo(() => {
    const zpl = generator.generate(template.elements)
    setPreviewZPL(zpl)
  }, [template.elements, generator])

  const updateTemplate = useCallback((updates: Partial<ZPLTemplate>) => {
    setTemplate(prev => ({ ...prev, ...updates }))
  }, [])

  const addElement = useCallback((type: ZPLElement['type']) => {
    const defaultX = type === 'barcode' ? 200 : 50
    const defaultY = 10 + (template.elements.length * 60)

    const newElement: ZPLElement = {
      type,
      x: defaultX,
      y: defaultY,
      content: 'New Element',
      font: 'A0',
      size: 28,
      width: type === 'box' ? 100 : undefined,
      height: type === 'box' || type === 'barcode' ? 50 : undefined,
      barcodeType: type === 'barcode' ? '128' : undefined
    }

    updateTemplate({
      elements: [...template.elements, newElement]
    })
  }, [template.elements.length, updateTemplate])

  const updateElement = useCallback((index: number, updates: Partial<ZPLElement>) => {
    const updatedElements = template.elements.map((element, i) =>
      i === index ? { ...element, ...updates } : element
    )

    updateTemplate({ elements: updatedElements })
  }, [template.elements, updateTemplate])

  const removeElement = useCallback((index: number) => {
    const filteredElements = template.elements.filter((_, i) => i !== index)
    updateTemplate({ elements: filteredElements })

    // Clear selected element if it's being removed
    if (selectedElementIndex === index) {
      setSelectedElementIndex(null)
    } else if (selectedElementIndex !== null && selectedElementIndex > index) {
      // Adjust index if element before selected one is removed
      setSelectedElementIndex(selectedElementIndex - 1)
    }
  }, [template.elements, selectedElementIndex, updateTemplate])

  const saveTemplate = useCallback(() => {
    if (!template.name.trim()) {
      alert('Please enter a template name')
      return false
    }

    if (template.elements.length === 0) {
      alert('Please add at least one element to the template')
      return false
    }

    const templateToSave: ZPLTemplate = {
      ...template,
      id: template.id || `template-${Date.now()}`,
      name: template.name.trim(),
      updatedAt: new Date()
    }

    templateStorage.saveTemplate(templateToSave)
    setTemplate(templateToSave)
    return true
  }, [template])

  const loadTemplate = useCallback((templateId: string) => {
    const loadedTemplate = templateStorage.getTemplate(templateId)
    if (loadedTemplate) {
      setTemplate(loadedTemplate)
      setSelectedElementIndex(null)
      return true
    }
    return false
  }, [])

  const createNewTemplate = useCallback(() => {
    setTemplate({
      id: '',
      name: '',
      width: 800,
      height: 600,
      dpi: 203,
      elements: [],
      createdAt: new Date(),
      updatedAt: new Date()
    })
    setSelectedElementIndex(null)
  }, [])

  const copyZPL = useCallback(() => {
    navigator.clipboard.writeText(previewZPL)
  }, [previewZPL])

  return {
    template,
    selectedElementIndex,
    previewZPL,
    selectedElement: selectedElementIndex !== null ? template.elements[selectedElementIndex] : null,
    templates: templateStorage.listTemplates(),
    updateTemplate,
    addElement,
    updateElement,
    removeElement,
    saveTemplate,
    loadTemplate,
    createNewTemplate,
    setSelectedElementIndex,
    copyZPL
  }
}

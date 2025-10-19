"use client"

import { TemplateManagement } from "@/components/template-management"
import { ElementTools } from "@/components/element-tools"
import { ElementsList } from "@/components/elements-list"
import { ElementProperties } from "@/components/element-properties"
import { ZPLCodeDisplay } from "@/components/zpl-code-display"
import { ZPLPreview } from "@/components/zpl-preview"
import { useTemplateManager } from "@/hooks/use-template-manager"
import { ZPLElement } from "@/types/zpl"

export default function ZPLStudio() {
  const {
    template,
    selectedElementIndex,
    previewZPL,
    selectedElement,
    templates,
    updateTemplate,
    addElement,
    updateElement,
    removeElement,
    saveTemplate,
    loadTemplate,
    createNewTemplate,
    setSelectedElementIndex,
    copyZPL
  } = useTemplateManager()

  const handleSaveTemplate = () => {
    if (saveTemplate()) {
      alert(`Template "${template.name}" saved successfully!`)
    }
  }

  const handleUpdateElement = (updates: Partial<ZPLElement>) => {
    if (selectedElementIndex !== null) {
      updateElement(selectedElementIndex, updates)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            ZPL Studio
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Create, edit, and manage ZPL templates with live preview and real-time testing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Template Management & Element Tools */}
          <div className="lg:col-span-3 space-y-4">
            <TemplateManagement
              template={template}
              onTemplateUpdate={updateTemplate}
              onSaveTemplate={handleSaveTemplate}
              onNewTemplate={createNewTemplate}
              savedTemplates={templates}
              onLoadTemplate={loadTemplate}
            />

            <ElementTools
              onAddElement={addElement}
              elementCount={template.elements.length}
            />
          </div>

          {/* Middle Column - Elements List & Properties */}
          <div className="lg:col-span-5 space-y-4">
            <ElementsList
              elements={template.elements}
              selectedElementIndex={selectedElementIndex}
              onSelectElement={setSelectedElementIndex}
              onRemoveElement={removeElement}
            />

            {selectedElement && (
              <ElementProperties
                element={selectedElement}
                onUpdateElement={handleUpdateElement}
              />
            )}
          </div>

          {/* Right Column - Preview & Code */}
          <div className="lg:col-span-4 space-y-4">
            {/* Live Preview */}
            <div className="shadow-xl border-0 bg-white/90 backdrop-blur-md hover:shadow-2xl transition-all duration-300 rounded-xl p-6">
              <div className="flex items-center gap-3 text-lg font-semibold mb-4">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm"></div>
                <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">Live Preview</span>
                </div>
              <ZPLPreview 
                zpl={previewZPL} 
                width={Math.max(template.width, 600)} 
                height={Math.max(template.height, 400)} 
                dpi={template.dpi} 
              />
                </div>

            <ZPLCodeDisplay
              zpl={previewZPL}
              onCopy={copyZPL}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
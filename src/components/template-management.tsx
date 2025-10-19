"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ZPLTemplate } from "@/types/zpl"

interface TemplateManagementProps {
  template: ZPLTemplate
  onTemplateUpdate: (template: ZPLTemplate) => void
  onSaveTemplate: () => void
  onNewTemplate: () => void
  savedTemplates: ZPLTemplate[]
  onLoadTemplate: (templateId: string) => void
}

export function TemplateManagement({
  template,
  onTemplateUpdate,
  onSaveTemplate,
  onNewTemplate,
  savedTemplates,
  onLoadTemplate
}: TemplateManagementProps) {
  return (
    <div className="lg:col-span-3 space-y-4">
      {/* Template Management */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-sm"></div>
            <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">Template</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="templateName" className="text-sm font-medium text-slate-600">Template Name *</Label>
            <Input
              id="templateName"
              value={template.name}
              onChange={(e) => onTemplateUpdate({ ...template, name: e.target.value })}
              placeholder="Enter template name..."
              className="h-10 text-sm border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-medium text-slate-600">Width</Label>
              <Input
                type="number"
                value={template.width}
                onChange={(e) => onTemplateUpdate({ ...template, width: parseInt(e.target.value) || 0 })}
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-slate-600">Height</Label>
              <Input
                type="number"
                value={template.height}
                onChange={(e) => onTemplateUpdate({ ...template, height: parseInt(e.target.value) || 0 })}
                className="h-8 text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs font-medium text-slate-600">DPI</Label>
            <Select
              value={template.dpi.toString()}
              onValueChange={(value) => onTemplateUpdate({ ...template, dpi: parseInt(value) })}
            >
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="203">203 DPI</SelectItem>
                <SelectItem value="300">300 DPI</SelectItem>
                <SelectItem value="600">600 DPI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={onSaveTemplate} 
              className="w-full h-10 text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              💾 Save Template
            </Button>
            <Button 
              onClick={onNewTemplate} 
              variant="outline" 
              className="w-full h-10 text-sm border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all duration-200"
            >
              ➕ New Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Saved Templates */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm"></div>
            <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">Saved Templates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {savedTemplates.map((t) => (
              <div
                key={t.id}
                className="p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
                onClick={() => onLoadTemplate(t.id)}
              >
                <div className="font-semibold text-sm text-slate-800">{t.name}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {t.elements.length} elements • {t.width}×{t.height}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

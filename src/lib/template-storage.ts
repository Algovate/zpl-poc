import { ZPLElement, ZPLTemplate } from "@/types/zpl"

class TemplateStorage {
  private templates: Map<string, ZPLTemplate> = new Map()
  private static instance: TemplateStorage | null = null

  private constructor() {
    this.loadDefaultTemplates()
  }

  static getInstance(): TemplateStorage {
    if (!TemplateStorage.instance) {
      TemplateStorage.instance = new TemplateStorage()
    }
    return TemplateStorage.instance
  }

  saveTemplate(template: ZPLTemplate): void {
    this.templates.set(template.id, {
      ...template,
      updatedAt: new Date()
    })
  }

  getTemplate(id: string): ZPLTemplate | undefined {
    return this.templates.get(id)
  }

  listTemplates(): ZPLTemplate[] {
    return Array.from(this.templates.values())
  }

  deleteTemplate(id: string): boolean {
    return this.templates.delete(id)
  }

  // Load default templates
  private loadDefaultTemplates(): void {
    const defaultTemplate: ZPLTemplate = {
      id: 'default',
      name: 'Default Waybill Template',
      width: 800,
      height: 600,
      dpi: 203,
      elements: [
        {
          type: 'text',
          x: 10,
          y: 10,
          content: 'serviceType',
          font: 'A0',
          size: 28
        },
        {
          type: 'text',
          x: 10,
          y: 50,
          content: 'originTrackingNumber',
          font: 'A0',
          size: 24
        },
        {
          type: 'barcode',
          x: 200,
          y: 100,
          content: 'deliveredTrackingNumber',
          barcodeType: '128',
          height: 50
        },
        {
          type: 'text',
          x: 10,
          y: 200,
          content: 'senderName',
          font: 'A0',
          size: 20
        },
        {
          type: 'text',
          x: 10,
          y: 230,
          content: 'senderAddress',
          font: 'A0',
          size: 18
        },
        {
          type: 'text',
          x: 10,
          y: 300,
          content: 'receiverName',
          font: 'A0',
          size: 20
        },
        {
          type: 'text',
          x: 10,
          y: 330,
          content: 'receiverAddress',
          font: 'A0',
          size: 18
        },
        {
          type: 'text',
          x: 10,
          y: 400,
          content: 'weight',
          font: 'A0',
          size: 16
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.saveTemplate(defaultTemplate)
  }
}

// Export singleton instance
export const templateStorage = TemplateStorage.getInstance()
export { TemplateStorage }

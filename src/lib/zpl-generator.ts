import { ZPLElement } from "@/types/zpl"

export class ZPLGenerator {
  generate(elements: ZPLElement[]): string {
    let zpl = `^XA
^MMT
^PW800
^LL600
^LS0
^BY3,3,50
`

    elements.forEach(element => {
      zpl += this.generateElement(element)
    })

    zpl += "^XZ"
    return zpl
  }

  private generateElement(element: ZPLElement): string {
    switch (element.type) {
      case 'text':
        return `^FO${element.x},${element.y}
^A0,N,${element.size || 28},${element.size || 28}
^FR
^FD${element.content}
^FS
`
      case 'barcode':
        return `^FO${element.x},${element.y}
^BCN,${element.height || 50},Y,N,N
^FD${element.content}
^FS
`
      case 'box':
        return `^FO${element.x},${element.y}
^GB${element.width || 100},${element.height || 50},3
^FS
`
      case 'line':
        return `^FO${element.x},${element.y}
^GB${element.width || 100},0,3
^FS
`
      default:
        return ''
    }
  }
}

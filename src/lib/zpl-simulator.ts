export interface ZPLSimulatorConfig {
  port: number
  host: string
}

export class ZPLSimulator {
  private config: ZPLSimulatorConfig
  private receivedZPL: string[] = []
  private listeners: ((zpl: string) => void)[] = []

  constructor(config: ZPLSimulatorConfig = { port: 9100, host: 'localhost' }) {
    this.config = config
  }

  // Simulate receiving ZPL data
  async receiveZPL(zpl: string): Promise<boolean> {
    try {
      console.log('📨 ZPL Simulator received data:')
      console.log('=' .repeat(50))
      console.log(zpl)
      console.log('=' .repeat(50))
      
      // Store the received ZPL
      this.receivedZPL.push(zpl)
      
      // Notify listeners
      this.listeners.forEach(listener => listener(zpl))
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 100))
      
      return true
    } catch (error) {
      console.error('❌ ZPL Simulator error:', error)
      return false
    }
  }

  // Get all received ZPL commands
  getReceivedZPL(): string[] {
    return [...this.receivedZPL]
  }

  // Get the latest ZPL command
  getLatestZPL(): string | null {
    return this.receivedZPL.length > 0 ? this.receivedZPL[this.receivedZPL.length - 1] : null
  }

  // Clear received ZPL history
  clearHistory(): void {
    this.receivedZPL = []
  }

  // Add listener for new ZPL commands
  addListener(listener: (zpl: string) => void): void {
    this.listeners.push(listener)
  }

  // Remove listener
  removeListener(listener: (zpl: string) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener)
  }

  // Simulate printer status
  getPrinterStatus(): { online: boolean; ready: boolean; error: string | null } {
    return {
      online: true,
      ready: true,
      error: null
    }
  }

  // Simulate printer capabilities
  getPrinterCapabilities(): {
    maxWidth: number
    maxHeight: number
    supportedFormats: string[]
    supportedBarcodes: string[]
  } {
    return {
      maxWidth: 800,
      maxHeight: 1200,
      supportedFormats: ['ZPL'],
      supportedBarcodes: ['128', '39', '93', 'EAN13', 'EAN8', 'UPCA', 'UPCE', 'QR']
    }
  }
}

// Global simulator instance
export const zplSimulator = new ZPLSimulator()

---
noteId: "9a02de40ac9111f0944c6352953c3307"
tags: []

---

# ZPL Studio - Proof of Concept

A comprehensive Next.js application for creating, managing, and testing ZPL (Zebra Programming Language) label templates with live preview and printer integration capabilities.

## 🚀 Features

### 🎨 Visual Template Editor
- **Drag-and-drop interface** for creating ZPL templates
- **Live preview** with real-time ZPL code generation
- **Multiple element types**: Text, Barcodes, Boxes, and Lines
- **Template management** with save/load functionality
- **Responsive design** with modern UI components

### 🧪 Testing & Integration
- **Integration testing** with predefined test scenarios
- **Printer communication** via TCP, USB, HTTP, and simulator protocols
- **Test data generation** with realistic shipping scenarios
- **ZPL simulator** for development and debugging

### 📊 Advanced Capabilities
- **Multiple DPI support** (203, 300, 600 DPI)
- **Customizable label dimensions**
- **Barcode generation** (Code 128, Code 39, QR codes, etc.)
- **Template storage** with local persistence
- **Export functionality** for ZPL code

## 🏗️ Project Structure

```
zpl-poc/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx           # Main ZPL Studio interface
│   │   ├── integration-test/  # Template testing with real data
│   │   ├── printer-test/      # Printer communication testing
│   │   └── zpl-simulator/     # ZPL command monitoring
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components (Button, Input, etc.)
│   │   └── zpl-preview.tsx   # ZPL canvas preview component
│   └── lib/                  # Core business logic
│       ├── zpl-generator.ts  # ZPL code generation
│       ├── template-storage.ts # Template persistence
│       ├── printer-manager.ts # Printer communication
│       ├── test-models.ts    # Test data scenarios
│       └── zpl-simulator.ts  # ZPL simulation engine
├── public/                   # Static assets
└── package.json             # Dependencies and scripts
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.6 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with custom components
- **UI Components**: Radix UI primitives
- **State Management**: React hooks and context
- **Canvas Rendering**: HTML5 Canvas for ZPL preview
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zpl-poc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📱 Application Pages

### 1. ZPL Studio (Main Page)
**Route**: `/`

The main interface for creating and editing ZPL templates:

- **Template Management**: Create, save, and load templates
- **Element Tools**: Add text, barcodes, boxes, and lines
- **Live Preview**: Real-time visual preview of your label
- **ZPL Code Generation**: View and copy generated ZPL code
- **Properties Panel**: Configure element properties (position, size, content)

### 2. Integration Test
**Route**: `/integration-test`

Test your templates with real data and send to printers:

- **Template Selection**: Choose from saved templates
- **Test Scenarios**: Predefined shipping scenarios (Express, Standard, International, etc.)
- **Data Generation**: Random data generation for testing
- **Printer Selection**: Multiple printer configurations
- **Live Preview**: See how your template looks with real data

### 3. Printer Test
**Route**: `/printer-test`

Test printer communication and configuration:

- **Printer Configuration**: Set up TCP, USB, HTTP, or simulator connections
- **Connection Testing**: Verify printer connectivity
- **Test Label Printing**: Send test labels to printers
- **Protocol Support**: Multiple communication protocols

### 4. ZPL Simulator
**Route**: `/zpl-simulator`

Monitor and analyze ZPL commands:

- **Command History**: View all received ZPL commands
- **Printer Status**: Monitor printer status and capabilities
- **ZPL Analysis**: Copy and view ZPL commands in Labelary viewer
- **Real-time Monitoring**: Live updates of received commands

## 🎯 Key Features Explained

### ZPL Template System
- **Visual Editor**: Create templates using a drag-and-drop interface
- **Element Types**: Support for text, barcodes, boxes, and lines
- **Template Storage**: Local storage with singleton pattern
- **Export/Import**: Save and load template configurations

### Printer Integration
- **Multi-Protocol Support**: TCP, USB, HTTP, and simulator
- **Configuration Management**: Flexible printer setup
- **Error Handling**: Robust error handling and status reporting
- **Testing Tools**: Built-in printer testing capabilities

### Test Data System
- **Predefined Scenarios**: Realistic shipping and logistics scenarios
- **Data Generation**: Random data generation for testing
- **Field Mapping**: Automatic field mapping between data and templates
- **Category Support**: Domestic, international, express, bulk, and special handling

## 🔧 Configuration

### Template Storage
Templates are stored locally using the `TemplateStorage` singleton class. Default templates are automatically loaded on initialization.

### Printer Configuration
Printer settings are configured per test session. Supported configurations:

```typescript
interface PrinterConfig {
  id: string
  name: string
  protocol: 'tcp' | 'usb' | 'http' | 'simulator'
  host?: string
  port?: number
  devicePath?: string
  endpoint?: string
  timeout: number
}
```

### Test Models
Predefined test scenarios include:
- **Express Domestic**: Fast domestic delivery
- **Standard Domestic**: Regular domestic shipping
- **International Express**: International shipping with customs
- **Bulk Shipment**: Large quantity business shipments
- **Fragile Special**: Special handling for fragile items

## 🎨 UI Components

The application uses a custom design system built on:
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **Custom Components**: Specialized ZPL-related components
- **Responsive Design**: Mobile-first approach

## 🧪 Development & Testing

### ZPL Simulator
The built-in ZPL simulator allows for:
- **Command Monitoring**: Track all ZPL commands sent
- **Status Simulation**: Simulate printer status and capabilities
- **Development Testing**: Test without physical printers
- **Command Analysis**: Analyze and debug ZPL commands

### Integration Testing
- **Automated Testing**: Predefined test scenarios
- **Data Validation**: Ensure template compatibility with real data
- **Printer Testing**: Verify printer communication
- **Error Handling**: Test error scenarios and recovery

## 📚 ZPL Reference

The application supports standard ZPL commands:
- **Text Elements**: `^A` (font), `^FD` (field data)
- **Barcodes**: `^BC` (barcode), various barcode types
- **Graphics**: `^GB` (graphic box), `^GC` (graphic circle)
- **Positioning**: `^FO` (field origin), `^FT` (field typeset)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the CRAB (Cargo Routing and Billing) system proof of concept.

## 🔗 Related Projects

- **CRAB Main Application**: Ruby on Rails application for cargo management
- **Label Template System**: Integration with existing label generation
- **Printer Management**: Production printer integration

## 📞 Support

For questions or issues:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Contact the development team

---

**Note**: This is a proof of concept application for demonstrating ZPL template creation and printer integration capabilities. For production use, additional security, error handling, and scalability considerations should be implemented.

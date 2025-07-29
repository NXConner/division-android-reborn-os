# ISAC OS - Complete Tactical Interface

*Division-Inspired Strategic Command Center*

**URL**: https://lovable.dev/projects/35b71cd5-4eb6-4395-bc1c-5646e3083938

## 🎯 Overview

The **ISAC OS** is a comprehensive, military-grade tactical interface inspired by Tom Clancy's The Division franchise. Built with React, TypeScript, and modern web technologies, it provides an immersive cyberpunk/tactical command center experience with advanced visual effects, real-time data processing, and modular component architecture.

## ✨ Key Features

### 🎨 **Complete Tactical Design System**
- **Dark Tactical Theme**: Military command center with orange tactical accents
- **Cyberpunk Effects**: Glowing animations, scanning lines, holographic panels
- **Typography**: JetBrains Mono & Orbitron tactical fonts
- **15+ Custom Animations**: pulse-glow, tactical-scan, hologram-flicker, energy-pulse, etc.
- **HSL Color System**: Comprehensive tactical color palette with semantic mapping

### 🗺️ **Advanced Tactical Mapping (NEW)**
- **10 Integrated Mapping Services**: Choose from multiple providers
  - OpenStreetMap (Standard & Humanitarian)
  - CartoDB (Positron & Dark Matter)
  - Esri (World Imagery & Topographic)
  - Stamen (Terrain & Toner)
  - OpenTopoMap
  - OpenCycleMap
- **Interactive Features**:
  - Real-time threat markers with custom tactical icons
  - Zone control overlays (Safe, Dark, Contaminated, Hostile)
  - Threat radius visualization
  - Live agent tracking
  - Click-to-inspect functionality
  - Layer toggle controls
  - Fullscreen mode
- **Manhattan-Based Scenario**: Realistic NYC tactical operations

### 👥 **Comprehensive Agent Management**
- **Real-time Agent Tracking**: Live health, armor, and position updates
- **Detailed Agent Profiles**: 
  - Skill trees (Medical, Tech, Security)
  - Equipment loadouts
  - Combat statistics (DPS, Toughness, Skill Power)
  - Mission history and performance metrics
- **Interactive Details View**: Click-through agent inspection
- **Status Monitoring**: Active, Rogue, MIA, KIA tracking

### 📊 **Advanced Status Bar**
- **Real-time System Metrics**: CPU, Memory, Temperature, Power
- **Network Status**: Dynamic security monitoring
- **Threat Level Assessment**: Live threat detection and classification
- **Agent Status Overview**: Online agents and threat counts
- **Dual-layer Design**: Main status bar + secondary information bar

### 🧩 **Tactical Component Library**
- **Enhanced Base Components**: 
  - Buttons (10+ tactical variants)
  - Cards (tactical, holographic, elevated variants)
  - Badges (20+ status types)
  - Progress bars with glow effects
- **Specialized Components**:
  - StatusIndicator (animated status display)
  - HolographicPanel (advanced visual effects)
  - TacticalSwitch (military-style toggles)
  - CommandInput (terminal interface with history)
  - LiveMetric (real-time data display)

### 🚀 **Navigation & Routing**
- **10 Main Interface Sections**:
  - Tactical Overview (Main dashboard)
  - Division Agents (Agent management)
  - Mission Board (Mission tracking)
  - **Tactical Map (Interactive mapping)**
  - System Diagnostics (Performance monitoring)
  - Intelligence (Data analysis)
  - Communications (Agent comms)
  - Command Terminal (System access)
  - Mission Reports (Analytics)
  - System Configuration (Settings)
- **Responsive Layout**: Collapsible sidebar with compact mode
- **Seamless Navigation**: Smooth transitions between sections

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** with custom tactical theme
- **Leaflet & React-Leaflet** for advanced mapping
- **Radix UI** for accessible base components
- **Lucide React** for consistent iconography
- **React Router** for navigation
- **Class Variance Authority** for component variants
- **TanStack Query** for data management

## 🎮 Interactive Features

### 🗺️ **Tactical Map Interface**
```typescript
// 10 Available Map Services
const mapServices = [
  "OpenStreetMap Standard",     // Community-driven mapping
  "OpenStreetMap Humanitarian", // Emergency-focused
  "CartoDB Positron",          // Clean light theme
  "CartoDB Dark Matter",       // Tactical dark theme
  "Esri World Imagery",        // High-res satellite
  "Esri World Topographic",    // Detailed topographic
  "Stamen Terrain",            // Artistic terrain
  "Stamen Toner",              // High contrast B&W
  "OpenTopoMap",               // Topographic OSM
  "OpenCycleMap"               // Cycling/outdoor
];
```

- **Real-time Threat Tracking**: Live marker updates with animations
- **Zone Control**: Visual overlays for different area types
- **Tactical Icons**: Custom military-style markers
- **Interactive Popups**: Detailed threat information
- **Layer Controls**: Toggle visibility of different data layers
- **Service Switching**: Real-time map provider switching

### 👤 **Agent Management**
- **Live Data Updates**: Real-time health and status changes
- **Skill Progression**: Visual skill tree display
- **Equipment Tracking**: Complete gear visualization
- **Performance Metrics**: Combat effectiveness analysis
- **Threat Assessment**: Dynamic threat level calculation

### 📡 **System Monitoring**
- **Live Metrics**: CPU, memory, temperature, network strength
- **Dynamic Status**: Automatic threat level adjustments
- **Alert System**: Real-time security notifications
- **Performance Tracking**: System health visualization

## 🚀 Quick Start

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎯 Advanced Usage

### Map Service Selection
Navigate to `/map` to access the full tactical mapping interface:
- Choose from 10 different mapping services
- Toggle threat indicators, zone overlays, and agent positions
- Click markers for detailed threat information
- Use fullscreen mode for enhanced operational view

### Agent Monitoring
Access comprehensive agent management:
- View real-time agent status and locations
- Inspect detailed agent profiles with skill trees
- Monitor rogue agent activities
- Track mission performance metrics

### System Dashboard
Monitor all tactical operations:
- Real-time system health metrics
- Network security status
- Threat level assessments
- Agent deployment overview

## 🎨 Design Philosophy

- **Information Density**: Efficient data presentation with clear hierarchy
- **Tactical Aesthetics**: Military command center with orange accents
- **Interactive Feedback**: Responsive animations and state changes
- **Cyberpunk Elements**: Glowing effects, scanning lines, grid overlays
- **Modular Architecture**: Scalable component system

## 📱 Responsive Design

- **Desktop**: Full tactical interface with all features
- **Tablet**: Optimized layout with collapsible sidebar
- **Mobile**: Compact interface with touch-friendly controls

## 🔧 Deployment

Deploy easily with Lovable:
1. Open [Lovable Project](https://lovable.dev/projects/35b71cd5-4eb6-4395-bc1c-5646e3083938)
2. Click **Share → Publish**
3. Access your tactical command center!

## 🌟 What's New

### Latest Updates:
- ✅ **Advanced Tactical Mapping**: 10 integrated mapping services
- ✅ **Real-time Threat Tracking**: Live Manhattan-based scenario
- ✅ **Interactive Zone Control**: Visual area overlays
- ✅ **Enhanced Agent Management**: Comprehensive profile system
- ✅ **Tactical Component Library**: Military-grade UI components
- ✅ **Comprehensive Navigation**: Full routing system
- ✅ **Performance Optimizations**: Real-time data processing

### Coming Soon:
- Advanced data visualization components
- Sound effects and audio feedback
- Particle effects system
- Mission planning interface
- Communication system
- Advanced analytics dashboard

---

*Built with precision for tactical excellence* 🎯

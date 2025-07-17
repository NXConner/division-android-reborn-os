import { useState } from 'react';
import { 
  MapPin, 
  Users, 
  Shield, 
  Target, 
  AlertTriangle,
  Radio,
  Home,
  Crosshair
} from 'lucide-react';

interface MapLocation {
  id: string;
  name: string;
  type: 'SAFEHOUSE' | 'DARKZONE' | 'CONTAMINATED' | 'OBJECTIVE' | 'AGENT' | 'ROGUE';
  x: number;
  y: number;
  status: 'SECURE' | 'HOSTILE' | 'UNKNOWN' | 'COMPROMISED';
  description?: string;
}

const locations: MapLocation[] = [
  {
    id: 'SH-01',
    name: 'Base of Operations',
    type: 'SAFEHOUSE',
    x: 25,
    y: 60,
    status: 'SECURE',
    description: 'Primary command center'
  },
  {
    id: 'DZ-E',
    name: 'Dark Zone East',
    type: 'DARKZONE',
    x: 70,
    y: 30,
    status: 'HOSTILE',
    description: 'High-value loot area'
  },
  {
    id: 'CZ-01',
    name: 'Contaminated Zone',
    type: 'CONTAMINATED',
    x: 45,
    y: 25,
    status: 'COMPROMISED',
    description: 'Viral contamination detected'
  },
  {
    id: 'OBJ-1',
    name: 'Supply Drop',
    type: 'OBJECTIVE',
    x: 60,
    y: 70,
    status: 'UNKNOWN',
    description: 'Resupply point'
  },
  {
    id: 'AGT-01',
    name: 'Phoenix-01',
    type: 'AGENT',
    x: 35,
    y: 45,
    status: 'SECURE'
  },
  {
    id: 'RGU-01',
    name: 'Shadow-07',
    type: 'ROGUE',
    x: 55,
    y: 35,
    status: 'HOSTILE',
    description: 'Rogue Division agent'
  }
];

export default function TacticalMap() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  const getLocationIcon = (type: MapLocation['type']) => {
    switch (type) {
      case 'SAFEHOUSE': return <Home className="w-4 h-4" />;
      case 'DARKZONE': return <Shield className="w-4 h-4" />;
      case 'CONTAMINATED': return <AlertTriangle className="w-4 h-4" />;
      case 'OBJECTIVE': return <Target className="w-4 h-4" />;
      case 'AGENT': return <Users className="w-4 h-4" />;
      case 'ROGUE': return <Crosshair className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getLocationColor = (type: MapLocation['type'], status: MapLocation['status']) => {
    if (type === 'ROGUE') return 'text-destructive';
    if (type === 'AGENT') return 'text-success';
    if (type === 'CONTAMINATED') return 'text-warning';
    
    switch (status) {
      case 'SECURE': return 'text-success';
      case 'HOSTILE': return 'text-destructive';
      case 'COMPROMISED': return 'text-warning';
      case 'UNKNOWN': return 'text-primary';
      default: return 'text-foreground';
    }
  };

  return (
    <div className="status-panel space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-tactical text-lg font-bold tracking-wider">TACTICAL MAP</h3>
        <div className="flex items-center space-x-2">
          <Radio className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs text-muted-foreground">LIVE FEED</span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-64 bg-muted rounded border border-border overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-tactical-grid opacity-20"></div>
        
        {/* Map Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-primary/10"></div>
        
        {/* Locations */}
        {locations.map((location) => (
          <div
            key={location.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
              selectedLocation?.id === location.id ? 'z-20' : 'z-10'
            }`}
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
            onClick={() => setSelectedLocation(location)}
          >
            <div className={`
              relative p-2 rounded-full border border-current
              ${getLocationColor(location.type, location.status)}
              ${selectedLocation?.id === location.id ? 'scale-125 animate-pulse-glow' : 'hover:scale-110'}
              transition-all duration-300
            `}>
              {getLocationIcon(location.type)}
              
              {/* Pulse animation for active locations */}
              {(location.type === 'AGENT' || location.type === 'ROGUE') && (
                <div className="absolute inset-0 rounded-full animate-ping border border-current opacity-50"></div>
              )}
            </div>
            
            {/* Location label */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
              <span className="text-xs font-mono bg-background/80 px-1 rounded">
                {location.name}
              </span>
            </div>
          </div>
        ))}
        
        {/* Scanning line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-primary animate-tactical-scan opacity-60"></div>
      </div>

      {/* Location Details */}
      {selectedLocation && (
        <div className="tactical-border p-3 space-y-2 animate-data-flow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={getLocationColor(selectedLocation.type, selectedLocation.status)}>
                {getLocationIcon(selectedLocation.type)}
              </div>
              <span className="font-mono font-bold text-sm">{selectedLocation.name}</span>
            </div>
            <span className={`text-xs font-bold ${getLocationColor(selectedLocation.type, selectedLocation.status)}`}>
              {selectedLocation.status}
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            ID: {selectedLocation.id} | TYPE: {selectedLocation.type}
          </div>
          
          {selectedLocation.description && (
            <div className="text-xs text-foreground">
              {selectedLocation.description}
            </div>
          )}
          
          <div className="text-xs text-muted-foreground">
            COORDINATES: {selectedLocation.x.toFixed(2)}, {selectedLocation.y.toFixed(2)}
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center space-x-1">
          <Home className="w-3 h-3 text-success" />
          <span className="text-muted-foreground">SAFEHOUSE</span>
        </div>
        <div className="flex items-center space-x-1">
          <Shield className="w-3 h-3 text-destructive" />
          <span className="text-muted-foreground">DARK ZONE</span>
        </div>
        <div className="flex items-center space-x-1">
          <AlertTriangle className="w-3 h-3 text-warning" />
          <span className="text-muted-foreground">CONTAMINATED</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-3 h-3 text-success" />
          <span className="text-muted-foreground">AGENTS</span>
        </div>
        <div className="flex items-center space-x-1">
          <Crosshair className="w-3 h-3 text-destructive" />
          <span className="text-muted-foreground">ROGUE</span>
        </div>
        <div className="flex items-center space-x-1">
          <Target className="w-3 h-3 text-primary" />
          <span className="text-muted-foreground">OBJECTIVE</span>
        </div>
      </div>
    </div>
  );
}
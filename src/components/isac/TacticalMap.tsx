import { useState, useEffect, useRef } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  Circle, 
  Polygon,
  useMap,
  useMapEvents
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Map, 
  Layers, 
  Target, 
  AlertTriangle, 
  Shield, 
  Crosshair,
  Radar,
  Navigation,
  Zap,
  Users,
  MapPin,
  Activity,
  Eye,
  Settings,
  Maximize,
  Minimize,
  RotateCcw,
  Search,
  Plus,
  Minus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapServiceSelector, mapServices, type MapService } from '@/components/ui/map-service-selector';
import { TacticalSwitch } from '@/components/ui/tactical-switch';
import { cn } from '@/lib/utils';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom tactical icons
const createTacticalIcon = (color: string, symbol: string) => {
  return L.divIcon({
    className: 'custom-tactical-marker',
    html: `
      <div style="
        background: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        color: white;
        box-shadow: 0 0 10px ${color}40;
      ">${symbol}</div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

// Tactical icons
const tacticalIcons = {
  agent: createTacticalIcon('#22c55e', 'A'),
  rogue: createTacticalIcon('#ef4444', 'R'),
  threat: createTacticalIcon('#f59e0b', '⚠'),
  objective: createTacticalIcon('#3b82f6', '○'),
  extraction: createTacticalIcon('#8b5cf6', 'E'),
  safehouse: createTacticalIcon('#10b981', 'S'),
  darkzone: createTacticalIcon('#dc2626', 'D'),
  contaminated: createTacticalIcon('#fbbf24', '☢'),
};

interface ThreatMarker {
  id: string;
  position: [number, number];
  type: 'agent' | 'rogue' | 'threat' | 'objective' | 'extraction' | 'safehouse' | 'darkzone' | 'contaminated';
  title: string;
  description: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: string;
}

interface TacticalZone {
  id: string;
  name: string;
  type: 'safe' | 'contaminated' | 'dark' | 'hostile';
  coordinates: [number, number][];
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  status: 'secure' | 'compromised' | 'unknown';
}

// Manhattan-based tactical data
const manhattanCenter: [number, number] = [40.7831, -73.9712];

const mockThreatMarkers: ThreatMarker[] = [
  {
    id: '1',
    position: [40.7905, -73.9593],
    type: 'agent',
    title: 'PHOENIX-01',
    description: 'Agent on patrol in Central Park area',
    level: 'low',
    lastUpdated: '2m ago'
  },
  {
    id: '2',
    position: [40.7614, -73.9776],
    type: 'rogue',
    title: 'SHADOW-07',
    description: 'Rogue agent detected in Times Square',
    level: 'critical',
    lastUpdated: '15m ago'
  },
  {
    id: '3',
    position: [40.7675, -73.9776],
    type: 'threat',
    title: 'Hostile Activity',
    description: 'Unidentified threats in Hell\'s Kitchen',
    level: 'high',
    lastUpdated: '8m ago'
  },
  {
    id: '4',
    position: [40.7488, -73.9857],
    type: 'safehouse',
    title: 'Safe House Bravo',
    description: 'Secure Division facility',
    level: 'low',
    lastUpdated: '1m ago'
  },
  {
    id: '5',
    position: [40.7282, -74.0776],
    type: 'darkzone',
    title: 'Dark Zone Alpha',
    description: 'High-risk contaminated area',
    level: 'critical',
    lastUpdated: '5m ago'
  }
];

const mockTacticalZones: TacticalZone[] = [
  {
    id: 'dz-01',
    name: 'Dark Zone East',
    type: 'dark',
    coordinates: [
      [40.7750, -73.9600],
      [40.7850, -73.9600],
      [40.7850, -73.9500],
      [40.7750, -73.9500]
    ],
    threatLevel: 'critical',
    status: 'compromised'
  },
  {
    id: 'safe-01',
    name: 'Safe Zone Alpha',
    type: 'safe',
    coordinates: [
      [40.7450, -73.9900],
      [40.7550, -73.9900],
      [40.7550, -73.9800],
      [40.7450, -73.9800]
    ],
    threatLevel: 'low',
    status: 'secure'
  }
];

// Map event handler component
function MapEventHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Zoom control component
function ZoomControl() {
  const map = useMap();
  
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-background/90 backdrop-blur-sm"
        onClick={() => map.zoomIn()}
      >
        <Plus className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-background/90 backdrop-blur-sm"
        onClick={() => map.zoomOut()}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-background/90 backdrop-blur-sm"
        onClick={() => map.setView(manhattanCenter, 12)}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function TacticalMap() {
  const [selectedService, setSelectedService] = useState('cartodb-dark');
  const [showThreats, setShowThreats] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [showAgents, setShowAgents] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>(manhattanCenter);
  const [mapZoom, setMapZoom] = useState(12);
  const [threatMarkers, setThreatMarkers] = useState<ThreatMarker[]>(mockThreatMarkers);
  const [selectedMarker, setSelectedMarker] = useState<ThreatMarker | null>(null);

  const currentService = mapServices.find(service => service.id === selectedService) || mapServices[0];

  // Real-time threat updates
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatMarkers(prev => prev.map(marker => ({
        ...marker,
        position: [
          marker.position[0] + (Math.random() - 0.5) * 0.001,
          marker.position[1] + (Math.random() - 0.5) * 0.001
        ],
        lastUpdated: Math.random() > 0.7 ? 'Just now' : marker.lastUpdated
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getZoneColor = (zone: TacticalZone) => {
    switch (zone.type) {
      case 'safe': return '#22c55e';
      case 'contaminated': return '#f59e0b';
      case 'dark': return '#dc2626';
      case 'hostile': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'low': return '#22c55e';
      case 'medium': return '#f59e0b';
      case 'high': return '#f97316';
      case 'critical': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    console.log('Map clicked:', lat, lng);
    // Handle map click for adding markers, waypoints, etc.
  };

  const filteredMarkers = threatMarkers.filter(marker => {
    if (!showThreats && (marker.type === 'threat' || marker.type === 'contaminated')) return false;
    if (!showAgents && (marker.type === 'agent' || marker.type === 'rogue')) return false;
    return true;
  });

  return (
    <Card variant="tactical" className={cn(
      "relative",
      isFullscreen && "fixed inset-0 z-50 rounded-none"
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">TACTICAL MAP</CardTitle>
            <Badge variant="success" size="sm">LIVE</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-8 w-8"
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
          {/* Map Controls */}
          <div className="space-y-4">
            {/* Map Service Selector */}
            <MapServiceSelector
              selectedService={selectedService}
              onServiceChange={setSelectedService}
              compact
            />

            {/* Layer Controls */}
            <Card variant="ghost" className="p-3">
              <div className="space-y-3">
                <h4 className="text-sm font-tactical font-bold text-primary">
                  TACTICAL LAYERS
                </h4>
                <div className="space-y-2">
                  <TacticalSwitch
                    checked={showThreats}
                    onCheckedChange={setShowThreats}
                    label="Threat Indicators"
                    size="sm"
                  />
                  <TacticalSwitch
                    checked={showZones}
                    onCheckedChange={setShowZones}
                    label="Zone Overlays"
                    size="sm"
                  />
                  <TacticalSwitch
                    checked={showAgents}
                    onCheckedChange={setShowAgents}
                    label="Agent Positions"
                    size="sm"
                  />
                </div>
              </div>
            </Card>

            {/* Threat Summary */}
            <Card variant="ghost" className="p-3">
              <div className="space-y-3">
                <h4 className="text-sm font-tactical font-bold text-primary">
                  THREAT SUMMARY
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-lg font-mono font-bold text-success">
                      {threatMarkers.filter(m => m.type === 'agent').length}
                    </div>
                    <div className="text-muted-foreground">AGENTS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-mono font-bold text-destructive">
                      {threatMarkers.filter(m => m.type === 'rogue').length}
                    </div>
                    <div className="text-muted-foreground">ROGUE</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-mono font-bold text-warning">
                      {threatMarkers.filter(m => m.type === 'threat').length}
                    </div>
                    <div className="text-muted-foreground">THREATS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-mono font-bold text-info">
                      {threatMarkers.filter(m => m.type === 'safehouse').length}
                    </div>
                    <div className="text-muted-foreground">SAFE</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3 relative">
            <div className="h-96 lg:h-[500px] rounded-sm overflow-hidden border border-border">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <TileLayer
                  attribution={currentService.attribution}
                  url={currentService.url}
                  maxZoom={currentService.maxZoom}
                />

                {/* Map Event Handler */}
                <MapEventHandler onMapClick={handleMapClick} />

                {/* Custom Zoom Control */}
                <ZoomControl />

                {/* Tactical Zones */}
                {showZones && mockTacticalZones.map((zone) => (
                  <Polygon
                    key={zone.id}
                    positions={zone.coordinates}
                    pathOptions={{
                      color: getZoneColor(zone),
                      fillColor: getZoneColor(zone),
                      fillOpacity: 0.2,
                      weight: 2,
                      opacity: 0.8
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <div className="font-bold text-sm">{zone.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Type: {zone.type.toUpperCase()}
                        </div>
                        <div className="text-xs">
                          Status: <span className={`font-bold ${
                            zone.status === 'secure' ? 'text-success' : 
                            zone.status === 'compromised' ? 'text-destructive' : 'text-warning'
                          }`}>
                            {zone.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </Popup>
                  </Polygon>
                ))}

                {/* Threat Markers */}
                {filteredMarkers.map((marker) => (
                  <Marker
                    key={marker.id}
                    position={marker.position}
                    icon={tacticalIcons[marker.type]}
                    eventHandlers={{
                      click: () => setSelectedMarker(marker),
                    }}
                  >
                    <Popup>
                      <div className="p-2 min-w-48">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="font-bold text-sm">{marker.title}</div>
                          <Badge
                            variant={
                              marker.level === 'critical' ? 'destructive' :
                              marker.level === 'high' ? 'warning' :
                              marker.level === 'medium' ? 'secondary' : 'success'
                            }
                            size="sm"
                          >
                            {marker.level.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {marker.description}
                        </div>
                        <div className="text-xs">
                          Last updated: {marker.lastUpdated}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Position: {marker.position[0].toFixed(4)}, {marker.position[1].toFixed(4)}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Threat Radius Circles */}
                {showThreats && threatMarkers
                  .filter(m => m.type === 'threat' || m.type === 'rogue')
                  .map((marker) => (
                    <Circle
                      key={`${marker.id}-radius`}
                      center={marker.position}
                      radius={marker.level === 'critical' ? 500 : marker.level === 'high' ? 300 : 200}
                      pathOptions={{
                        color: getThreatLevelColor(marker.level),
                        fillColor: getThreatLevelColor(marker.level),
                        fillOpacity: 0.1,
                        weight: 1,
                        opacity: 0.6
                      }}
                    />
                  ))}
              </MapContainer>
            </div>

            {/* Map Overlay Info */}
            <div className="absolute bottom-4 left-4 z-[1000] bg-background/90 backdrop-blur-sm rounded-sm p-2 border border-border">
              <div className="text-xs font-mono space-y-1">
                <div>Service: {currentService.name}</div>
                <div>Zoom: {mapZoom}</div>
                <div>Center: {mapCenter[0].toFixed(4)}, {mapCenter[1].toFixed(4)}</div>
              </div>
            </div>

            {/* Selected Marker Info */}
            {selectedMarker && (
              <div className="absolute top-4 left-4 z-[1000] bg-background/95 backdrop-blur-sm rounded-sm p-3 border border-border min-w-64">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-tactical font-bold text-primary text-sm">
                    {selectedMarker.title}
                  </h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setSelectedMarker(null)}
                  >
                    ×
                  </Button>
                </div>
                <div className="space-y-2 text-xs">
                  <div>Type: {selectedMarker.type.toUpperCase()}</div>
                  <div>Threat Level: <span className={`font-bold ${
                    selectedMarker.level === 'critical' ? 'text-destructive' :
                    selectedMarker.level === 'high' ? 'text-warning' :
                    selectedMarker.level === 'medium' ? 'text-secondary' : 'text-success'
                  }`}>
                    {selectedMarker.level.toUpperCase()}
                  </span></div>
                  <div>{selectedMarker.description}</div>
                  <div className="text-muted-foreground">
                    Last updated: {selectedMarker.lastUpdated}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
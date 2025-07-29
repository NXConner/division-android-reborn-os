import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Map, 
  Satellite, 
  Globe, 
  Navigation, 
  Layers,
  MapPin,
  Zap,
  Eye,
  Target,
  Settings
} from "lucide-react"

export interface MapService {
  id: string
  name: string
  description: string
  type: 'street' | 'satellite' | 'terrain' | 'hybrid'
  provider: string
  icon: React.ComponentType<{ className?: string }>
  url: string
  attribution: string
  maxZoom: number
  features: string[]
  quality: 'high' | 'medium' | 'low'
  speed: 'fast' | 'medium' | 'slow'
}

export const mapServices: MapService[] = [
  {
    id: "osm-standard",
    name: "OpenStreetMap Standard",
    description: "Community-driven open-source mapping",
    type: "street",
    provider: "OpenStreetMap",
    icon: Map,
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19,
    features: ["Street names", "Buildings", "POI", "Public transport"],
    quality: "high",
    speed: "fast"
  },
  {
    id: "osm-humanitarian",
    name: "OpenStreetMap Humanitarian",
    description: "Humanitarian-focused mapping with enhanced contrast",
    type: "street",
    provider: "OpenStreetMap",
    icon: Target,
    url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors, Tiles courtesy of Humanitarian OpenStreetMap Team",
    maxZoom: 20,
    features: ["Emergency services", "Medical facilities", "High contrast", "Accessibility"],
    quality: "high",
    speed: "medium"
  },
  {
    id: "cartodb-positron",
    name: "CartoDB Positron",
    description: "Clean, minimal light theme perfect for overlays",
    type: "street",
    provider: "CartoDB",
    icon: Eye,
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: "© OpenStreetMap contributors © CARTO",
    maxZoom: 20,
    features: ["Minimal design", "Clean labels", "Perfect for overlays", "Light theme"],
    quality: "high",
    speed: "fast"
  },
  {
    id: "cartodb-dark",
    name: "CartoDB Dark Matter",
    description: "Dark theme ideal for tactical operations",
    type: "street",
    provider: "CartoDB",
    icon: Zap,
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: "© OpenStreetMap contributors © CARTO",
    maxZoom: 20,
    features: ["Dark theme", "Tactical styling", "High contrast", "Night operations"],
    quality: "high",
    speed: "fast"
  },
  {
    id: "esri-world-imagery",
    name: "Esri World Imagery",
    description: "High-resolution satellite imagery",
    type: "satellite",
    provider: "Esri",
    icon: Satellite,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    maxZoom: 20,
    features: ["Satellite imagery", "High resolution", "Recent updates", "Global coverage"],
    quality: "high",
    speed: "medium"
  },
  {
    id: "esri-world-topo",
    name: "Esri World Topographic",
    description: "Detailed topographic mapping",
    type: "terrain",
    provider: "Esri",
    icon: Globe,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles © Esri — Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
    maxZoom: 20,
    features: ["Topographic data", "Elevation contours", "Trail information", "Terrain details"],
    quality: "high",
    speed: "medium"
  },
  {
    id: "stamen-terrain",
    name: "Stamen Terrain",
    description: "Artistic terrain visualization",
    type: "terrain",
    provider: "Stamen Design",
    icon: Navigation,
    url: "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png",
    attribution: "Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors",
    maxZoom: 18,
    features: ["Artistic styling", "Terrain visualization", "Hill shading", "Unique design"],
    quality: "medium",
    speed: "fast"
  },
  {
    id: "stamen-toner",
    name: "Stamen Toner",
    description: "High contrast black and white",
    type: "street",
    provider: "Stamen Design",
    icon: Target,
    url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
    attribution: "Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors",
    maxZoom: 20,
    features: ["High contrast", "Black & white", "Clean design", "Typography focus"],
    quality: "medium",
    speed: "fast"
  },
  {
    id: "opentopo",
    name: "OpenTopoMap",
    description: "Topographic maps based on OpenStreetMap",
    type: "terrain",
    provider: "OpenTopoMap",
    icon: MapPin,
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: "Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)",
    maxZoom: 17,
    features: ["Topographic style", "Hiking trails", "Elevation data", "Open source"],
    quality: "medium",
    speed: "medium"
  },
  {
    id: "cyclemap",
    name: "OpenCycleMap",
    description: "Specialized for cycling and outdoor activities",
    type: "terrain",
    provider: "Thunderforest",
    icon: Navigation,
    url: "https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=YOUR_API_KEY",
    attribution: "Maps © Thunderforest, Data © OpenStreetMap contributors",
    maxZoom: 18,
    features: ["Cycling routes", "Elevation profiles", "Outdoor activities", "Trail information"],
    quality: "medium",
    speed: "medium"
  }
]

export interface MapServiceSelectorProps {
  selectedService: string
  onServiceChange: (serviceId: string) => void
  showDetails?: boolean
  compact?: boolean
  className?: string
}

const MapServiceSelector = React.forwardRef<HTMLDivElement, MapServiceSelectorProps>(
  ({ selectedService, onServiceChange, showDetails = true, compact = false, className, ...props }, ref) => {
    const [showAllDetails, setShowAllDetails] = useState(false)
    
    const currentService = mapServices.find(service => service.id === selectedService) || mapServices[0]
    
    const getTypeColor = (type: string) => {
      switch (type) {
        case 'street': return 'primary'
        case 'satellite': return 'info'
        case 'terrain': return 'success'
        case 'hybrid': return 'warning'
        default: return 'secondary'
      }
    }

    const getQualityColor = (quality: string) => {
      switch (quality) {
        case 'high': return 'success'
        case 'medium': return 'warning'
        case 'low': return 'destructive'
        default: return 'secondary'
      }
    }

    const getSpeedColor = (speed: string) => {
      switch (speed) {
        case 'fast': return 'success'
        case 'medium': return 'warning'
        case 'slow': return 'destructive'
        default: return 'secondary'
      }
    }

    if (compact) {
      return (
        <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
          <Select value={selectedService} onValueChange={onServiceChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mapServices.map((service) => {
                const Icon = service.icon
                return (
                  <SelectItem key={service.id} value={service.id}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{service.name}</span>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          <Badge variant={getTypeColor(currentService.type)} size="sm">
            {currentService.type.toUpperCase()}
          </Badge>
        </div>
      )
    }

    return (
      <Card ref={ref} variant="tactical" className={cn("", className)} {...props}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">MAP SERVICES</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllDetails(!showAllDetails)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Service Selector */}
          <div className="space-y-3">
            <div className="text-sm font-mono font-semibold text-muted-foreground">
              ACTIVE MAP SERVICE
            </div>
            <Select value={selectedService} onValueChange={onServiceChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mapServices.map((service) => {
                  const Icon = service.icon
                  return (
                    <SelectItem key={service.id} value={service.id}>
                      <div className="flex items-center gap-3 py-1">
                        <Icon className="w-4 h-4" />
                        <div className="flex-1">
                          <div className="font-semibold">{service.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {service.provider} • {service.type}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Current Service Details */}
          {showDetails && (
            <div className="space-y-3 p-3 bg-background-elevated rounded-sm border border-border">
              <div className="flex items-center gap-2">
                <currentService.icon className="w-5 h-5 text-primary" />
                <h4 className="font-tactical font-bold text-primary">
                  {currentService.name}
                </h4>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {currentService.description}
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge variant={getTypeColor(currentService.type)} size="sm">
                  {currentService.type.toUpperCase()}
                </Badge>
                <Badge variant={getQualityColor(currentService.quality)} size="sm">
                  {currentService.quality.toUpperCase()} QUALITY
                </Badge>
                <Badge variant={getSpeedColor(currentService.speed)} size="sm">
                  {currentService.speed.toUpperCase()} SPEED
                </Badge>
                <Badge variant="outline" size="sm">
                  ZOOM {currentService.maxZoom}
                </Badge>
              </div>

              {showAllDetails && (
                <div className="space-y-2">
                  <div className="text-xs font-mono font-semibold text-muted-foreground">
                    FEATURES
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {currentService.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" size="sm">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="text-xs text-muted-foreground font-mono pt-2 border-t border-border">
                    Provider: {currentService.provider}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Switch Buttons */}
          <div className="space-y-2">
            <div className="text-sm font-mono font-semibold text-muted-foreground">
              QUICK SWITCH
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={currentService.type === 'street' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onServiceChange('cartodb-dark')}
              >
                <Map className="w-4 h-4 mr-2" />
                TACTICAL
              </Button>
              <Button
                variant={currentService.type === 'satellite' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onServiceChange('esri-world-imagery')}
              >
                <Satellite className="w-4 h-4 mr-2" />
                SATELLITE
              </Button>
              <Button
                variant={currentService.type === 'terrain' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onServiceChange('esri-world-topo')}
              >
                <Globe className="w-4 h-4 mr-2" />
                TERRAIN
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onServiceChange('osm-standard')}
              >
                <Navigation className="w-4 h-4 mr-2" />
                STANDARD
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
)
MapServiceSelector.displayName = "MapServiceSelector"

export { MapServiceSelector }
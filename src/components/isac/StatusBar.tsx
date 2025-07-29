import { useState, useEffect } from 'react';
import { 
  Shield, 
  Activity, 
  Wifi, 
  Battery, 
  Signal, 
  AlertTriangle,
  MapPin,
  Cpu,
  HardDrive,
  Thermometer,
  Zap,
  Satellite,
  Users,
  Target,
  Eye,
  Clock
} from 'lucide-react';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { Badge } from '@/components/ui/badge';
import { HolographicPanel } from '@/components/ui/holographic-panel';

interface SystemMetrics {
  cpu: number;
  memory: number;
  temperature: number;
  power: number;
  networkStrength: number;
  agentsOnline: number;
  threatsDetected: number;
  scanProgress: number;
}

export default function StatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [networkStatus, setNetworkStatus] = useState<'SECURE' | 'COMPROMISED' | 'SCANNING'>('SECURE');
  const [agentStatus, setAgentStatus] = useState<'ACTIVE' | 'ROGUE' | 'MIA'>('ACTIVE');
  const [threatLevel, setThreatLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('LOW');
  const [location, setLocation] = useState('MANHATTAN SECTOR - SAFE HOUSE ECHO');
  const [isConnected, setIsConnected] = useState(true);
  
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 23.5,
    memory: 67.2,
    temperature: 42.8,
    power: 87.4,
    networkStrength: 95.2,
    agentsOnline: 12,
    threatsDetected: 3,
    scanProgress: 0
  });

  // Real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate dynamic metrics
      setMetrics(prev => ({
        cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.5) * 5)),
        memory: Math.max(20, Math.min(90, prev.memory + (Math.random() - 0.5) * 3)),
        temperature: Math.max(35, Math.min(75, prev.temperature + (Math.random() - 0.5) * 2)),
        power: Math.max(15, Math.min(100, prev.power + (Math.random() - 0.5) * 1)),
        networkStrength: Math.max(70, Math.min(100, prev.networkStrength + (Math.random() - 0.5) * 5)),
        agentsOnline: Math.max(8, Math.min(24, prev.agentsOnline + Math.floor((Math.random() - 0.5) * 3))),
        threatsDetected: Math.max(0, Math.min(15, prev.threatsDetected + Math.floor((Math.random() - 0.5) * 2))),
        scanProgress: (prev.scanProgress + 1) % 100
      }));

      // Dynamic threat level based on threats detected
      if (metrics.threatsDetected > 10) setThreatLevel('CRITICAL');
      else if (metrics.threatsDetected > 7) setThreatLevel('HIGH');
      else if (metrics.threatsDetected > 3) setThreatLevel('MEDIUM');
      else setThreatLevel('LOW');

      // Dynamic network status based on threat level and network strength
      if (threatLevel === 'CRITICAL' && Math.random() > 0.7) {
        setNetworkStatus('COMPROMISED');
      } else if (metrics.networkStrength < 80) {
        setNetworkStatus('SCANNING');
      } else {
        setNetworkStatus('SECURE');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [metrics.threatsDetected, threatLevel]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SECURE': case 'ACTIVE': case 'LOW': return 'operational';
      case 'SCANNING': case 'MEDIUM': return 'warning';
      case 'COMPROMISED': case 'ROGUE': case 'HIGH': case 'CRITICAL': return 'critical';
      default: return 'unknown';
    }
  };

  const getThreatBadgeVariant = (level: string) => {
    switch (level) {
      case 'LOW': return 'success';
      case 'MEDIUM': return 'warning';
      case 'HIGH': return 'priority_high';
      case 'CRITICAL': return 'priority_critical';
      default: return 'default';
    }
  };

  const formatTime = (date: Date) => {
    return {
      time: date.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      })
    };
  };

  const timeDisplay = formatTime(currentTime);

  return (
    <div className="bg-background-elevated border-b border-card-border">
      {/* Main Status Bar */}
      <div className="h-20 flex items-center justify-between px-6">
        <div className="flex items-center space-x-8">
          {/* ISAC Logo & System Status */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary animate-pulse-glow" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-success animate-pulse" />
            </div>
            <div>
              <span className="text-tactical text-xl font-bold tracking-wider">I.S.A.C</span>
              <div className="text-xs text-muted-foreground font-mono">
                INTEGRATED STRATEGIC AUTONOMOUS COMPUTER
              </div>
            </div>
          </div>

          {/* Agent Status */}
          <div className="flex items-center space-x-3">
            <StatusIndicator status={getStatusColor(agentStatus)} size="md" />
            <div>
              <span className="text-sm text-foreground font-mono font-semibold">
                AGENT {agentStatus}
              </span>
              <div className="text-xs text-muted-foreground">
                ID: DIV-001-ALPHA
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <span className="text-sm text-foreground font-mono font-semibold">
                {location}
              </span>
              <div className="text-xs text-muted-foreground">
                40.7589°N 73.9851°W
              </div>
            </div>
          </div>

          {/* Threat Level */}
          <div className="flex items-center space-x-3">
            <Target className="w-5 h-5 text-destructive" />
            <div>
              <Badge variant={getThreatBadgeVariant(threatLevel)} size="sm">
                THREAT {threatLevel}
              </Badge>
              <div className="text-xs text-muted-foreground mt-1">
                {metrics.threatsDetected} detected
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          {/* Network Status */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Wifi className="w-5 h-5 text-primary" />
              <Satellite className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <StatusIndicator status={getStatusColor(networkStatus)} size="sm" />
                <span className="text-sm text-foreground font-mono font-semibold">
                  {networkStatus}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {metrics.networkStrength.toFixed(1)}% strength
              </div>
            </div>
          </div>

          {/* System Metrics */}
          <div className="flex items-center space-x-6">
            {/* CPU */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Cpu className="w-4 h-4 text-info" />
                <span className="text-sm font-mono font-bold text-info">
                  {metrics.cpu.toFixed(1)}%
                </span>
              </div>
              <div className="text-xs text-muted-foreground">CPU</div>
            </div>

            {/* Memory */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <HardDrive className="w-4 h-4 text-warning" />
                <span className="text-sm font-mono font-bold text-warning">
                  {metrics.memory.toFixed(1)}%
                </span>
              </div>
              <div className="text-xs text-muted-foreground">MEM</div>
            </div>

            {/* Temperature */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Thermometer className="w-4 h-4 text-destructive" />
                <span className="text-sm font-mono font-bold text-destructive">
                  {metrics.temperature.toFixed(1)}°C
                </span>
              </div>
              <div className="text-xs text-muted-foreground">TEMP</div>
            </div>

            {/* Power */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Battery className="w-4 h-4 text-success" />
                <span className="text-sm font-mono font-bold text-success">
                  {metrics.power.toFixed(1)}%
                </span>
              </div>
              <div className="text-xs text-muted-foreground">PWR</div>
            </div>
          </div>

          {/* Agents Online */}
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <span className="text-sm font-mono font-bold text-primary">
                {metrics.agentsOnline}
              </span>
              <div className="text-xs text-muted-foreground">ONLINE</div>
            </div>
          </div>

          {/* Time Display */}
          <div className="text-right">
            <div className="text-primary text-xl font-mono font-bold tracking-wider">
              {timeDisplay.time}
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              {timeDisplay.date}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Status Bar */}
      <div className="h-8 bg-background-overlay border-t border-border/30 flex items-center justify-between px-6">
        <div className="flex items-center space-x-6 text-xs font-mono">
          <span className="text-muted-foreground">
            LAST SYNC: {new Date().toLocaleTimeString()}
          </span>
          <span className="text-muted-foreground">
            UPTIME: 72:14:33
          </span>
          <span className="text-muted-foreground">
            BUILD: ISAC-OS v2.47.1
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Scanning Progress */}
          {networkStatus === 'SCANNING' && (
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-info animate-pulse" />
              <div className="w-24 h-1 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-info transition-all duration-1000 animate-pulse"
                  style={{ width: `${metrics.scanProgress}%` }}
                />
              </div>
              <span className="text-xs text-info font-mono">
                {metrics.scanProgress}%
              </span>
            </div>
          )}
          
          {/* Connection Status */}
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-destructive'}`} />
            <span className="text-xs text-muted-foreground">
              {isConnected ? 'CONNECTED' : 'OFFLINE'}
            </span>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scan-line opacity-10" />
        <div className="absolute top-4 left-4 w-16 h-16 border border-primary/20 rounded-full animate-radar-sweep opacity-20" />
      </div>
    </div>
  );
}
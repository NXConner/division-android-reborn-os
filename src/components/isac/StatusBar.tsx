import { useState, useEffect } from 'react';
import { 
  Shield, 
  Activity, 
  Wifi, 
  Battery, 
  Signal, 
  AlertTriangle,
  MapPin
} from 'lucide-react';

export default function StatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [networkStatus, setNetworkStatus] = useState('SECURE');
  const [agentStatus, setAgentStatus] = useState('ACTIVE');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="status-panel h-16 flex items-center justify-between px-6 border-b border-card-border">
      <div className="flex items-center space-x-6">
        {/* ISAC Logo */}
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-primary animate-pulse-glow" />
          <span className="text-tactical text-lg font-bold tracking-wider">I.S.A.C</span>
        </div>

        {/* Agent Status */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
          <span className="text-sm text-muted-foreground">AGENT {agentStatus}</span>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground">MANHATTAN SECTOR</span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Network Status */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Wifi className="w-4 h-4 text-primary" />
            <Signal className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm text-foreground">{networkStatus}</span>
        </div>

        {/* System Status */}
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-success" />
          <span className="text-sm text-foreground">SYS OPTIMAL</span>
        </div>

        {/* Battery */}
        <div className="flex items-center space-x-2">
          <Battery className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground">87%</span>
        </div>

        {/* Time */}
        <div className="text-primary text-lg font-mono tracking-wider">
          {currentTime.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
}
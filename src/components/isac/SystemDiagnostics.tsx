import { useState, useEffect } from 'react';
import { 
  Cpu, 
  HardDrive, 
  Network, 
  Shield, 
  Zap, 
  Activity,
  AlertTriangle,
  CheckCircle2,
  Server
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface SystemMetric {
  name: string;
  value: number;
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL';
  unit: string;
  icon: React.ReactNode;
}

export default function SystemDiagnostics() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      name: 'CPU USAGE',
      value: 23,
      status: 'OPTIMAL',
      unit: '%',
      icon: <Cpu className="w-4 h-4" />
    },
    {
      name: 'MEMORY',
      value: 67,
      status: 'WARNING',
      unit: '%',
      icon: <HardDrive className="w-4 h-4" />
    },
    {
      name: 'NETWORK',
      value: 89,
      status: 'OPTIMAL',
      unit: '%',
      icon: <Network className="w-4 h-4" />
    },
    {
      name: 'SECURITY',
      value: 95,
      status: 'OPTIMAL',
      unit: '%',
      icon: <Shield className="w-4 h-4" />
    },
    {
      name: 'POWER',
      value: 34,
      status: 'CRITICAL',
      unit: '%',
      icon: <Zap className="w-4 h-4" />
    },
    {
      name: 'SHD TECH',
      value: 78,
      status: 'OPTIMAL',
      unit: '%',
      icon: <Activity className="w-4 h-4" />
    }
  ]);

  const [networkNodes] = useState([
    { id: 'BASE-OPS', status: 'ONLINE', latency: '12ms' },
    { id: 'SAFEHOUSE-A', status: 'ONLINE', latency: '8ms' },
    { id: 'SAFEHOUSE-B', status: 'OFFLINE', latency: 'N/A' },
    { id: 'DZ-CHECKPOINT', status: 'ONLINE', latency: '45ms' },
    { id: 'ISAC-CORE', status: 'ONLINE', latency: '3ms' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPTIMAL':
      case 'ONLINE':
        return 'text-success';
      case 'WARNING':
        return 'text-warning';
      case 'CRITICAL':
      case 'OFFLINE':
        return 'text-destructive';
      default:
        return 'text-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPTIMAL':
      case 'ONLINE':
        return <CheckCircle2 className="w-3 h-3" />;
      case 'WARNING':
        return <AlertTriangle className="w-3 h-3" />;
      case 'CRITICAL':
      case 'OFFLINE':
        return <AlertTriangle className="w-3 h-3" />;
      default:
        return <CheckCircle2 className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Metrics */}
      <div className="status-panel space-y-4">
        <h3 className="text-tactical text-lg font-bold tracking-wider">SYSTEM DIAGNOSTICS</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className={getStatusColor(metric.status)}>
                    {metric.icon}
                  </div>
                  <span className="text-muted-foreground">{metric.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-foreground font-mono">
                    {Math.round(metric.value)}{metric.unit}
                  </span>
                  <div className={getStatusColor(metric.status)}>
                    {getStatusIcon(metric.status)}
                  </div>
                </div>
              </div>
              <Progress 
                value={metric.value} 
                className={`h-1 ${
                  metric.status === 'CRITICAL' ? 'animate-pulse' : ''
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Network Status */}
      <div className="status-panel space-y-4">
        <h3 className="text-tactical text-lg font-bold tracking-wider">NETWORK STATUS</h3>
        
        <div className="space-y-2">
          {networkNodes.map((node) => (
            <div key={node.id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div className="flex items-center space-x-3">
                <Server className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono">{node.id}</span>
              </div>
              <div className="flex items-center space-x-4 text-xs">
                <span className="text-muted-foreground">{node.latency}</span>
                <div className={`flex items-center space-x-1 ${getStatusColor(node.status)}`}>
                  {getStatusIcon(node.status)}
                  <span className="font-bold">{node.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tactical Scan */}
      <div className="status-panel space-y-4">
        <h3 className="text-tactical text-lg font-bold tracking-wider">TACTICAL SCAN</h3>
        
        <div className="relative h-24 bg-muted rounded border border-border overflow-hidden">
          <div className="absolute inset-0 bg-tactical-grid opacity-30"></div>
          <div className="absolute top-1/2 left-0 w-1 h-full bg-primary animate-tactical-scan"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">SCANNING FOR THREATS...</span>
          </div>
        </div>
        
        <div className="text-xs text-success">
          SCAN COMPLETE - NO IMMEDIATE THREATS DETECTED
        </div>
      </div>
    </div>
  );
}
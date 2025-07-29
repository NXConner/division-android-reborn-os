import AgentPanel from '@/components/isac/AgentPanel';
import MissionBoard from '@/components/isac/MissionBoard';
import SystemDiagnostics from '@/components/isac/SystemDiagnostics';
import TacticalMap from '@/components/isac/TacticalMap';
import { HolographicPanel } from '@/components/ui/holographic-panel';
import { LiveMetric } from '@/components/ui/live-metric';
import { CommandInput } from '@/components/ui/command-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { 
  Shield, 
  Activity, 
  Zap, 
  AlertTriangle, 
  Target,
  Radio,
  Database,
  Eye
} from 'lucide-react';

export default function IsacOS() {
  const [systemCommand, setSystemCommand] = useState('');

  const handleCommand = (command: string) => {
    console.log('Command executed:', command);
    // Handle system commands here
  };

  return (
    <div className="space-y-6">
      {/* Quick Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <LiveMetric
          label="System Status"
          value={98.7}
          unit="%"
          status="good"
          threshold={{ good: 95, warning: 80 }}
          trend="stable"
        />
        <LiveMetric
          label="Network Integrity"
          value={94.2}
          unit="%"
          status="good"
          threshold={{ good: 90, warning: 70 }}
          trend="up"
        />
        <LiveMetric
          label="Active Threats"
          value={3}
          unit=""
          status="warning"
          threshold={{ good: 0, warning: 2 }}
          trend="down"
        />
        <LiveMetric
          label="Agents Online"
          value={12}
          unit=""
          status="good"
          threshold={{ good: 10, warning: 5 }}
          trend="stable"
        />
      </div>

      {/* Main Interface Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <AgentPanel />
          
          {/* Command Interface */}
          <HolographicPanel variant="stable">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-tactical font-bold tracking-wider text-tactical">
                  COMMAND INTERFACE
                </h3>
              </div>
              <CommandInput 
                onCommand={handleCommand}
                placeholder="Enter system command..."
              />
            </div>
          </HolographicPanel>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <MissionBoard />
          
          {/* Quick Actions */}
          <Card variant="tactical">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-warning" />
                <CardTitle>QUICK ACTIONS</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="tactical" className="h-12">
                  <Shield className="w-4 h-4 mr-2" />
                  BACKUP SYSTEMS
                </Button>
                <Button variant="destructive" className="h-12">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  EMERGENCY
                </Button>
                <Button variant="outline" className="h-12">
                  <Database className="w-4 h-4 mr-2" />
                  DATA SYNC
                </Button>
                <Button variant="outline" className="h-12">
                  <Eye className="w-4 h-4 mr-2" />
                  SCAN ZONES
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Bottom Row - Full Width */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TacticalMap />
        <SystemDiagnostics />
      </div>

      {/* System Alerts */}
      <HolographicPanel variant="ghost" className="border-warning/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-warning animate-pulse" />
            <div>
              <h4 className="font-tactical font-bold text-warning">SYSTEM ALERT</h4>
              <p className="text-sm text-muted-foreground">Elevated threat activity detected in Dark Zone sectors</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="warning" size="sm">MEDIUM PRIORITY</Badge>
            <Button variant="outline" size="sm">
              INVESTIGATE
            </Button>
          </div>
        </div>
      </HolographicPanel>
    </div>
  );
}
import { Shield, Heart, Zap, Target, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AgentData {
  callsign: string;
  level: number;
  health: number;
  armor: number;
  status: 'ACTIVE' | 'ROGUE' | 'KIA' | 'MIA';
  location: string;
  lastSeen: string;
}

const agents: AgentData[] = [
  {
    callsign: "PHOENIX-01",
    level: 30,
    health: 95,
    armor: 78,
    status: "ACTIVE",
    location: "Dark Zone East",
    lastSeen: "2m ago"
  },
  {
    callsign: "SHADOW-07",
    level: 28,
    health: 0,
    armor: 0,
    status: "ROGUE",
    location: "Contaminated Zone",
    lastSeen: "15m ago"
  },
  {
    callsign: "ECHO-12",
    level: 32,
    health: 100,
    armor: 95,
    status: "ACTIVE",
    location: "Safe House Bravo",
    lastSeen: "1m ago"
  }
];

export default function AgentPanel() {
  const getStatusColor = (status: AgentData['status']) => {
    switch (status) {
      case 'ACTIVE': return 'text-success';
      case 'ROGUE': return 'text-destructive';
      case 'KIA': return 'text-muted-foreground';
      case 'MIA': return 'text-warning';
      default: return 'text-foreground';
    }
  };

  const getStatusIcon = (status: AgentData['status']) => {
    switch (status) {
      case 'ACTIVE': return <Shield className="w-4 h-4" />;
      case 'ROGUE': return <AlertTriangle className="w-4 h-4" />;
      case 'KIA': return <Target className="w-4 h-4" />;
      case 'MIA': return <Zap className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="status-panel space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-tactical text-lg font-bold tracking-wider">DIVISION AGENTS</h3>
        <div className="text-sm text-muted-foreground">
          {agents.filter(a => a.status === 'ACTIVE').length} ACTIVE
        </div>
      </div>

      <div className="space-y-3">
        {agents.map((agent, index) => (
          <div key={agent.callsign} className="agent-status p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`${getStatusColor(agent.status)}`}>
                  {getStatusIcon(agent.status)}
                </div>
                <div>
                  <div className="font-mono text-sm font-bold">{agent.callsign}</div>
                  <div className="text-xs text-muted-foreground">LVL {agent.level}</div>
                </div>
              </div>
              <div className={`text-sm font-bold ${getStatusColor(agent.status)}`}>
                {agent.status}
              </div>
            </div>

            {agent.status === 'ACTIVE' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-3 h-3 text-destructive" />
                    <span>HEALTH</span>
                  </span>
                  <span>{agent.health}%</span>
                </div>
                <Progress value={agent.health} className="h-1" />

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center space-x-1">
                    <Shield className="w-3 h-3 text-primary" />
                    <span>ARMOR</span>
                  </span>
                  <span>{agent.armor}%</span>
                </div>
                <Progress value={agent.armor} className="h-1" />
              </div>
            )}

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{agent.location}</span>
              <span>{agent.lastSeen}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Disavowed Section */}
      <div className="border-t border-destructive/30 pt-4 mt-6">
        <div className="flex items-center space-x-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-destructive animate-status-blink" />
          <h4 className="text-destructive text-sm font-bold tracking-wider">DISAVOWED AGENTS</h4>
        </div>
        <div className="text-xs text-muted-foreground">
          1 ROGUE AGENT DETECTED IN CONTAMINATED ZONE
        </div>
        <div className="text-xs text-destructive mt-1">
          ELIMINATION AUTHORIZED
        </div>
      </div>
    </div>
  );
}
import { Target, Clock, Users, AlertCircle, CheckCircle2, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Mission {
  id: string;
  title: string;
  type: 'MAIN' | 'SIDE' | 'DAILY' | 'CLASSIFIED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'AVAILABLE' | 'ACTIVE' | 'COMPLETED' | 'FAILED';
  location: string;
  timeEstimate: string;
  rewards: string[];
  description: string;
  requiredLevel: number;
}

const missions: Mission[] = [
  {
    id: "MAIN-001",
    title: "Secure Base of Operations",
    type: "MAIN",
    priority: "CRITICAL",
    status: "ACTIVE",
    location: "Manhattan - Base of Operations",
    timeEstimate: "45m",
    rewards: ["EXP: 2500", "Credits: 15000", "Gear: Superior"],
    description: "Establish and secure primary base of operations. Eliminate hostile contacts.",
    requiredLevel: 8
  },
  {
    id: "SIDE-047",
    title: "Supply Drop Recovery",
    type: "SIDE",
    priority: "MEDIUM",
    status: "AVAILABLE",
    location: "Times Square",
    timeEstimate: "20m",
    rewards: ["EXP: 1200", "Credits: 8000"],
    description: "Locate and secure supply drops in contaminated area.",
    requiredLevel: 15
  },
  {
    id: "DAILY-033",
    title: "Rogue Agent Elimination",
    type: "DAILY",
    priority: "HIGH",
    status: "AVAILABLE",
    location: "Dark Zone Echo",
    timeEstimate: "30m",
    rewards: ["EXP: 5000", "Phoenix Credits: 500"],
    description: "Eliminate rogue Division agent operating in Dark Zone.",
    requiredLevel: 25
  },
  {
    id: "CLASS-012",
    title: "[REDACTED]",
    type: "CLASSIFIED",
    priority: "CRITICAL",
    status: "AVAILABLE",
    location: "[CLASSIFIED]",
    timeEstimate: "Unknown",
    rewards: ["[CLASSIFIED]"],
    description: "Classification Level: BLACK. Authorized personnel only.",
    requiredLevel: 30
  }
];

export default function MissionBoard() {
  const getPriorityColor = (priority: Mission['priority']) => {
    switch (priority) {
      case 'LOW': return 'text-muted-foreground';
      case 'MEDIUM': return 'text-warning';
      case 'HIGH': return 'text-primary';
      case 'CRITICAL': return 'text-destructive';
      default: return 'text-foreground';
    }
  };

  const getStatusIcon = (status: Mission['status']) => {
    switch (status) {
      case 'AVAILABLE': return <Target className="w-4 h-4" />;
      case 'ACTIVE': return <Clock className="w-4 h-4 animate-pulse" />;
      case 'COMPLETED': return <CheckCircle2 className="w-4 h-4" />;
      case 'FAILED': return <AlertCircle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getTypeVariant = (type: Mission['type']) => {
    switch (type) {
      case 'MAIN': return 'default';
      case 'SIDE': return 'secondary';
      case 'DAILY': return 'outline';
      case 'CLASSIFIED': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="status-panel space-y-4 shd-hex-border shd-radial-glow">
      <div className="flex items-center justify-between">
        <h3 className="text-tactical text-lg font-bold tracking-wider">MISSION BOARD</h3>
        <div className="text-sm text-muted-foreground">
          {missions.filter(m => m.status === 'AVAILABLE').length} AVAILABLE
        </div>
      </div>

      <div className="space-y-3">
        {missions.map((mission) => (
          <div 
            key={mission.id} 
            className={`tactical-border p-4 space-y-3 transition-all duration-300 hover:shadow-tactical cursor-pointer shd-corner-brackets ${
              mission.status === 'ACTIVE' ? 'ring-1 ring-primary' : ''
            } ${mission.type === 'CLASSIFIED' ? 'bg-destructive/5' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <div className={`${getPriorityColor(mission.priority)}`}>
                  {getStatusIcon(mission.status)}
                </div>
                <div>
                  <div className="font-mono text-sm font-bold">
                    {mission.type === 'CLASSIFIED' ? mission.title : mission.title.toUpperCase()}
                  </div>
                  <div className="text-xs text-muted-foreground">ID: {mission.id}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={getTypeVariant(mission.type)} className="text-xs">
                  {mission.type}
                </Badge>
                <div className={`text-xs font-bold ${getPriorityColor(mission.priority)}`}>
                  {mission.priority}
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground leading-relaxed">
              {mission.description}
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span className="text-muted-foreground">Location:</span>
                </div>
                <div className="text-foreground ml-4">{mission.location}</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span className="text-muted-foreground">Est. Time:</span>
                </div>
                <div className="text-foreground ml-4">{mission.timeEstimate}</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Rewards:</div>
              <div className="flex flex-wrap gap-1">
                {mission.rewards.map((reward, index) => (
                  <span key={index} className="text-xs bg-muted px-2 py-1 rounded text-foreground">
                    {reward}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-border">
              <div className="text-xs text-muted-foreground">
                Req. Level: {mission.requiredLevel}
              </div>
              <div className={`text-xs font-bold ${
                mission.status === 'AVAILABLE' ? 'text-success' :
                mission.status === 'ACTIVE' ? 'text-primary' :
                mission.status === 'COMPLETED' ? 'text-muted-foreground' :
                'text-destructive'
              }`}>
                {mission.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
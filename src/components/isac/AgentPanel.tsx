import { useState, useEffect } from 'react';
import { 
  Shield, 
  Heart, 
  Zap, 
  Target, 
  AlertTriangle, 
  Users, 
  Crosshair,
  Wrench,
  Brain,
  Eye,
  Radio,
  MapPin,
  Clock,
  TrendingUp,
  Activity,
  Briefcase,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { HolographicPanel } from '@/components/ui/holographic-panel';
import { LiveMetric } from '@/components/ui/live-metric';
import { TacticalSwitch } from '@/components/ui/tactical-switch';

interface SkillTree {
  medical: number;
  tech: number;
  security: number;
}

interface Equipment {
  primaryWeapon: string;
  secondaryWeapon: string;
  specialGear: string;
  armor: string;
}

interface AgentStats {
  dps: number;
  toughness: number;
  skillPower: number;
  accuracy: number;
  criticalHit: number;
  armor: number;
}

interface AgentData {
  id: string;
  callsign: string;
  level: number;
  health: number;
  armor: number;
  status: 'ACTIVE' | 'ROGUE' | 'KIA' | 'MIA' | 'OFFLINE';
  location: string;
  lastSeen: string;
  avatar?: string;
  skillTree: SkillTree;
  equipment: Equipment;
  stats: AgentStats;
  isWatched: boolean;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  lastMission: string;
  extractions: number;
  eliminations: number;
  distance: number; // km from base
}

const mockAgents: AgentData[] = [
  {
    id: "001",
    callsign: "PHOENIX-01",
    level: 30,
    health: 95,
    armor: 78,
    status: "ACTIVE",
    location: "Dark Zone East - DZ02",
    lastSeen: "2m ago",
    skillTree: { medical: 85, tech: 70, security: 90 },
    equipment: {
      primaryWeapon: "LVOA-C Assault Rifle",
      secondaryWeapon: "M1911 Pistol",
      specialGear: "First Aid Station",
      armor: "Tactical Vest Mk.3"
    },
    stats: {
      dps: 285000,
      toughness: 340000,
      skillPower: 45000,
      accuracy: 78,
      criticalHit: 24,
      armor: 55
    },
    isWatched: true,
    threatLevel: "LOW",
    lastMission: "Supply Drop Extraction",
    extractions: 47,
    eliminations: 156,
    distance: 2.3
  },
  {
    id: "002",
    callsign: "SHADOW-07",
    level: 28,
    health: 0,
    armor: 0,
    status: "ROGUE",
    location: "Contaminated Zone Alpha",
    lastSeen: "15m ago",
    skillTree: { medical: 45, tech: 95, security: 60 },
    equipment: {
      primaryWeapon: "Vector SMG",
      secondaryWeapon: "Sawed-off Shotgun",
      specialGear: "Turret",
      armor: "Combat Armor"
    },
    stats: {
      dps: 350000,
      toughness: 180000,
      skillPower: 75000,
      accuracy: 85,
      criticalHit: 32,
      armor: 35
    },
    isWatched: true,
    threatLevel: "CRITICAL",
    lastMission: "Gone Rogue",
    extractions: 23,
    eliminations: 89,
    distance: 5.7
  },
  {
    id: "003",
    callsign: "ECHO-12",
    level: 32,
    health: 100,
    armor: 95,
    status: "ACTIVE",
    location: "Safe House Bravo",
    lastSeen: "1m ago",
    skillTree: { medical: 95, tech: 80, security: 75 },
    equipment: {
      primaryWeapon: "AK-74 Assault Rifle",
      secondaryWeapon: "M45A1 Pistol",
      specialGear: "Support Station",
      armor: "Ballistic Shield"
    },
    stats: {
      dps: 295000,
      toughness: 420000,
      skillPower: 38000,
      accuracy: 74,
      criticalHit: 18,
      armor: 62
    },
    isWatched: false,
    threatLevel: "LOW",
    lastMission: "Base Defense",
    extractions: 72,
    eliminations: 203,
    distance: 0.1
  }
];

export default function AgentPanel() {
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'details' | 'stats'>('list');
  const [autoTrack, setAutoTrack] = useState(true);
  const [agents, setAgents] = useState<AgentData[]>(mockAgents);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        health: agent.status === 'ACTIVE' ? Math.max(70, Math.min(100, agent.health + (Math.random() - 0.5) * 5)) : agent.health,
        armor: agent.status === 'ACTIVE' ? Math.max(50, Math.min(100, agent.armor + (Math.random() - 0.5) * 3)) : agent.armor,
        distance: agent.status === 'ACTIVE' ? Math.max(0.1, agent.distance + (Math.random() - 0.5) * 0.5) : agent.distance
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: AgentData['status']) => {
    switch (status) {
      case 'ACTIVE': return 'operational';
      case 'ROGUE': return 'critical';
      case 'KIA': return 'offline';
      case 'MIA': return 'warning';
      case 'OFFLINE': return 'offline';
      default: return 'unknown';
    }
  };

  const getStatusBadgeVariant = (status: AgentData['status']) => {
    switch (status) {
      case 'ACTIVE': return 'agent_active';
      case 'ROGUE': return 'agent_rogue';
      case 'KIA': return 'agent_kia';
      case 'MIA': return 'agent_mia';
      case 'OFFLINE': return 'secondary';
      default: return 'default';
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

  const activeAgents = agents.filter(a => a.status === 'ACTIVE');
  const rogueAgents = agents.filter(a => a.status === 'ROGUE');
  const totalAgents = agents.length;

  if (viewMode === 'details' && selectedAgent) {
    return (
      <HolographicPanel variant="stable" className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {setViewMode('list'); setSelectedAgent(null);}}
          >
            ← Back to List
          </Button>
          <div className="flex items-center gap-2">
            <StatusIndicator status={getStatusColor(selectedAgent.status)} size="sm" />
            <Badge variant={getStatusBadgeVariant(selectedAgent.status)} size="sm">
              {selectedAgent.status}
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          {/* Agent Header */}
          <div className="text-center">
            <h3 className="text-tactical text-xl font-bold tracking-wider">
              {selectedAgent.callsign}
            </h3>
            <p className="text-muted-foreground font-mono text-sm">
              Level {selectedAgent.level} Division Agent • ID: {selectedAgent.id}
            </p>
          </div>

          {/* Vital Stats */}
          <div className="grid grid-cols-2 gap-4">
            <LiveMetric
              label="Health"
              value={selectedAgent.health}
              unit="%"
              status={selectedAgent.health > 80 ? 'good' : selectedAgent.health > 50 ? 'warning' : 'critical'}
              threshold={{ good: 80, warning: 50 }}
            />
            <LiveMetric
              label="Armor"
              value={selectedAgent.armor}
              unit="%"
              status={selectedAgent.armor > 70 ? 'good' : selectedAgent.armor > 40 ? 'warning' : 'critical'}
              threshold={{ good: 70, warning: 40 }}
            />
          </div>

          {/* Skills */}
          <Card variant="tactical">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">SKILL TREE</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-destructive" />
                    Medical
                  </span>
                  <span>{selectedAgent.skillTree.medical}%</span>
                </div>
                <Progress value={selectedAgent.skillTree.medical} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <Wrench className="w-3 h-3 text-warning" />
                    Tech
                  </span>
                  <span>{selectedAgent.skillTree.tech}%</span>
                </div>
                <Progress value={selectedAgent.skillTree.tech} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-success" />
                    Security
                  </span>
                  <span>{selectedAgent.skillTree.security}%</span>
                </div>
                <Progress value={selectedAgent.skillTree.security} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Equipment */}
          <Card variant="tactical">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">EQUIPMENT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary:</span>
                <span>{selectedAgent.equipment.primaryWeapon}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Secondary:</span>
                <span>{selectedAgent.equipment.secondaryWeapon}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Special:</span>
                <span>{selectedAgent.equipment.specialGear}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Armor:</span>
                <span>{selectedAgent.equipment.armor}</span>
              </div>
            </CardContent>
          </Card>

          {/* Combat Stats */}
          <Card variant="tactical">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">COMBAT STATISTICS</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-lg font-mono font-bold text-destructive">
                  {(selectedAgent.stats.dps / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-muted-foreground">DPS</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-mono font-bold text-success">
                  {(selectedAgent.stats.toughness / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-muted-foreground">TOUGHNESS</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-mono font-bold text-warning">
                  {(selectedAgent.stats.skillPower / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-muted-foreground">SKILL PWR</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-mono font-bold text-info">
                  {selectedAgent.stats.accuracy}%
                </div>
                <div className="text-xs text-muted-foreground">ACCURACY</div>
              </div>
            </CardContent>
          </Card>

          {/* Mission Data */}
          <Card variant="tactical">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">MISSION DATA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Mission:</span>
                <span>{selectedAgent.lastMission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Extractions:</span>
                <span className="text-success">{selectedAgent.extractions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Eliminations:</span>
                <span className="text-destructive">{selectedAgent.eliminations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distance:</span>
                <span>{selectedAgent.distance.toFixed(1)} km</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </HolographicPanel>
    );
  }

  return (
    <div className="space-y-4">
      <Card variant="tactical" className="shd-hex-border shd-radial-glow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">DIVISION AGENTS</CardTitle>
            </div>
            <div className="flex items-center gap-4">
              <TacticalSwitch
                checked={autoTrack}
                onCheckedChange={setAutoTrack}
                label="Auto Track"
                size="sm"
              />
              <div className="text-sm text-muted-foreground font-mono">
                {activeAgents.length}/{totalAgents} ACTIVE
              </div>
            </div>
          </div>

          {/* Agent Summary */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <div className="text-lg font-mono font-bold text-success">
                {activeAgents.length}
              </div>
              <div className="text-xs text-muted-foreground">ACTIVE</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-mono font-bold text-destructive">
                {rogueAgents.length}
              </div>
              <div className="text-xs text-muted-foreground">ROGUE</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-mono font-bold text-primary">
                {agents.filter(a => a.isWatched).length}
              </div>
              <div className="text-xs text-muted-foreground">WATCHED</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-mono font-bold text-warning">
                {agents.filter(a => a.threatLevel === 'HIGH' || a.threatLevel === 'CRITICAL').length}
              </div>
              <div className="text-xs text-muted-foreground">THREATS</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {agents.map((agent) => (
            <div key={agent.id} className="tactical-panel p-3 space-y-3 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                 onClick={() => {setSelectedAgent(agent); setViewMode('details');}}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <StatusIndicator status={getStatusColor(agent.status)} size="md" />
                  <div>
                    <div className="font-mono text-sm font-bold">{agent.callsign}</div>
                    <div className="text-xs text-muted-foreground">LVL {agent.level} • {agent.distance.toFixed(1)}km</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getThreatBadgeVariant(agent.threatLevel)} size="sm">
                    {agent.threatLevel}
                  </Badge>
                  <Badge variant={getStatusBadgeVariant(agent.status)} size="sm">
                    {agent.status}
                  </Badge>
                </div>
              </div>

              {agent.status === 'ACTIVE' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-destructive" />
                        <span>Health</span>
                      </span>
                      <span>{agent.health}%</span>
                    </div>
                    <Progress value={agent.health} className="h-1.5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center space-x-1">
                        <Shield className="w-3 h-3 text-primary" />
                        <span>Armor</span>
                      </span>
                      <span>{agent.armor}%</span>
                    </div>
                    <Progress value={agent.armor} className="h-1.5" />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{agent.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{agent.lastSeen}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Rogue Agent Alert */}
          {rogueAgents.length > 0 && (
            <div className="border-t border-destructive/30 pt-4 mt-6">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-destructive animate-status-blink" />
                <h4 className="text-destructive text-sm font-bold tracking-wider">ROGUE AGENTS DETECTED</h4>
              </div>
              <div className="text-xs text-muted-foreground">
                {rogueAgents.length} ROGUE AGENT{rogueAgents.length > 1 ? 'S' : ''} OPERATING IN HOSTILE TERRITORY
              </div>
              <div className="text-xs text-destructive mt-1 font-mono">
                ⚠ ELIMINATION PROTOCOL AUTHORIZED ⚠
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <HolographicPanel variant="stable" className="shd-corner-brackets">
        {viewMode === 'details' && selectedAgent ? (
          <HolographicPanel variant="stable" className="space-y-6">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {setViewMode('list'); setSelectedAgent(null);}}
              >
                ← Back to List
              </Button>
              <div className="flex items-center gap-2">
                <StatusIndicator status={getStatusColor(selectedAgent.status)} size="sm" />
                <Badge variant={getStatusBadgeVariant(selectedAgent.status)} size="sm">
                  {selectedAgent.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              {/* Agent Header */}
              <div className="text-center">
                <h3 className="text-tactical text-xl font-bold tracking-wider">
                  {selectedAgent.callsign}
                </h3>
                <p className="text-muted-foreground font-mono text-sm">
                  Level {selectedAgent.level} Division Agent • ID: {selectedAgent.id}
                </p>
              </div>

              {/* Vital Stats */}
              <div className="grid grid-cols-2 gap-4">
                <LiveMetric
                  label="Health"
                  value={selectedAgent.health}
                  unit="%"
                  status={selectedAgent.health > 80 ? 'good' : selectedAgent.health > 50 ? 'warning' : 'critical'}
                  threshold={{ good: 80, warning: 50 }}
                />
                <LiveMetric
                  label="Armor"
                  value={selectedAgent.armor}
                  unit="%"
                  status={selectedAgent.armor > 70 ? 'good' : selectedAgent.armor > 40 ? 'warning' : 'critical'}
                  threshold={{ good: 70, warning: 40 }}
                />
              </div>

              {/* Skills */}
              <Card variant="tactical">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">SKILL TREE</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-destructive" />
                        Medical
                      </span>
                      <span>{selectedAgent.skillTree.medical}%</span>
                    </div>
                    <Progress value={selectedAgent.skillTree.medical} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <Wrench className="w-3 h-3 text-warning" />
                        Tech
                      </span>
                      <span>{selectedAgent.skillTree.tech}%</span>
                    </div>
                    <Progress value={selectedAgent.skillTree.tech} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-success" />
                        Security
                      </span>
                      <span>{selectedAgent.skillTree.security}%</span>
                    </div>
                    <Progress value={selectedAgent.skillTree.security} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Equipment */}
              <Card variant="tactical">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">EQUIPMENT</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Primary:</span>
                    <span>{selectedAgent.equipment.primaryWeapon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Secondary:</span>
                    <span>{selectedAgent.equipment.secondaryWeapon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Special:</span>
                    <span>{selectedAgent.equipment.specialGear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Armor:</span>
                    <span>{selectedAgent.equipment.armor}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Combat Stats */}
              <Card variant="tactical">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">COMBAT STATISTICS</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-lg font-mono font-bold text-destructive">
                      {(selectedAgent.stats.dps / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-muted-foreground">DPS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-mono font-bold text-success">
                      {(selectedAgent.stats.toughness / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-muted-foreground">TOUGHNESS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-mono font-bold text-warning">
                      {(selectedAgent.stats.skillPower / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-muted-foreground">SKILL PWR</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-mono font-bold text-info">
                      {selectedAgent.stats.accuracy}%
                    </div>
                    <div className="text-xs text-muted-foreground">ACCURACY</div>
                  </div>
                </CardContent>
              </Card>

              {/* Mission Data */}
              <Card variant="tactical">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">MISSION DATA</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Mission:</span>
                    <span>{selectedAgent.lastMission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Extractions:</span>
                    <span className="text-success">{selectedAgent.extractions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Eliminations:</span>
                    <span className="text-destructive">{selectedAgent.eliminations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance:</span>
                    <span>{selectedAgent.distance.toFixed(1)} km</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </HolographicPanel>
        ) : (
          <HolographicPanel variant="stable" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">DIVISION AGENTS</CardTitle>
              </div>
              <div className="flex items-center gap-4">
                <TacticalSwitch
                  checked={autoTrack}
                  onCheckedChange={setAutoTrack}
                  label="Auto Track"
                  size="sm"
                />
                <div className="text-sm text-muted-foreground font-mono">
                  {activeAgents.length}/{totalAgents} ACTIVE
                </div>
              </div>
            </div>

            {/* Agent Summary */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="text-lg font-mono font-bold text-success">
                  {activeAgents.length}
                </div>
                <div className="text-xs text-muted-foreground">ACTIVE</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-mono font-bold text-destructive">
                  {rogueAgents.length}
                </div>
                <div className="text-xs text-muted-foreground">ROGUE</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-mono font-bold text-primary">
                  {agents.filter(a => a.isWatched).length}
                </div>
                <div className="text-xs text-muted-foreground">WATCHED</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-mono font-bold text-warning">
                  {agents.filter(a => a.threatLevel === 'HIGH' || a.threatLevel === 'CRITICAL').length}
                </div>
                <div className="text-xs text-muted-foreground">THREATS</div>
              </div>
            </div>

            <CardContent className="space-y-3">
              {agents.map((agent) => (
                <div key={agent.id} className="tactical-panel p-3 space-y-3 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                     onClick={() => {setSelectedAgent(agent); setViewMode('details');}}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <StatusIndicator status={getStatusColor(agent.status)} size="md" />
                      <div>
                        <div className="font-mono text-sm font-bold">{agent.callsign}</div>
                        <div className="text-xs text-muted-foreground">LVL {agent.level} • {agent.distance.toFixed(1)}km</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getThreatBadgeVariant(agent.threatLevel)} size="sm">
                        {agent.threatLevel}
                      </Badge>
                      <Badge variant={getStatusBadgeVariant(agent.status)} size="sm">
                        {agent.status}
                      </Badge>
                    </div>
                  </div>

                  {agent.status === 'ACTIVE' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center space-x-1">
                            <Heart className="w-3 h-3 text-destructive" />
                            <span>Health</span>
                          </span>
                          <span>{agent.health}%</span>
                        </div>
                        <Progress value={agent.health} className="h-1.5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center space-x-1">
                            <Shield className="w-3 h-3 text-primary" />
                            <span>Armor</span>
                          </span>
                          <span>{agent.armor}%</span>
                        </div>
                        <Progress value={agent.armor} className="h-1.5" />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{agent.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{agent.lastSeen}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Rogue Agent Alert */}
              {rogueAgents.length > 0 && (
                <div className="border-t border-destructive/30 pt-4 mt-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-destructive animate-status-blink" />
                    <h4 className="text-destructive text-sm font-bold tracking-wider">ROGUE AGENTS DETECTED</h4>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {rogueAgents.length} ROGUE AGENT{rogueAgents.length > 1 ? 'S' : ''} OPERATING IN HOSTILE TERRITORY
                  </div>
                  <div className="text-xs text-destructive mt-1 font-mono">
                    ⚠ ELIMINATION PROTOCOL AUTHORIZED ⚠
                  </div>
                </div>
              )}
            </CardContent>
          </HolographicPanel>
        )}
      </HolographicPanel>
    </div>
  );
}
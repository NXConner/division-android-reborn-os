import StatusBar from '@/components/isac/StatusBar';
import AgentPanel from '@/components/isac/AgentPanel';
import MissionBoard from '@/components/isac/MissionBoard';
import SystemDiagnostics from '@/components/isac/SystemDiagnostics';
import TacticalMap from '@/components/isac/TacticalMap';

export default function IsacOS() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Status Bar */}
      <StatusBar />
      
      {/* Main Interface Grid */}
      <div className="flex-1 p-6 space-y-6">
        {/* Top Row - Mission Board and Agent Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <MissionBoard />
          </div>
          <div className="space-y-6">
            <AgentPanel />
          </div>
        </div>
        
        {/* Bottom Row - Tactical Map and System Diagnostics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TacticalMap />
          <SystemDiagnostics />
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Tactical Grid Overlay */}
        <div className="absolute inset-0 bg-tactical-grid opacity-5"></div>
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/30"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/30"></div>
        
        {/* Scanning Lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-tactical-scan"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-tactical-scan" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}
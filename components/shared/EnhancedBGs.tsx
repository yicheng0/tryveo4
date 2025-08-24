export function GridBG({ size = "md", className = "" }: { size?: "sm" | "md" | "lg", className?: string }) {
  const sizeClass = {
    sm: "grid-bg-sm",
    md: "grid-bg", 
    lg: "grid-bg-lg"
  }[size];
  
  return (
    <div className={`fixed inset-0 z-[-2] ${sizeClass} ${className}`} />
  );
}

export function GlassBG({ className = "" }: { className?: string }) {
  return (
    <div className={`glass-bg ${className}`} />
  );
}

export function RaphaelBG() {
  return (
    <>
      {/* Raphael.app style deep coffee background with radial glow */}
      <div className="fixed inset-0 z-[-3] h-full w-full" style={{background: '#1c120b'}}>
        {/* Central warm glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(139,92,246,0.15),rgba(168,85,247,0.08)_40%,transparent_70%)]"></div>
        
        {/* Multiple layered glows for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_1200px_at_30%_20%,rgba(245,158,11,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_1000px_at_70%_80%,rgba(168,85,247,0.04),transparent_50%)]"></div>
        
        {/* Subtle warm base glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_1400px_800px_at_50%_100%,rgba(217,119,6,0.03),transparent)]"></div>
      </div>
      
      {/* Very subtle grid for texture */}
      <GridBG size="sm" className="opacity-20" />
    </>
  );
}

export function ModernBG1() {
  return <RaphaelBG />;
}

export function VeoRaphaelBG() {
  return (
    <>
      {/* Veo pages with Raphael style background */}
      <div className="fixed inset-0 z-[-3] h-full w-full" style={{background: '#1c120b'}}>
        {/* Primary tech glow for Veo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_900px_at_50%_30%,rgba(139,92,246,0.18),rgba(168,85,247,0.1)_45%,transparent_75%)]"></div>
        
        {/* AI-themed accent glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_1100px_at_20%_70%,rgba(6,182,212,0.06),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_80%_20%,rgba(168,85,247,0.08),transparent_50%)]"></div>
        
        {/* Warm base for balance */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_1600px_900px_at_50%_100%,rgba(217,119,6,0.02),transparent)]"></div>
      </div>
      
      {/* Tech grid overlay */}
      <GridBG size="sm" className="opacity-25" />
    </>
  );
}

export function VeoBG() {
  return <VeoRaphaelBG />;
}
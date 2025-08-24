export function BG1() {
  return (
    <div className="fixed inset-0 z-[-1] h-full w-full" style={{background: '#1c120b'}}>
      {/* Raphael.app style coffee background with subtle glow */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_700px_at_50%_200px,rgba(139,92,246,0.12),rgba(245,158,11,0.04)_60%,transparent)]"></div>
      {/* Accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_1000px_at_30%_80%,rgba(217,119,6,0.03),transparent_70%)]"></div>
    </div>
  );
}

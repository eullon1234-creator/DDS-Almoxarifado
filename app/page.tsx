import DDSGenerator from '@/components/DDSGenerator';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-cyber-black selection:bg-cyber-cyan selection:text-cyber-black">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyber-cyan/10 blur-3xl rounded-full animate-pulse-slow"></div>
          <h1
            className="text-5xl md:text-6xl font-black text-cyber-cyan mb-2 tracking-tighter cyber-glitch-text"
            data-text="DDS ALMOXARIFADO"
          >
            DDS ALMOXARIFADO
          </h1>
          <div className="h-1 w-24 bg-cyber-cyan mx-auto mb-4 shadow-neon-cyan"></div>
          <p className="text-cyber-blue font-mono uppercase tracking-[0.2em] text-sm md:text-base animate-flicker">
            Sistema de Diálogo Diário de Segurança
          </p>
        </header>

        <DDSGenerator />

        <footer className="mt-16 text-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent mb-4"></div>
          <p className="text-cyber-blue/60 font-mono text-xs uppercase tracking-widest">
            Projeto Eullon <span className="text-cyber-pink">●</span> Segurança em Primeiro Lugar
          </p>
          <p className="text-cyber-cyan/30 text-[10px] mt-2 font-mono">
            EST. 2026 // PROTOCOLO-DDS-99
          </p>
        </footer>
      </div>
    </main>
  );
}

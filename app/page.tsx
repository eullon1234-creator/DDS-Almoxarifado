import DDSGenerator from '@/components/DDSGenerator';

export default function Home() {
  return (
    <main className="min-h-screen p-8 text-cyber-text">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 tracking-wide text-cyber-text drop-shadow-[0_0_18px_rgba(255,42,212,0.25)]">
            DDS Almoxarifado
          </h1>
          <p className="text-cyber-muted">
            Sistema de Diálogo Diário de Segurança
          </p>
        </header>
        
        <DDSGenerator />
        
        <footer className="mt-12 text-center text-cyber-muted text-sm">
          <p>Projeto Eullon - Segurança em Primeiro Lugar</p>
        </footer>
      </div>
    </main>
  );
}

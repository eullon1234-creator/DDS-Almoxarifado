import DDSGenerator from '@/components/DDSGenerator';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">DDS Almoxarifado</h1>
          <p className="text-gray-600">Sistema de Diálogo Diário de Segurança</p>
        </header>
        
        <DDSGenerator />
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Projeto Eullon - Segurança em Primeiro Lugar</p>
        </footer>
      </div>
    </main>
  );
}

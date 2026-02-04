"use client";

import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import { FileDown, RefreshCw, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Mock data for DDS themes relevant to Warehouse/Almoxarifado
const MOCK_THEMES = [
  {
    id: 1,
    title: "Uso Correto de EPIs no Almoxarifado",
    content: "O uso de Equipamentos de Proteção Individual (EPIs) é vital. No almoxarifado, capacetes protegem contra quedas de objetos, luvas evitam cortes ao manusear caixas e botas de segurança previnem lesões nos pés. Lembre-se: o EPI só funciona se usado corretamente e durante todo o tempo de exposição ao risco.",
    summary: "Use capacete, luvas e botas sempre. Eles protegem sua vida."
  },
  {
    id: 2,
    title: "Levantamento e Transporte Manual de Cargas",
    content: "Ao levantar caixas, dobre os joelhos e mantenha a coluna reta. Não gire o tronco enquanto segura peso. Peça ajuda para cargas acima do limite seguro. O transporte manual incorreto é a principal causa de dores nas costas e afastamentos.",
    summary: "Dobre os joelhos, coluna reta, peça ajuda para pesos excessivos."
  },
  {
    id: 3,
    title: "Organização e Limpeza (5S)",
    content: "Um almoxarifado organizado evita acidentes. Mantenha os corredores livres de obstáculos. Não deixe caixas mal empilhadas. O programa 5S ajuda a manter o ambiente seguro e eficiente. Descarte o que não serve e mantenha tudo em seu lugar.",
    summary: "Corredores livres e caixas organizadas evitam tropeços e quedas."
  },
  {
    id: 4,
    title: "Operação Segura de Empilhadeiras",
    content: "Apenas operadores habilitados devem operar empilhadeiras. Respeite o limite de velocidade e buzine em cruzamentos. Pedestres devem manter distância segura e usar as faixas de pedestre. Nunca transite com os garfos elevados sem carga.",
    summary: "Só habilitados operam. Pedestres longe. Cuidado nos cruzamentos."
  },
  {
    id: 5,
    title: "Prevenção de Incêndios",
    content: "Conheça a localização dos extintores e saídas de emergência. Não obstrua os equipamentos de combate a incêndio. Evite o acúmulo de materiais inflamáveis como papelão e plástico em locais inadequados. Em caso de fumaça, avise imediatamente.",
    summary: "Saiba onde estão os extintores. Não bloqueie saídas. Lixo no lixo."
  },
  {
    id: 6,
    title: "Uso Seguro de Estiletes",
    content: "Ao abrir caixas, corte sempre na direção oposta ao seu corpo. Mantenha a lâmina recolhida quando não estiver em uso. Nunca use estiletes com lâminas enferrujadas ou cegas, pois exigem mais força e aumentam o risco de escape.",
    summary: "Corte para fora do corpo. Recolha a lâmina após o uso."
  },
  {
    id: 7,
    title: "Cuidado com Paletes Quebrados",
    content: "Inspecione os paletes antes de usá-los. Paletes com tábuas soltas ou pregos expostos podem causar acidentes graves ou danificar mercadorias. Separe os danificados para reparo ou descarte e nunca suba em paletes vazios.",
    summary: "Não use paletes danificados. Cuidado com pregos e farpas."
  },
  {
    id: 8,
    title: "Armazenamento em Altura",
    content: "Respeite a capacidade de carga das estantes. Coloque os materiais mais pesados nas prateleiras inferiores e os mais leves nas superiores. Certifique-se de que as caixas estão estáveis e não ultrapassam o limite da prateleira.",
    summary: "Pesados embaixo, leves em cima. Não deixe caixas instáveis."
  },
  {
    id: 9,
    title: "Atenção aos Cruzamentos",
    content: "O almoxarifado é movimentado. Ao chegar em um cruzamento de corredores, pare, olhe e escute. Empilhadeiras têm pontos cegos e podem não te ver. Use os espelhos convexos se disponíveis e respeite a sinalização de pare.",
    summary: "Pare, olhe e escute nos cruzamentos. Cuidado com empilhadeiras."
  },
  {
    id: 10,
    title: "Hidratação e Pausas",
    content: "O trabalho físico no almoxarifado pode ser exaustivo, especialmente em dias quentes. Beba água regularmente, mesmo sem sede. Faça pequenas pausas para alongamento se realizar tarefas repetitivas. Um corpo hidratado e descansado foca melhor.",
    summary: "Beba água frequentemente. Faça pausas para evitar fadiga."
  },
  {
    id: 11,
    title: "Uso do Celular",
    content: "O uso de celular enquanto caminha ou opera máquinas tira sua atenção do ambiente. Se precisar atender uma ligação ou responder uma mensagem, pare em um local seguro, fora das rotas de tráfego. Nunca use fones de ouvido em áreas operacionais.",
    summary: "Não ande digitando. Pare em local seguro para usar o celular."
  },
  {
    id: 12,
    title: "Descarte de Resíduos",
    content: "Mantenha o ambiente limpo descartando fitas, plásticos e papelão nas lixeiras corretas imediatamente após o uso. Restos de embalagens no chão são armadilhas para tropeços e podem enroscar nas rodas de equipamentos.",
    summary: "Lixo na lixeira certa. Chão limpo evita acidentes."
  },
  {
    id: 13,
    title: "Ergonomia no Computador",
    content: "Para quem trabalha na conferência ou lançamento de notas: ajuste a altura da cadeira para que seus pés toquem o chão e seus olhos fiquem na altura do topo do monitor. Mantenha os punhos retos ao digitar. A postura correta evita lesões a longo prazo.",
    summary: "Ajuste cadeira e monitor. Mantenha postura correta ao digitar."
  },
  {
    id: 14,
    title: "Eletricidade e Extensões",
    content: "Não sobrecarregue tomadas e evite o uso de 'benjamins'. Não passe fios por locais de passagem onde podem ser pisados ou puxados. Se notar fios desencapados ou cheiro de queimado, não toque e avise a manutenção imediatamente.",
    summary: "Cuidado com fios e tomadas. Não improvise instalações."
  },
  {
    id: 15,
    title: "Proteção dos Olhos",
    content: "No almoxarifado há poeira, farpas de madeira e fitas plásticas que podem atingir os olhos. Use óculos de proteção sempre que estiver realizando atividades que gerem partículas ou ao manusear produtos químicos de limpeza.",
    summary: "Use óculos de proteção contra poeira e fragmentos."
  }
];

interface Theme {
  id: number;
  title: string;
  content: string;
  summary?: string;
}

export default function DDSGenerator() {
  const [themes, setThemes] = useState<Theme[]>(MOCK_THEMES);
  const [currentTheme, setCurrentTheme] = useState<Theme>(MOCK_THEMES[0]);
  const [readerName, setReaderName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchThemes() {
      try {
        const { data, error } = await supabase
          .from('themes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Erro ao buscar temas do Supabase:', error);
          // Fallback to mock themes is already set in initial state
        } else if (data && data.length > 0) {
          // Map Supabase data to match our Theme interface
          // If summary is missing in DB, we can generate a simple one or use a substring
          const mappedThemes = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            content: item.content,
            summary: item.summary || item.content.substring(0, 100) + "..."
          }));
          setThemes(mappedThemes);
          setCurrentTheme(mappedThemes[0]);
        }
      } catch (err) {
        console.error("Erro de conexão:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchThemes();
  }, []);

  const generateNewTheme = () => {
    const randomIndex = Math.floor(Math.random() * themes.length);
    setCurrentTheme(themes[randomIndex]);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text("DDS - Diálogo Diário de Segurança", 20, 20);
    
    // Date
    doc.setFontSize(12);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 30);
    
    // Reader
    if (readerName) {
      doc.text(`Leitor: ${readerName}`, 20, 40);
    }

    // Theme Title
    doc.setFontSize(16);
    doc.text(currentTheme.title, 20, 60);
    
    // Content (Split text to fit page)
    doc.setFontSize(12);
    const splitContent = doc.splitTextToSize(currentTheme.content, 170);
    doc.text(splitContent, 20, 80);
    
    // Summary
    doc.setFontSize(14);
    doc.text("Resumo:", 20, 140);
    doc.setFontSize(12);
    const summaryText = currentTheme.summary || "Sem resumo disponível.";
    const splitSummary = doc.splitTextToSize(summaryText, 170);
    doc.text(splitSummary, 20, 150);

    // Footer
    doc.setFontSize(10);
    doc.text("Gerado pelo App DDS Almoxarifado", 20, 280);

    doc.save(`DDS_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  if (loading) {
    return <div className="text-center p-10 text-cyber-muted">Carregando temas...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto rounded-xl overflow-hidden md:max-w-3xl m-4 p-6 bg-cyber-surface/80 border border-cyber-border shadow-neonMix backdrop-blur">
      <div className="uppercase tracking-[0.22em] text-xs text-cyber-cyan font-semibold mb-2">DDS do Dia</div>
      
      <div className="mb-6">
        <label className="block text-cyber-muted text-sm font-bold mb-2" htmlFor="reader">
          Quem vai ler hoje?
        </label>
        <input
          className="appearance-none rounded w-full py-2 px-3 leading-tight bg-cyber-bg/60 text-cyber-text border border-cyber-border shadow-neonCyan focus:outline-none focus:ring-2 focus:ring-cyber-cyan/40"
          id="reader"
          type="text"
          placeholder="Nome do colaborador"
          value={readerName}
          onChange={(e) => setReaderName(e.target.value)}
        />
      </div>

      <div className="border-l-4 border-cyber-pink pl-4 mb-6">
        <h1 className="block mt-1 text-lg leading-tight font-medium text-cyber-text">{currentTheme.title}</h1>
        <p className="mt-2 text-cyber-muted">{currentTheme.content}</p>
        <div className="mt-4 bg-cyber-bg/60 p-3 rounded border border-cyber-border shadow-neonPink">
          <span className="font-bold text-cyber-text">Resumo: </span>
          <span className="text-cyber-muted">{currentTheme.summary}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={generateNewTheme}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-cyber-text bg-cyber-bg/60 border border-cyber-border shadow-neonCyan hover:bg-cyber-bg/80 focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Gerar Novo Tema
        </button>
        
        <button
          onClick={downloadPDF}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-cyber-text bg-gradient-to-r from-cyber-purple to-cyber-pink shadow-neonMix hover:from-cyber-pink hover:to-cyber-cyan focus:outline-none focus:ring-2 focus:ring-cyber-pink/40"
        >
          <FileDown className="mr-2 h-4 w-4" />
          Baixar PDF
        </button>
      </div>
    </div>
  );
}

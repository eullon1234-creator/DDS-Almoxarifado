"use client";

import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import { FileDown, RefreshCw, Calendar, Wand2, Loader, User, Terminal, CheckCircle2, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { generateDDSTheme } from '@/lib/deepseek';
import { getSetting } from '@/lib/settings';

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
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const { settings: appSettings } = useSettings();

  useEffect(() => {
    async function fetchThemes() {
      try {
        const { data, error } = await supabase
          .from('themes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Erro ao buscar temas do Supabase:', error);
        } else if (data && data.length > 0) {
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

  const generateAITheme = async () => {
    setGeneratingAI(true);
    setAiError(null);

    if (!getSetting('enableAI')) {
      setAiError('Geração por IA está desativada nas configurações.');
      setGeneratingAI(false);
      return;
    }

    try {
      const newTheme = await generateDDSTheme();
      const aiThemeWithId: Theme = {
        id: Math.max(...themes.map(t => t.id), 0) + 1,
        title: newTheme.title,
        content: newTheme.content,
        summary: newTheme.summary
      };

      setThemes([aiThemeWithId, ...themes]);
      setCurrentTheme(aiThemeWithId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao gerar tema';
      setAiError(errorMessage);
      console.error('Erro ao gerar tema com IA:', error);
    } finally {
      setGeneratingAI(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("DDS - Diálogo Diário de Segurança", 20, 20);
    doc.setFontSize(12);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 30);
    if (readerName) {
      doc.text(`Leitor: ${readerName}`, 20, 40);
    }
    doc.setFontSize(16);
    doc.text(currentTheme.title, 20, 60);
    doc.setFontSize(12);
    const splitContent = doc.splitTextToSize(currentTheme.content, 170);
    doc.text(splitContent, 20, 80);
    doc.setFontSize(14);
    doc.text("Resumo:", 20, 140);
    doc.setFontSize(12);
    const summaryText = currentTheme.summary || "Sem resumo disponível.";
    const splitSummary = doc.splitTextToSize(summaryText, 170);
    doc.text(splitSummary, 20, 150);
    doc.setFontSize(10);
    doc.text("Gerado pelo App DDS Almoxarifado", 20, 280);
    doc.save(`DDS_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  if (loading) {
    return (
      <div className="text-center p-20 cyber-card max-w-2xl mx-auto border-dashed animate-pulse">
        <Loader className="mx-auto h-12 w-12 text-cyber-cyan animate-spin mb-4" />
        <p className="text-cyber-cyan font-mono tracking-widest uppercase">Inicializando Protocolos...</p>
      </div>
    );
  }

  return (
    <div className="cyber-card p-8 rounded-none border-l-4 border-l-cyber-cyan">
      <div className="flex items-center gap-2 text-cyber-cyan font-mono text-xs mb-6 opacity-70">
        <Terminal size={14} />
        <span className="animate-pulse">TERMINAL // LOGGED_IN // READY</span>
      </div>

      <div className="mb-8 group">
        <label className="flex items-center gap-2 text-cyber-blue text-xs font-mono uppercase tracking-widest mb-3 group-focus-within:text-cyber-cyan transition-colors" htmlFor="reader">
          <User size={14} />
          Operador Responsável
        </label>
        <div className="relative">
          <input
            className="w-full bg-cyber-black/50 border border-cyber-blue/30 p-3 text-cyber-cyan font-mono focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/30 transition-all placeholder:text-cyber-blue/20"
            id="reader"
            type="text"
            placeholder="NOME DO OPERADOR"
            value={readerName}
            onChange={(e) => setReaderName(e.target.value)}
          />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-cyan group-focus-within:w-full transition-all duration-500"></div>
        </div>
      </div>

      <div className="mb-10 relative">
        <div className="absolute -left-8 top-0 bottom-0 w-1 bg-cyber-pink shadow-neon-pink"></div>
        <div className="uppercase tracking-widest text-[10px] text-cyber-pink font-bold mb-2 flex items-center gap-2">
          <Calendar size={12} />
          Protocolo Ativo // {new Date().toLocaleDateString('pt-BR')}
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight leading-none group">
          <span className="text-cyber-cyan opacity-50 mr-2 group-hover:opacity-100 transition-opacity">#</span>
          {currentTheme.title}
        </h2>
        <div className="p-4 bg-cyber-cyan/5 border border-cyber-cyan/10 rounded-sm">
          <p className="text-cyber-blue/90 leading-relaxed font-light first-letter:text-3xl first-letter:font-bold first-letter:text-cyber-cyan first-letter:mr-1">
            {currentTheme.content}
          </p>
        </div>

        <div className="mt-6 p-4 bg-cyber-black border-l-2 border-cyber-yellow/50">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={16} className="text-cyber-yellow" />
            <span className="text-cyber-yellow font-mono text-xs uppercase font-bold tracking-tighter">Diretriz Crítica</span>
          </div>
          <p className="text-cyber-yellow/80 text-sm font-mono italic">
            "{currentTheme.summary}"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={generateNewTheme}
          className="cyber-button flex items-center justify-center p-3 text-xs font-bold text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30 hover:bg-cyber-cyan hover:text-cyber-black hover:shadow-neon-cyan"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Rolar Protocolo
        </button>

        <button
          onClick={generateAITheme}
          disabled={generatingAI}
          className="cyber-button flex items-center justify-center p-3 text-xs font-bold text-white bg-cyber-purple/20 border border-cyber-purple/50 hover:bg-cyber-purple hover:shadow-[0_0_15px_rgba(157,0,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generatingAI ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Sincronizando...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4 text-cyber-pink" />
              IA Neural Sync (Texto)
            </>
          )}
        </button>

        <button
          onClick={() => {
            if (!appSettings.enableImageGen) {
              setAiError('Geração de imagens desativada nas configurações.');
              return;
            }
            const prompt = `Ilustração cyberpunk 3D hyper-realistic de ${currentTheme.title} em um ambiente de almoxarifado futurista, cores neon azul e rosa, iluminação cinematográfica, 8k.`;
            window.open(`https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000)}&nologo=true`, '_blank');
          }}
          className="cyber-button flex items-center justify-center p-3 text-xs font-bold text-cyber-pink bg-cyber-pink/10 border border-cyber-pink/30 hover:bg-cyber-pink hover:text-white hover:shadow-neon-pink"
        >
          <ShieldCheck className="mr-2 h-4 w-4" />
          IA Neural Sync (Foto)
        </button>

        <button
          onClick={downloadPDF}
          className="cyber-button md:col-span-1 lg:col-span-1 flex items-center justify-center p-3 text-xs font-bold text-cyber-black bg-cyber-cyan shadow-neon-cyan hover:shadow-[0_0_25px_rgba(0,243,255,0.8)]"
        >
          <FileDown className="mr-2 h-4 w-4" />
          Extrair PDF
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-cyber-black/40 border border-cyber-blue/10 rounded group cursor-crosshair overflow-hidden">
          <div className="text-[10px] font-mono text-cyber-blue/40 mb-2 flex justify-between">
            <span>VISUAL_LOG // RENDER_01</span>
            <span className="group-hover:text-cyber-cyan transition-colors">LIVE_FEED</span>
          </div>
          <div className="aspect-video bg-cyber-black border border-cyber-cyan/10 flex items-center justify-center relative group-hover:border-cyber-cyan/30 transition-all">
            {appSettings.showImages ? (
            <img
              src={`https://pollinations.ai/p/${encodeURIComponent('cyberpunk safety warehouse worker ' + currentTheme.title)}?width=800&height=450&seed=42&nologo=true`}
              alt="DDS Visual Sync"
              className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-cyber-blue">Imagens desativadas nas configurações</div>
          )}
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-[8px] font-mono text-white/50">REC // SAFETY_CAM_04</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-cyber-black/40 border border-cyber-blue/10 rounded group cursor-crosshair overflow-hidden">
          <div className="text-[10px] font-mono text-cyber-blue/40 mb-2 flex justify-between">
            <span>VISUAL_LOG // RENDER_02</span>
            <span className="group-hover:text-cyber-pink transition-colors">LIVE_FEED</span>
          </div>
          <div className="aspect-video bg-cyber-black border border-cyber-pink/10 flex items-center justify-center relative group-hover:border-cyber-pink/30 transition-all">
          {appSettings.showImages ? (
            <img
              src={`https://pollinations.ai/p/${encodeURIComponent('cyberpunk safety sign warehouse ' + currentTheme.title)}?width=800&height=450&seed=123&nologo=true`}
              alt="DDS Safety Visual"
              className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-cyber-blue">Imagens desativadas nas configurações</div>
          )
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-[8px] font-mono text-white/50">REC // SAFETY_CAM_07</span>
            </div>
          </div>
        </div>
      </div>

      {aiError && (
        <div className="mt-8 p-4 bg-cyber-pink/10 border border-cyber-pink/50 text-cyber-pink rounded-sm animate-glitch">
          <div className="flex items-center gap-2 mb-1">
            <Terminal size={16} />
            <p className="font-mono text-xs uppercase font-bold">Erro de Sincronização AI</p>
          </div>
          <p className="text-xs font-mono">{aiError}</p>
        </div>
      )}

      <div className="mt-8 flex justify-between items-center text-[8px] font-mono text-cyber-cyan/20 uppercase tracking-[0.3em]">
        <span>Hardware: Almoxarifado-v4.2</span>
        <span>Status: Nominal</span>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { Settings, Lock, Eye, EyeOff, Save, X, Key, ShieldCheck, Terminal } from 'lucide-react';
import { useSettings } from '@/lib/SettingsContext';

export default function ConfigPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Configurações via Context
    const { settings, toggleSetting } = useSettings();

<<<<<<< HEAD

=======
>>>>>>> da2ac16327f2cd72563be9b00b3684cfe5757120
    // Senha padrão definida para o sistema
    const SYSTEM_PWD = "Euana0192*";

    useEffect(() => {
        // Carregar chave salva se existir
        const savedKey = localStorage.getItem('cyber_dds_api_key');
        if (savedKey) setApiKey(savedKey);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === SYSTEM_PWD) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('ACESSO NEGADO: CREDENCIAIS INVÁLIDAS');
            setPassword('');
        }
    };

    const handleSave = () => {
        localStorage.setItem('cyber_dds_api_key', apiKey);
        setSuccess('SISTEMA ATUALIZADO: CHAVE SINCRONIZADA');
        setTimeout(() => setSuccess(''), 3000);
    };

    const closePanel = () => {
        setIsOpen(false);
        setIsAuthenticated(false);
        setPassword('');
        setError('');
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 p-3 bg-cyber-black border border-cyber-cyan/30 text-cyber-cyan rounded-full hover:bg-cyber-cyan hover:text-cyber-black hover:shadow-neon-cyan transition-all group z-50"
                title="Configurações do Sistema"
            >
                <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-cyber-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="cyber-card w-full max-w-md p-8 border-t-4 border-t-cyber-cyan relative">
                <button
                    onClick={closePanel}
                    className="absolute top-4 right-4 text-cyber-blue hover:text-cyber-pink transition-colors"
                >
                    <X size={24} />
                </button>

                {!isAuthenticated ? (
                    <div className="animate-in fade-in zoom-in duration-300">
                        <div className="flex flex-col items-center mb-8 text-center">
                            <div className="w-16 h-16 bg-cyber-cyan/10 rounded-full flex items-center justify-center mb-4 border border-cyber-cyan/30">
                                <Lock className="text-cyber-cyan w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-black text-cyber-cyan tracking-tighter uppercase italic">Acesso Restrito</h2>
                            <p className="text-cyber-blue/60 font-mono text-xs mt-2 uppercase">ÁREAS DE CONFIGURAÇÃO DE NÚCLEO</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-cyber-blue font-mono text-[10px] uppercase tracking-[0.2em] mb-2">Chave de Autorização</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-cyber-black/50 border border-cyber-blue/30 p-3 text-cyber-cyan font-mono focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/30 placeholder:text-cyber-blue/20"
                                    placeholder="********"
                                    autoFocus
                                />
                            </div>
                            {error && <p className="text-cyber-pink font-mono text-[10px] animate-pulse">{error}</p>}
                            <button
                                type="submit"
                                className="w-full cyber-button p-4 bg-cyber-cyan text-cyber-black font-bold text-sm tracking-widest shadow-neon-cyan active:scale-95"
                            >
                                DESBLOQUEAR SISTEMA
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-cyber-purple/20 rounded flex items-center justify-center border border-cyber-purple/50">
                                <ShieldCheck className="text-cyber-purple w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">Configurações de IA</h2>
                                <p className="text-cyber-cyan font-mono text-[10px] uppercase">OPERADOR LOGADO // NÍVEL 1</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <label className="text-cyber-blue font-mono text-[10px] uppercase tracking-[0.2em]">Deepseek API Key</label>
                                    <button
                                        onClick={() => setShowKey(!showKey)}
                                        className="text-cyber-blue/50 hover:text-cyber-cyan transition-colors"
                                    >
                                        {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                <div className="relative group">
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-blue/30 group-focus-within:text-cyber-cyan transition-colors" size={16} />
                                    <input
                                        type={showKey ? "text" : "password"}
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        className="w-full bg-cyber-black border border-cyber-blue/30 p-3 pl-10 text-cyber-cyan font-mono text-sm focus:outline-none focus:border-cyber-cyan transition-all"
                                        placeholder="sk-..."
                                    />
                                </div>
                                <p className="text-[10px] text-cyber-blue/40 font-mono leading-relaxed uppercase">
                                    ESTE TOKEN É UTILIZADO PARA GERAR TEMAS DE DDS E CONTEÚDO VIA REDE NEURAL.
                                </p>
                            </div>
                            {/* Novas opções de recursos (toggle) */}
                            <div className="p-4 bg-cyber-black/5 border border-cyber-blue/20 rounded-sm space-y-3">
                                <h3 className="text-cyber-cyan font-bold text-[10px] uppercase tracking-widest">Recursos Avançados</h3>
                                <div className="space-y-3">
                                    {[
                                        { key: 'enableAI', label: 'Ativar IA (Texto)', desc: 'Permite gerar temas via IA neural.' },
                                        { key: 'enableImageGen', label: 'Ativar Geração de Imagens', desc: 'Permite criar imagens via IA externa.' },
                                        { key: 'showImages', label: 'Exibir Imagens no Painel', desc: 'Mostra ou oculta imagens geradas no painel.' },
                                        { key: 'verboseLogging', label: 'Logs Detalhados', desc: 'Ativa logs de depuração no console.' },
                                    ].map(item => (
                                        <div key={item.key} className="flex items-center justify-between">
                                            <div>
                                                <div className="text-[11px] font-bold text-white">{item.label}</div>
                                                <div className="text-[10px] text-cyber-blue/50 font-mono">{item.desc}</div>
                                            </div>
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only" checked={(settings as any)[item.key]} onChange={() => { toggleSetting(item.key as any); setSuccess('CONFIGURAÇÕES ATUALIZADAS'); setTimeout(() => setSuccess(''), 2000); }} />
                                                <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-all ${ (settings as any)[item.key] ? 'bg-cyber-cyan' : 'bg-cyber-blue/20'}`}>
                                                    <div className={`bg-white w-4 h-4 rounded-full transform transition-transform ${ (settings as any)[item.key] ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Guia para Leigos */}
                            <div className="p-4 bg-cyber-blue/5 border border-cyber-blue/20 rounded-sm space-y-3">
                                <h3 className="text-cyber-cyan font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                                    <Terminal size={12} /> Guia de Configuração (Passo a Passo)
                                </h3>
                                <ol className="text-[10px] font-mono text-cyber-blue/70 space-y-2 list-decimal ml-4">
                                    <li>Acesse o site <a href="https://platform.deepseek.com/" target="_blank" className="text-cyber-cyan underline">platform.deepseek.com</a> e crie uma conta gratuita.</li>
                                    <li>Vá na seção <span className="text-cyber-purple">"API Keys"</span> no menu lateral.</li>
                                    <li>Clique em <span className="text-cyber-purple">"Create new API key"</span> e dê um nome (ex: "DDS App").</li>
                                    <li>Copie o código gerado (ele começa com <span className="italic">sk-...</span>).</li>
                                    <li>Cole esse código no campo acima e clique em <span className="text-white">"SALVAR CHAVE"</span>.</li>
                                </ol>
                                <div className="text-[9px] text-cyber-yellow/60 italic font-mono mt-2">
                                    * A Deepseek oferece créditos gratuitos iniciais para novos usuários.
                                </div>
                            </div>

                            {/* Novas opções de recursos (toggle) */}
                            <div className="p-4 bg-cyber-black/5 border border-cyber-blue/20 rounded-sm space-y-3">
                                <h3 className="text-cyber-cyan font-bold text-[10px] uppercase tracking-widest">Recursos Avançados</h3>
                                <div className="space-y-3">
                                    {[
                                        { key: 'enableAI', label: 'Ativar IA (Texto)', desc: 'Permite gerar temas via IA neural.' },
                                        { key: 'enableImageGen', label: 'Ativar Geração de Imagens', desc: 'Permite criar imagens via IA externa.' },
                                        { key: 'showImages', label: 'Exibir Imagens no Painel', desc: 'Mostra ou oculta imagens geradas no painel.' },
                                        { key: 'verboseLogging', label: 'Logs Detalhados', desc: 'Ativa logs de depuração no console.' },
                                    ].map(item => (
                                        <div key={item.key} className="flex items-center justify-between">
                                            <div>
                                                <div className="text-[11px] font-bold text-white">{item.label}</div>
                                                <div className="text-[10px] text-cyber-blue/50 font-mono">{item.desc}</div>
                                            </div>
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only" checked={(settings as any)[item.key]} onChange={() => toggleSetting(item.key as any)} />
                                                <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-all ${ (settings as any)[item.key] ? 'bg-cyber-cyan' : 'bg-cyber-blue/20'}`}>
                                                    <div className={`bg-white w-4 h-4 rounded-full transform transition-transform ${ (settings as any)[item.key] ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {success && (
                                <div className="p-3 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-mono text-[10px] uppercase animate-flicker">
                                    {success}
                                </div>
                            )}

                            <div className="pt-4 flex gap-3">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 cyber-button p-4 bg-cyber-purple text-white font-bold text-sm tracking-widest shadow-[0_0_15px_rgba(157,0,255,0.4)]"
                                >
                                    SALVAR CHAVE
                                </button>
                                <button
                                    onClick={() => setIsAuthenticated(false)}
                                    className="cyber-button px-6 bg-cyber-black border border-cyber-pink/50 text-cyber-pink font-bold text-xs"
                                >
                                    SAIR
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-cyber-blue/10 flex justify-between items-center opacity-30">
                    <span className="text-[8px] font-mono text-cyber-blue">SYS_UUID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                    <span className="text-[8px] font-mono text-cyber-blue">VER: 1.0.4-STABLE</span>
                </div>
            </div>
        </div>
    );
}

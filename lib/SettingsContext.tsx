"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Settings = {
  enableAI: boolean;
  enableImageGen: boolean;
  showImages: boolean;
  verboseLogging: boolean;
};

const DEFAULT_SETTINGS: Settings = {
  enableAI: true,
  enableImageGen: true,
  showImages: true,
  verboseLogging: false,
};

const STORAGE_KEY = 'cyber_dds_settings';

type SettingsContextType = {
  settings: Settings;
  setSettings: (s: Partial<Settings>) => void;
  toggleSetting: <K extends keyof Settings>(key: K) => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettingsState] = useState<Settings>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch (e) {}
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      window.dispatchEvent(new CustomEvent('cyber_settings_changed', { detail: settings }));
    } catch (e) {}
  }, [settings]);

  const setSettings = (partial: Partial<Settings>) => {
    setSettingsState((prev) => ({ ...prev, ...partial }));
  };

  const toggleSetting = <K extends keyof Settings>(key: K) => {
    setSettingsState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings, toggleSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock supabase to avoid env validation/initialization during tests
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null })
      })
    })
  }
}));

// Mock Deepseek generator
vi.mock('@/lib/deepseek', () => ({
  generateDDSTheme: vi.fn(async () => ({ title: 'Tema IA Teste', content: 'conteúdo IA', summary: 'resumo' }))
}));

import DDSGenerator from '@/components/DDSGenerator';
import { SettingsProvider } from '@/lib/SettingsContext';

describe('DDSGenerator', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('does not run IA generation when disable flag is present', async () => {
    // disable AI in storage
    localStorage.setItem('cyber_dds_settings', JSON.stringify({ enableAI: false, enableImageGen: true, showImages: true, verboseLogging: false }));

    render(
      <SettingsProvider>
        <DDSGenerator />
      </SettingsProvider>
    );

    // Wait until the UI is ready (loading completes)
    await waitFor(() => expect(screen.getByText(/IA Neural Sync \(Texto\)/i)).toBeInTheDocument());

    const aiButton = screen.getByText(/IA Neural Sync \(Texto\)/i);
    fireEvent.click(aiButton);

    await waitFor(() => expect(screen.getByText(/Geração por IA está desativada nas configurações\./i)).toBeInTheDocument());
  });

  it('generates a new theme when IA enabled', async () => {
    // enable AI in storage
    localStorage.setItem('cyber_dds_settings', JSON.stringify({ enableAI: true, enableImageGen: true, showImages: true, verboseLogging: false }));

    render(
      <SettingsProvider>
        <DDSGenerator />
      </SettingsProvider>
    );

    // Wait until the UI is ready (loading completes)
    await waitFor(() => expect(screen.getByText(/IA Neural Sync \(Texto\)/i)).toBeInTheDocument());

    const aiButton = screen.getByText(/IA Neural Sync \(Texto\)/i);
    fireEvent.click(aiButton);

    // The mocked generateDDSTheme returns a theme with title 'Tema IA Teste'
    await waitFor(() => expect(screen.getByText('Tema IA Teste')).toBeInTheDocument());
  });
});
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ConfigPanel from '@/components/ConfigPanel';
import { SettingsProvider } from '@/lib/SettingsContext';

describe('ConfigPanel', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('opens, authenticates and toggles a setting persisted to localStorage', async () => {
    render(
      <SettingsProvider>
        <ConfigPanel />
      </SettingsProvider>
    );

    // Open panel
    const openBtn = screen.getByTitle('Configurações do Sistema');
    fireEvent.click(openBtn);

    // Enter password and submit
    const pwdInput = screen.getByPlaceholderText('********');
    fireEvent.change(pwdInput, { target: { value: 'Euana0192*' } });
    fireEvent.submit(pwdInput.closest('form')!);

    // Wait for authenticated view
    await waitFor(() => expect(screen.getByText('Configurações de IA')).toBeInTheDocument());

    // Find toggle label
    const toggleLabel = screen.getByText('Ativar IA (Texto)');
    expect(toggleLabel).toBeInTheDocument();

    // Toggle it - click the first checkbox in the panel (enableAI is the first item)
    const checkboxes = screen.getAllByRole('checkbox', { hidden: true });
    expect(checkboxes.length).toBeGreaterThan(0);
    fireEvent.click(checkboxes[0]);

    // Localstorage updated
    await waitFor(() => {
      const raw = localStorage.getItem('cyber_dds_settings');
      expect(raw).toBeTruthy();
      const parsed = JSON.parse(raw as string);
      expect(parsed.enableAI).toBe(false);
    });
  });
});
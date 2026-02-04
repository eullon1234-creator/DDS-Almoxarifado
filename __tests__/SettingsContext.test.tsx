import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { SettingsProvider, useSettings } from '@/lib/SettingsContext';

function TestConsumer() {
  const { settings, toggleSetting } = useSettings();
  return (
    <div>
      <div data-testid="enableAI">{String(settings.enableAI)}</div>
      <button onClick={() => toggleSetting('enableAI')}>toggle</button>
    </div>
  );
}

describe('SettingsContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides defaults and toggles', () => {
    render(
      <SettingsProvider>
        <TestConsumer />
      </SettingsProvider>
    );

    expect(screen.getByTestId('enableAI').textContent).toBe('true');

    fireEvent.click(screen.getByText('toggle'));

    expect(screen.getByTestId('enableAI').textContent).toBe('false');

    const raw = localStorage.getItem('cyber_dds_settings');
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw as string);
    expect(parsed.enableAI).toBe(false);
  });
});
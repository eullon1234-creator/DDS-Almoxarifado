type Settings = {
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

export function loadSettings(): Settings {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch (e) {
        // ignore
    }
    return DEFAULT_SETTINGS;
}

export function saveSettings(partial: Partial<Settings>): Settings {
    const current = loadSettings();
    const next = { ...current, ...partial };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    // notify other components
    try { window.dispatchEvent(new CustomEvent('cyber_settings_changed', { detail: next })); } catch (e) {}
    return next;
}

export function getSetting<K extends keyof Settings>(key: K): Settings[K] {
    return loadSettings()[key];
}

export function setSetting<K extends keyof Settings>(key: K, value: Settings[K]): Settings {
    const s = loadSettings();
    s[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    try { window.dispatchEvent(new CustomEvent('cyber_settings_changed', { detail: s })); } catch (e) {}
    return s;
}

export function toggleSetting<K extends keyof Settings>(key: K): Settings {
    return setSetting(key, !getSetting(key));
}

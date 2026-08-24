/** Runtime feature overrides (localStorage) — frontend demo only */

const KEY = 'decisionos-feature-overrides';

export type FeatureOverrideMap = Record<string, boolean>;

export function loadFeatureOverrides(): FeatureOverrideMap {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveFeatureOverrides(map: FeatureOverrideMap): void {
  localStorage.setItem(KEY, JSON.stringify(map));
}

export function setFeatureOverride(key: string, enabled: boolean): void {
  const map = loadFeatureOverrides();
  map[key] = enabled;
  saveFeatureOverrides(map);
  window.dispatchEvent(new Event('decisionos-features-changed'));
}

/** If override exists, it wins over FEATURES config for sidebar visibility */
export function isFeatureEnabledForUi(key: string, defaultActive: boolean): boolean {
  const map = loadFeatureOverrides();
  if (key in map) return map[key];
  return defaultActive;
}

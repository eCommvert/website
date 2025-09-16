export type ProductFilters = {
  platform?: string[]; // allow multiple: ['google-ads','google-analytics']
  dataBackend?: string; // 'workflow' | 'dashboard' | 'template' (rename from type)
  pricing?: string; // 'free' | 'paid'
};

export const FILTER_FACETS = {
  platform: [
    { value: 'all', label: 'All platforms' },
    { value: 'google-ads', label: 'Google Ads' },
    { value: 'meta-ads', label: 'Meta Ads' },
    { value: 'google-analytics', label: 'Google Analytics' },
  ],
  dataBackend: [
    { value: 'all', label: 'All data backends' },
    { value: 'looker-studio', label: 'Looker Studio' },
    { value: 'google-sheets', label: 'Google Sheets' },
    { value: 'make', label: 'Make.com' },
    { value: 'n8n', label: 'n8n' },
    { value: 'google-ads-scripts', label: 'Google Ads Scripts' },
  ],
  pricing: [
    { value: 'all', label: 'Any price' },
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' },
  ],
} as const;

export type ProductFiltersMap = Record<string, { platform?: string[]; dataBackend?: string; pricing?: string }>;

export function hasRequiredFacets(entry: { platform?: string[]; dataBackend?: string; pricing?: string }): boolean {
  return !!entry && Array.isArray(entry.platform) && entry.platform.length > 0
    && entry.dataBackend !== undefined && entry.dataBackend !== 'all'
    && entry.pricing !== undefined && entry.pricing !== 'all';
}



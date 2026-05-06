export type PluginCatalogItem = {
  id: string;
  product_id: string;
  name: string;
  version: string;
  min_app_version: string;
  description: string;
  permissions: string[];
  pro_only: boolean;
  enabled: boolean;
  changelog?: string;
  download_url?: string;
};

export const fallbackMaxCommanderPlugins: PluginCatalogItem[] = [
  {
    id: 'jellyfin',
    product_id: 'max-commander',
    name: 'Jellyfin',
    version: '1.0.0',
    min_app_version: '0.8.10',
    description: 'Browse and stream Jellyfin libraries as a Max Commander virtual filesystem.',
    permissions: ['filesystem.read', 'network.http', 'media.openVideo'],
    pro_only: true,
    enabled: true,
    changelog: 'Initial official catalog entry.',
    download_url: '/api/plugins/download/jellyfin'
  },
  {
    id: 'steam-library',
    product_id: 'max-commander',
    name: 'Steam Library',
    version: '1.0.0',
    min_app_version: '0.8.10',
    description: 'Browse installed Steam games, tools, workshop content, and library drives.',
    permissions: ['filesystem.read', 'files.execute', 'commands.palette'],
    pro_only: true,
    enabled: true,
    changelog: 'Initial official catalog entry.',
    download_url: '/api/plugins/download/steam-library'
  },
  {
    id: 'sample-fs',
    product_id: 'max-commander',
    name: 'Sample Filesystem',
    version: '1.0.0',
    min_app_version: '0.8.10',
    description: 'Reference filesystem plugin for developers building virtual panels.',
    permissions: ['filesystem.read'],
    pro_only: true,
    enabled: true,
    changelog: 'Initial official catalog entry.',
    download_url: '/api/plugins/download/sample-fs'
  },
  {
    id: 'sample-tool',
    product_id: 'max-commander',
    name: 'Sample Tool',
    version: '1.0.0',
    min_app_version: '0.8.10',
    description: 'Reference tool plugin for commands, dashboard UI, and background tasks.',
    permissions: ['commands.palette', 'ui.dashboard'],
    pro_only: true,
    enabled: true,
    changelog: 'Initial official catalog entry.',
    download_url: '/api/plugins/download/sample-tool'
  }
];

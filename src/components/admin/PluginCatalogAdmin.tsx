import { useEffect, useState, type FormEvent } from 'react';
import { AlertTriangle, PackagePlus, RefreshCw, Save, Upload } from 'lucide-react';
import type { PluginCatalogItem } from '../../data/pluginCatalog';

type AdminPlugin = PluginCatalogItem & {
  artifact_key?: string | null;
  package_url?: string | null;
};

const emptyPlugin: AdminPlugin = {
  id: '',
  product_id: 'max-commander',
  name: '',
  version: '1.0.0',
  min_app_version: '0.8.10',
  description: '',
  permissions: [],
  pro_only: true,
  enabled: true,
  changelog: '',
  artifact_key: '',
  package_url: ''
};

export const PluginCatalogAdmin = () => {
  const [plugins, setPlugins] = useState<AdminPlugin[]>([]);
  const [draft, setDraft] = useState<AdminPlugin>(emptyPlugin);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/plugins', { headers: { Accept: 'application/json' } });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.message || `Plugin catalog failed (${response.status})`);
      setPlugins(payload.plugins || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load plugin catalog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/plugins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(draft)
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.message || `Save failed (${response.status})`);

      if (file) {
        const form = new FormData();
        form.set('id', draft.id);
        form.set('product_id', draft.product_id);
        form.set('file', file);
        const upload = await fetch('/api/admin/plugin-upload', { method: 'POST', body: form });
        const uploadPayload = await upload.json().catch(() => null);
        if (!upload.ok) throw new Error(uploadPayload?.message || `Upload failed (${upload.status})`);
      }

      setMessage(`Saved ${draft.name || draft.id}.`);
      setDraft(emptyPlugin);
      setFile(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save plugin.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-[1500px] mx-auto px-5 py-24">
      <div className="mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sterling-blue">
            <PackagePlus size={18} />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em]">Admin Catalog</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Plugin Catalog</h1>
          <p className="text-sm text-sterling-mist/60 max-w-2xl">
            Upload official Max Commander plugin packages and control what appears in the public catalog.
          </p>
        </div>
        <button onClick={load} disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-sterling-blue px-3 py-2 text-sm font-bold text-white disabled:opacity-50">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {error && <Banner tone="error" text={error} />}
      {message && <Banner tone="success" text={message} />}

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={save} className="rounded-2xl border border-sterling-mist/10 bg-sterling-deep p-5">
          <h2 className="mb-4 text-xl font-bold">Metadata</h2>
          <div className="grid gap-4">
            <AdminInput label="Plugin ID" value={draft.id} onChange={value => setDraft({ ...draft, id: value })} placeholder="jellyfin" />
            <AdminInput label="Name" value={draft.name} onChange={value => setDraft({ ...draft, name: value })} placeholder="Jellyfin" />
            <div className="grid grid-cols-2 gap-3">
              <AdminInput label="Version" value={draft.version} onChange={value => setDraft({ ...draft, version: value })} />
              <AdminInput label="Minimum MC Version" value={draft.min_app_version} onChange={value => setDraft({ ...draft, min_app_version: value })} />
            </div>
            <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.12em] text-sterling-mist/50">
              Description
              <textarea value={draft.description} onChange={event => setDraft({ ...draft, description: event.target.value })} rows={4} className="resize-none rounded-lg border border-sterling-mist/10 bg-sterling-surface px-3 py-2 text-sm normal-case tracking-normal text-sterling-mist outline-none focus:border-sterling-blue/70" />
            </label>
            <AdminInput label="Permissions CSV" value={draft.permissions.join(', ')} onChange={value => setDraft({ ...draft, permissions: value.split(',').map(v => v.trim()).filter(Boolean) })} placeholder="filesystem.read, network.http" />
            <AdminInput label="Package URL Optional" value={draft.package_url || ''} onChange={value => setDraft({ ...draft, package_url: value })} />
            <AdminInput label="Changelog" value={draft.changelog || ''} onChange={value => setDraft({ ...draft, changelog: value })} />
            <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.12em] text-sterling-mist/50">
              Upload .mcx
              <input type="file" accept=".mcx" onChange={event => setFile(event.target.files?.[0] || null)} className="rounded-lg border border-sterling-mist/10 bg-sterling-surface px-3 py-2 text-sm normal-case tracking-normal text-sterling-mist" />
            </label>
            <div className="flex flex-wrap gap-4 text-sm text-sterling-mist/70">
              <label className="flex items-center gap-2"><input type="checkbox" checked={draft.pro_only} onChange={event => setDraft({ ...draft, pro_only: event.target.checked })} className="accent-sterling-blue" /> Pro only</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={draft.enabled} onChange={event => setDraft({ ...draft, enabled: event.target.checked })} className="accent-sterling-blue" /> Enabled</label>
            </div>
            <button disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-lg bg-sterling-blue px-4 py-2 text-sm font-bold text-white disabled:opacity-50">
              {file ? <Upload size={16} /> : <Save size={16} />}
              {saving ? 'Saving...' : 'Save Plugin'}
            </button>
          </div>
        </form>

        <div className="rounded-2xl border border-sterling-mist/10 bg-sterling-deep p-5">
          <h2 className="mb-4 text-xl font-bold">Catalog Rows</h2>
          <div className="grid gap-3">
            {plugins.map(plugin => (
              <button
                key={plugin.id}
                onClick={() => setDraft(plugin)}
                className="rounded-xl border border-sterling-mist/10 bg-sterling-surface p-4 text-left transition-all hover:border-sterling-blue/45"
              >
                <div className="mb-1 flex items-center justify-between gap-3">
                  <span className="font-bold text-sterling-mist">{plugin.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${plugin.enabled ? 'bg-emerald-400/10 text-emerald-300' : 'bg-sterling-mist/10 text-sterling-mist/45'}`}>
                    {plugin.enabled ? 'Enabled' : 'Hidden'}
                  </span>
                </div>
                <div className="font-mono text-xs text-sterling-mist/45">{plugin.id} · v{plugin.version} · {plugin.artifact_key || plugin.package_url || 'no package'}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function AdminInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.12em] text-sterling-mist/50">
      {label}
      <input value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder} className="rounded-lg border border-sterling-mist/10 bg-sterling-surface px-3 py-2 text-sm normal-case tracking-normal text-sterling-mist outline-none focus:border-sterling-blue/70" />
    </label>
  );
}

function Banner({ text, tone }: { text: string; tone: 'error' | 'success' }) {
  return (
    <div className={`mb-5 flex items-center gap-3 rounded-xl border p-4 text-sm ${tone === 'error' ? 'border-amber-400/25 bg-amber-400/10 text-amber-300' : 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300'}`}>
      {tone === 'error' && <AlertTriangle size={18} />}
      {text}
    </div>
  );
}

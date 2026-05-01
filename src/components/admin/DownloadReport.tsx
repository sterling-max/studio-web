import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { AlertTriangle, BarChart3, Copy, Download, Globe2, KeyRound, RefreshCw, RotateCcw, Search, ShieldOff } from 'lucide-react';

type DownloadTotal = {
  product_id: string;
  version: string;
  channel: string;
  downloads: number;
  unique_networks: number;
  bytes: number;
};

type DailyDownload = {
  day: string;
  product_id: string;
  version: string;
  channel: string;
  downloads: number;
};

type CountryDownload = {
  country: string;
  product_id: string;
  downloads: number;
};

type RecentDownload = {
  product_id: string;
  version: string;
  channel: string;
  file_alias: string;
  artifact_name: string;
  country?: string | null;
  colo?: string | null;
  downloaded_at: number;
};

type DownloadReportPayload = {
  success: true;
  range: { days: number; since: number };
  product: string | null;
  totals: DownloadTotal[];
  daily: DailyDownload[];
  countries: CountryDownload[];
  recent: RecentDownload[];
};

type LicenseRow = {
  key: string;
  email: string;
  product_id: string;
  order_id?: string | null;
  transaction_id?: string | null;
  founder_status?: number | null;
  status?: string | null;
  created_at: number;
  refunded_at?: number | null;
  disputed_at?: number | null;
  revoked_at?: number | null;
  revocation_reason?: string | null;
  active_activations: number;
};

export const DownloadReport = () => {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<DownloadReportPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const totalDownloads = useMemo(
    () => data?.totals.reduce((sum, row) => sum + Number(row.downloads || 0), 0) || 0,
    [data]
  );

  const uniqueNetworks = useMemo(
    () => data?.totals.reduce((sum, row) => sum + Number(row.unique_networks || 0), 0) || 0,
    [data]
  );

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/downloads?days=${days}`, {
        headers: { Accept: 'application/json' }
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.message || `Report request failed (${response.status})`);
      }

      setData(payload);
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : 'Could not load the download report.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [days]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-32">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
        <div>
          <div className="flex items-center gap-3 text-sterling-blue mb-4">
            <BarChart3 size={22} />
            <span className="text-xs font-bold uppercase tracking-[0.25em]">Admin Report</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4">Download Analytics</h1>
          <p className="text-sterling-mist/60 max-w-2xl">
            Server-side download counts grouped by product, version, channel, day, and region.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
            className="bg-sterling-surface border border-sterling-mist/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sterling-blue/60"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last year</option>
          </select>
          <button
            onClick={load}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-sterling-blue px-4 py-3 text-sm font-bold text-white transition-all hover:bg-sterling-blue/90 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-10 flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5 text-amber-100">
          <AlertTriangle size={20} className="mt-0.5 shrink-0" />
          <div>
            <div className="font-bold">Report unavailable</div>
            <p className="text-sm text-amber-100/75">{error}</p>
          </div>
        </div>
      )}

      <LicenseReport />

      <div className="grid gap-4 md:grid-cols-3 mb-10">
        <Metric label="Downloads" value={totalDownloads.toLocaleString()} icon={<Download size={20} />} />
        <Metric label="Unique Networks" value={uniqueNetworks.toLocaleString()} icon={<Globe2 size={20} />} />
        <Metric label="Products" value={(data?.totals.length || 0).toLocaleString()} icon={<BarChart3 size={20} />} />
      </div>

      <ReportTable
        title="Product Totals"
        columns={['Product', 'Version', 'Channel', 'Downloads', 'Unique Networks', 'Transfer']}
        rows={(data?.totals || []).map((row) => [
          productLabel(row.product_id),
          row.version,
          row.channel,
          Number(row.downloads || 0).toLocaleString(),
          Number(row.unique_networks || 0).toLocaleString(),
          formatBytes(Number(row.bytes || 0))
        ])}
      />

      <ReportTable
        title="Daily Breakdown"
        columns={['Day', 'Product', 'Version', 'Channel', 'Downloads']}
        rows={(data?.daily || []).slice(0, 80).map((row) => [
          row.day,
          productLabel(row.product_id),
          row.version,
          row.channel,
          Number(row.downloads || 0).toLocaleString()
        ])}
      />

      <ReportTable
        title="Countries"
        columns={['Country', 'Product', 'Downloads']}
        rows={(data?.countries || []).slice(0, 50).map((row) => [
          row.country,
          productLabel(row.product_id),
          Number(row.downloads || 0).toLocaleString()
        ])}
      />

      <ReportTable
        title="Recent Events"
        columns={['Time', 'Product', 'Version', 'Channel', 'File', 'Edge']}
        rows={(data?.recent || []).map((row) => [
          new Date(row.downloaded_at).toLocaleString(),
          productLabel(row.product_id),
          row.version,
          row.channel,
          row.file_alias || row.artifact_name,
          [row.country, row.colo].filter(Boolean).join(' / ') || 'Unknown'
        ])}
      />
    </div>
  );
};

const LicenseReport = () => {
  const [licenses, setLicenses] = useState<LicenseRow[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionKey, setActionKey] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      params.set('limit', '200');

      const response = await fetch(`/api/admin/licenses?${params}`, {
        headers: { Accept: 'application/json' }
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.message || `License report failed (${response.status})`);
      }

      setLicenses(payload.licenses || []);
    } catch (err) {
      setLicenses([]);
      setError(err instanceof Error ? err.message : 'Could not load licenses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateLicense = async (license: LicenseRow, action: 'revoke' | 'restore') => {
    const label = action === 'revoke' ? 'revoke' : 'restore';
    const reason = action === 'revoke'
      ? window.prompt('Revocation reason', 'Manually revoked by administrator.')
      : null;

    if (action === 'revoke' && reason === null) return;
    if (!window.confirm(`Confirm ${label} for ${license.email}?`)) return;

    setActionKey(license.key);
    try {
      const response = await fetch('/api/admin/licenses', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          key: license.key,
          action,
          reason
        })
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.message || `License ${label} failed (${response.status})`);
      }

      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Could not ${label} the license.`);
    } finally {
      setActionKey(null);
    }
  };

  return (
    <section className="mb-10">
      <div className="flex flex-col gap-8">
        <ManualLicenseGenerator onGenerated={load} />

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <div className="flex items-center gap-3 text-sterling-blue mb-3">
              <KeyRound size={20} />
              <h2 className="text-xl font-bold text-white">License Report</h2>
            </div>
            <p className="text-sm text-sterling-mist/55">
              Review granted licenses, active devices, source order ids, and revocation state.
            </p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              load();
            }}
            className="grid gap-3 md:grid-cols-[1fr_auto]"
          >
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-sterling-mist/30" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Email, key, product, status"
                className="min-w-[280px] rounded-xl border border-sterling-mist/10 bg-sterling-midnight/70 py-3 pl-11 pr-4 text-sm text-white placeholder:text-sterling-mist/25 focus:outline-none focus:border-sterling-blue/60"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sterling-blue px-4 py-3 text-sm font-bold text-white transition-all hover:bg-sterling-blue/90 disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Load
            </button>
          </form>
        </div>

        {error && (
          <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-2xl border border-sterling-mist/10">
          <table className="w-full min-w-[1080px] text-left text-sm">
            <thead className="bg-sterling-midnight/60 text-xs uppercase tracking-[0.16em] text-sterling-mist/35">
              <tr>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Key</th>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Devices</th>
                <th className="px-5 py-3">Source</th>
                <th className="px-5 py-3">Created</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {licenses.length > 0 ? licenses.map((license) => {
                const status = license.status || 'active';
                const isActive = status === 'active';

                return (
                  <tr key={license.key} className="border-t border-sterling-mist/5 odd:bg-white/[0.015]">
                    <td className="px-5 py-4 text-sterling-mist/85">{license.email}</td>
                    <td className="px-5 py-4">
                      <code className="text-xs font-bold text-sterling-blue">{license.key}</code>
                      {license.founder_status ? (
                        <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300">Founder</div>
                      ) : null}
                    </td>
                    <td className="px-5 py-4 text-sterling-mist/65">{license.product_id}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${
                        isActive
                          ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
                          : 'border-red-400/20 bg-red-400/10 text-red-200'
                      }`}>
                        {status}
                      </span>
                      {license.revocation_reason ? (
                        <div className="mt-2 max-w-[220px] text-xs text-sterling-mist/35">{license.revocation_reason}</div>
                      ) : null}
                    </td>
                    <td className="px-5 py-4 text-sterling-mist/65">{Number(license.active_activations || 0)}/3</td>
                    <td className="px-5 py-4 text-xs text-sterling-mist/45">
                      <div>{license.order_id || '-'}</div>
                      <div>{license.transaction_id || '-'}</div>
                    </td>
                    <td className="px-5 py-4 text-sterling-mist/65">{new Date(license.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      {isActive ? (
                        <button
                          onClick={() => updateLicense(license, 'revoke')}
                          disabled={actionKey === license.key}
                          className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 px-3 py-2 text-xs font-bold text-red-200 transition-colors hover:bg-red-400/10 disabled:opacity-50"
                        >
                          <ShieldOff size={14} />
                          Revoke
                        </button>
                      ) : (
                        <button
                          onClick={() => updateLicense(license, 'restore')}
                          disabled={actionKey === license.key}
                          className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 px-3 py-2 text-xs font-bold text-emerald-200 transition-colors hover:bg-emerald-400/10 disabled:opacity-50"
                        >
                          <RotateCcw size={14} />
                          Restore
                        </button>
                      )}
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-sterling-mist/35">
                    No licenses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const ManualLicenseGenerator = ({ onGenerated }: { onGenerated?: () => void | Promise<void> }) => {
  const [email, setEmail] = useState('');
  const [founder, setFounder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ key: string; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/admin/licenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          email,
          product_id: 'mc_pro',
          founder_status: founder
        })
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.message || `License request failed (${response.status})`);
      }

      setResult({
        key: payload.license.key,
        email: payload.license.email
      });
      setEmail('');
      setFounder(false);
      await onGenerated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not generate the license.');
    } finally {
      setLoading(false);
    }
  };

  const copyKey = async () => {
    if (!result?.key) return;
    await navigator.clipboard.writeText(result.key);
  };

  return (
    <div className="rounded-2xl border border-sterling-blue/15 bg-sterling-blue/5 p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 text-sterling-blue mb-3">
            <KeyRound size={20} />
            <h2 className="text-xl font-bold text-white">Manual License</h2>
          </div>
          <p className="text-sm text-sterling-mist/55">
            Generate an active Max Commander Pro license for a customer or tester email.
          </p>
        </div>

        <form onSubmit={generate} className="w-full lg:max-w-xl">
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="customer@email.com"
              className="min-w-0 rounded-xl border border-sterling-mist/10 bg-sterling-midnight/70 px-4 py-3 text-sm text-white placeholder:text-sterling-mist/25 focus:outline-none focus:border-sterling-blue/60"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sterling-blue px-5 py-3 text-sm font-bold text-white transition-all hover:bg-sterling-blue/90 disabled:opacity-50"
            >
              <KeyRound size={16} />
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
          <label className="mt-3 flex items-center gap-3 text-sm text-sterling-mist/60">
            <input
              type="checkbox"
              checked={founder}
              onChange={(event) => setFounder(event.target.checked)}
              className="h-4 w-4 accent-sterling-blue"
            />
            Founder license
          </label>
        </form>
      </div>

      {error && (
        <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-5 flex flex-col gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-emerald-200/60">Generated for {result.email}</div>
            <code className="mt-1 block text-lg font-bold text-emerald-100">{result.key}</code>
          </div>
          <button
            onClick={copyKey}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300/20 px-4 py-2 text-sm font-bold text-emerald-100 transition-colors hover:bg-emerald-300/10"
          >
            <Copy size={16} />
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

const Metric = ({ label, value, icon }: { label: string; value: string; icon: ReactNode }) => (
  <div className="rounded-2xl border border-sterling-mist/10 bg-sterling-surface/40 p-6">
    <div className="flex items-center justify-between text-sterling-mist/40 mb-5">
      <span className="text-xs font-bold uppercase tracking-[0.22em]">{label}</span>
      {icon}
    </div>
    <div className="text-4xl font-bold text-white">{value}</div>
  </div>
);

const ReportTable = ({ title, columns, rows }: { title: string; columns: string[]; rows: string[][] }) => (
  <section className="mb-10 overflow-hidden rounded-2xl border border-sterling-mist/10 bg-sterling-surface/30">
    <div className="flex items-center justify-between border-b border-sterling-mist/10 px-5 py-4">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <span className="text-xs text-sterling-mist/40">{rows.length.toLocaleString()} rows</span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-sterling-midnight/60 text-xs uppercase tracking-[0.16em] text-sterling-mist/35">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-5 py-3 font-bold">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? rows.map((row, index) => (
            <tr key={`${title}-${index}`} className="border-t border-sterling-mist/5 odd:bg-white/[0.015]">
              {row.map((cell, cellIndex) => (
                <td key={`${title}-${index}-${cellIndex}`} className="px-5 py-3 text-sterling-mist/75">
                  {cell}
                </td>
              ))}
            </tr>
          )) : (
            <tr>
              <td colSpan={columns.length} className="px-5 py-10 text-center text-sterling-mist/35">
                No download data for this range.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </section>
);

function productLabel(productId: string): string {
  if (productId === 'max_commander') return 'Max Commander';
  return productId;
}

function formatBytes(bytes: number): string {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const power = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** power).toFixed(power === 0 ? 0 : 1)} ${units[power]}`;
}

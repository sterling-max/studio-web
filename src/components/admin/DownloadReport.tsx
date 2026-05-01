import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { AlertTriangle, BarChart3, Download, Globe2, RefreshCw } from 'lucide-react';

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

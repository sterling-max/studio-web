import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Plug } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fallbackMaxCommanderPlugins, type PluginCatalogItem } from '../../data/pluginCatalog';

export const MaxCommanderPlugins = () => {
  const navigate = useNavigate();
  const [plugins, setPlugins] = useState<PluginCatalogItem[]>(fallbackMaxCommanderPlugins);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch('/api/plugins?product_id=max-commander', { headers: { Accept: 'application/json' } })
      .then(response => response.ok ? response.json() : null)
      .then(payload => {
        if (alive && payload?.plugins?.length) setPlugins(payload.plugins);
      })
      .catch(() => undefined)
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => { alive = false; };
  }, []);

  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto min-h-screen">
      <button
        onClick={() => navigate('/products/max-commander')}
        className="group mb-12 flex items-center gap-2 text-sterling-mist/60 hover:text-sterling-blue transition-colors"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Max Commander</span>
      </button>

      <motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
          Max Commander <span className="text-sterling-blue">Plugins</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-sterling-mist/65 leading-relaxed">
          Curated extensions for media libraries, tools, and virtual file systems. Downloads are free for now; <span className="text-sterling-blue font-bold">plugin use requires Max Commander Pro.</span>
        </p>
      </motion.header>

      <div className="grid gap-5 md:grid-cols-2">
        {plugins.map((plugin, index) => (
          <motion.article
            key={plugin.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group rounded-[2rem] border border-sterling-mist/10 bg-sterling-deep p-6 transition-all hover:border-sterling-blue/35 hover:shadow-[0_24px_50px_rgba(0,0,0,0.35)]"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sterling-blue/10 text-sterling-blue group-hover:bg-sterling-blue group-hover:text-white transition-all">
                  <Plug size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-sterling-mist">{plugin.name}</h2>
                  <p className="text-xs font-mono text-sterling-mist/45">v{plugin.version} · MC {plugin.min_app_version}+</p>
                </div>
              </div>
              {plugin.pro_only && (
                <span className="rounded-full border border-sterling-blue/25 bg-sterling-blue/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-sterling-blue">
                  Pro
                </span>
              )}
            </div>

            <p className="mb-5 text-sm leading-relaxed text-sterling-mist/60">{plugin.description}</p>

            <div className="mb-5 flex flex-wrap gap-2">
              {plugin.permissions.map(permission => (
                <span key={permission} className="rounded-md bg-sterling-mist/5 px-2 py-1 text-[10px] font-mono text-sterling-mist/45">
                  {permission}
                </span>
              ))}
            </div>

            {plugin.changelog && <p className="mb-5 text-xs italic text-sterling-mist/40">{plugin.changelog}</p>}

            <a
              href={plugin.download_url || `/api/plugins/download/${plugin.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-sterling-blue px-4 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(0,122,255,0.25)] transition-all hover:scale-[1.02]"
            >
              <Download size={16} />
              Download .mcx
            </a>
          </motion.article>
        ))}
      </div>

      {!loading && plugins.length === 0 && (
        <div className="rounded-2xl border border-sterling-mist/10 bg-sterling-deep p-8 text-center text-sterling-mist/60">
          No official plugins are currently published.
        </div>
      )}
    </div>
  );
};

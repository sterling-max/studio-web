import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bug, CheckCircle2, Lightbulb, LifeBuoy, MessageSquare, Send } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '../utils/cn';

const products = [
  { id: '', label: 'General / Sterling Lab' },
  { id: 'max-commander', label: 'Max Commander' },
  { id: 'dash', label: 'Dash' },
  { id: 'zap-studio', label: 'Zap Studio' },
  { id: 'easy-monitor', label: 'Easy Monitor' },
  { id: 'tales-universe', label: 'Tales Universe' }
];

const feedbackTypes = [
  { id: 'bug', label: 'Bug', icon: Bug },
  { id: 'suggestion', label: 'Suggestion', icon: MessageSquare },
  { id: 'feature', label: 'Feature Request', icon: Lightbulb },
  { id: 'support', label: 'Support', icon: LifeBuoy }
];

const turnstileSiteKey = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) || '0x4AAAAAADKFo5qBhHotewbL';

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void; 'error-callback': () => void }) => string;
      reset: (widgetId: string) => void;
    };
  }
}

export const SupportPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [productId, setProductId] = useState(params.get('product') || '');
  const [type, setType] = useState('bug');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [contactAllowed, setContactAllowed] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileReady, setTurnstileReady] = useState(!turnstileSiteKey);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current || widgetIdRef.current) return;

    const renderWidget = () => {
      if (!window.turnstile || !turnstileRef.current || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token: string) => {
          setTurnstileToken(token);
          setTurnstileReady(true);
        },
        'expired-callback': () => {
          setTurnstileToken('');
          setTurnstileReady(false);
        },
        'error-callback': () => {
          setTurnstileToken('');
          setTurnstileReady(false);
        }
      });
    };

    if (!window.turnstile) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    } else {
      renderWidget();
    }
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setReferenceId(null);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          product_id: productId || null,
          source: 'website',
          type,
          title,
          message,
          email,
          contact_allowed: contactAllowed,
          company_website: companyWebsite,
          turnstile_token: turnstileToken
        })
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.message || `Feedback failed (${response.status})`);
      setReferenceId(payload.id);
      setTitle('');
      setMessage('');
      setEmail('');
      setContactAllowed(false);
      setTurnstileToken('');
      setTurnstileReady(!turnstileSiteKey);
      if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto min-h-screen">
      <button
        onClick={() => navigate('/')}
        className="group mb-12 flex items-center gap-2 text-sterling-mist/60 hover:text-sterling-blue transition-colors"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Sterling Lab</span>
      </button>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <section className="mb-8 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
            Support <span className="text-sterling-blue">Desk</span>
          </h1>
          <p className="text-lg text-sterling-mist/65 leading-relaxed">
            Send bug reports, feature requests, suggestions, and product support notes directly to Sterling Lab.
          </p>
        </section>

        <form onSubmit={submit} className="rounded-[2rem] border border-sterling-mist/10 bg-sterling-deep p-6 md:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-sterling-blue">Product</span>
              <select value={productId} onChange={(event) => setProductId(event.target.value)} className="rounded-xl border border-sterling-mist/10 bg-sterling-surface px-4 py-3 text-sterling-mist outline-none focus:border-sterling-blue/70">
                {products.map(product => <option key={product.id} value={product.id}>{product.label}</option>)}
              </select>
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {feedbackTypes.map(option => {
                const Icon = option.icon;
                return (
                  <button
                    type="button"
                    key={option.id}
                    onClick={() => setType(option.id)}
                    className={cn(
                      'flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-bold transition-all',
                      type === option.id
                        ? 'border-sterling-blue bg-sterling-blue text-white shadow-[0_0_20px_rgba(0,122,255,0.25)]'
                        : 'border-sterling-mist/10 bg-sterling-surface text-sterling-mist/70 hover:text-sterling-mist hover:border-sterling-blue/40'
                    )}
                  >
                    <Icon size={16} />
                    {option.label}
                  </button>
                );
              })}
            </div>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-sterling-blue">Title</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} required minLength={3} maxLength={160} className="rounded-xl border border-sterling-mist/10 bg-sterling-surface px-4 py-3 text-sterling-mist outline-none focus:border-sterling-blue/70" placeholder="Short summary" />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-sterling-blue">Details</span>
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} required minLength={10} rows={8} className="resize-none rounded-xl border border-sterling-mist/10 bg-sterling-surface px-4 py-3 text-sterling-mist outline-none focus:border-sterling-blue/70" placeholder="What happened, what you expected, or what you want improved." />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-sterling-blue">Email Optional</span>
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="rounded-xl border border-sterling-mist/10 bg-sterling-surface px-4 py-3 text-sterling-mist outline-none focus:border-sterling-blue/70" placeholder="you@example.com" />
            </label>

            <label className="flex items-center gap-3 text-sm text-sterling-mist/65">
              <input type="checkbox" checked={contactAllowed} onChange={(event) => setContactAllowed(event.target.checked)} className="h-4 w-4 accent-sterling-blue" />
              Sterling Lab may contact me about this submission.
            </label>

            <label className="hidden" aria-hidden="true">
              Company website
              <input tabIndex={-1} autoComplete="off" value={companyWebsite} onChange={(event) => setCompanyWebsite(event.target.value)} />
            </label>

            {turnstileSiteKey ? (
              <div ref={turnstileRef} className="min-h-[65px]" />
            ) : (
              <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-300">
                Feedback protection is not configured for this build.
              </div>
            )}

            {error && <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
            {referenceId && (
              <div className="flex items-center gap-3 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                <CheckCircle2 size={18} />
                Feedback received. Reference: <span className="font-mono">{referenceId}</span>
              </div>
            )}

            <button disabled={submitting || !turnstileReady} className="inline-flex items-center justify-center gap-2 rounded-xl bg-sterling-blue px-6 py-3 font-bold text-white shadow-[0_0_24px_rgba(0,122,255,0.28)] transition-all hover:scale-[1.01] disabled:opacity-60">
              <Send size={18} />
              {submitting ? 'Sending...' : 'Send Feedback'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, Mail, Smartphone, LogOut, AlertCircle } from 'lucide-react';

export const ManageLicense = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'linking' | 'sent' | 'dashboard'>('idle');
  const [licenses, setLicenses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Magic Link token check
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      verifyAndLoad(token);
    }
  }, []);

  const verifyAndLoad = async (token: string) => {
    setStatus('linking');
    try {
      const res = await fetch(`/api/manage?token=${token}`);
      if (!res.ok) throw new Error('Failed to load licenses');
      
      const data = await res.json();
      setLicenses(data.licenses);
      setEmail(data.email);
      setStatus('dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid or expired login link.');
      setStatus('idle');
    }
  };

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('linking');
    try {
      const res = await fetch('/api/send-magic-link', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }) 
      });
      const data = await res.json();
      // For developer testing, we log the link to the console if it's returned
      if (data.link) console.log('DEBUG: Magic Link:', data.link);
      setStatus('sent');
    } catch (err: any) {
      setError('Failed to send link. Please try again.');
      setStatus('idle');
    }
  };

  if (status === 'sent') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-sterling-blue/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Mail className="text-sterling-blue text-4xl" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Check your email</h2>
          <p className="text-sterling-mist/60">
            We've sent a magic login link to <span className="text-white font-medium">{email}</span>. 
            Click the link to manage your devices.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'dashboard') {
    return (
      <div className="max-w-4xl mx-auto py-32 px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">License Portal</h2>
            <p className="text-sterling-mist/60 text-lg">Manage your devices and products.</p>
          </div>
          <button className="flex items-center gap-2 text-sterling-mist/40 hover:text-white transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        <div className="grid gap-8">
          {licenses.map((license) => (
            <div key={license.key} className="bg-sterling-surface/50 border border-sterling-blue/10 rounded-[2rem] p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sterling-blue text-white rounded-xl flex items-center justify-center shadow-lg shadow-sterling-blue/20">
                      <Key size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{license.product_name}</h3>
                    <code className="text-xs text-sterling-blue">{license.key}</code>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-4">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-sterling-mist/30">
                   Active Devices ({license.activations.length}/3)
                 </h4>
                 
                 {license.activations.map((activation: any) => (
                   <div key={activation.id} className="flex items-center justify-between p-4 bg-sterling-midnight/50 rounded-2xl border border-sterling-mist/5">
                     <div className="flex items-center gap-4">
                       <Smartphone className="text-sterling-mist/40" />
                       <div>
                         <div className="text-sm font-bold">{activation.machine_name}</div>
                         <div className="text-[10px] text-sterling-mist/30 uppercase tracking-tighter">
                           Activated {Math.floor((Date.now() - activation.activated_at) / 86400000)} days ago
                         </div>
                       </div>
                     </div>
                     <button 
                       className="text-xs font-bold text-sterling-mist/40 hover:text-red-400 transition-colors disabled:opacity-50"
                       onClick={async () => {
                         const token = new URLSearchParams(window.location.search).get('token');
                         if (!confirm('Deactivate this device?')) return;
                         
                         const res = await fetch(`/api/manage?token=${token}&id=${activation.id}`, { method: 'DELETE' });
                         if (res.ok) {
                            // Refresh data
                            verifyAndLoad(token!);
                         }
                       }}
                     >
                       Deactivate
                     </button>
                   </div>
                 ))}
              </div>
            </div>
          ))}
          {licenses.length === 0 && (
            <div className="text-center py-20 bg-sterling-surface/30 rounded-[2rem] border border-dashed border-sterling-mist/10">
              <p className="text-sterling-mist/40 italic">No active licenses found for this account.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-sterling-blue/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner shadow-sterling-blue/30">
          <Key className="text-sterling-blue text-4xl" />
        </div>
        <h2 className="text-4xl font-bold mb-4">Manage Licenses</h2>
        <p className="text-sterling-mist/60 mb-10">
          Enter the email you used for purchase to receive a magic login link.
        </p>

        {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3">
                <AlertCircle size={18} /> {error}
            </div>
        )}

        <form onSubmit={handleSendLink} className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-sterling-mist/30 group-focus-within:text-sterling-blue transition-colors" />
            <input 
              type="email" 
              placeholder="your@email.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-sterling-surface border border-sterling-mist/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-sterling-blue/50 transition-all text-white placeholder:text-sterling-mist/20"
            />
          </div>
          <button 
            type="submit"
            disabled={status === 'linking'}
            className="w-full py-4 bg-sterling-blue hover:bg-sterling-blue/90 disabled:opacity-50 text-white rounded-2xl font-bold transition-all shadow-lg shadow-sterling-blue/20"
          >
            {status === 'linking' ? 'Generating Link...' : 'Send Magic Link'}
          </button>
        </form>

        <p className="mt-8 text-xs text-sterling-mist/30">
          By logging in, you can manage activated devices and recover lost license keys.
        </p>
      </motion.div>
    </div>
  );
};

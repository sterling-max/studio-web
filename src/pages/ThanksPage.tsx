import { CheckCircle2, Inbox } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ThanksPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] flex items-center justify-center pt-16 px-4">
      <div className="max-w-md w-full mx-auto p-6 text-center rounded-3xl bg-gradient-to-b from-sterling-deep to-sterling-midnight border border-emerald-500/20 relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.05)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-emerald-500/10 blur-[60px] rounded-full" />
        
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-3">
          <CheckCircle2 size={24} />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Thank you for your purchase!</h1>
        <p className="text-sterling-mist/60 text-sm mb-5 leading-relaxed">
          Your payment was successful. We are generating your Max Commander Pro license right now.
        </p>

        <div className="bg-sterling-surface/50 border border-sterling-mist/10 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-bold text-sterling-mist text-sm mb-2 flex items-center gap-2">
            <Inbox size={14} className="text-sterling-blue" /> 
            What happens next?
          </h3>
          <ul className="space-y-2 text-[13px] text-sterling-mist/70 leading-relaxed">
            <li><strong className="text-sterling-mist">1. Check your email.</strong> We've just sent your license key to the email address you provided during checkout.</li>
            <li><strong className="text-sterling-mist">2. Download the app.</strong> If you haven't already, download the free version of Max Commander from our website.</li>
            <li><strong className="text-sterling-mist">3. Activate.</strong> Open Max Commander, navigate to Settings &gt; License, and paste your key.</li>
          </ul>
        </div>

        <button
          onClick={() => navigate('/products/max-commander')}
          className="inline-block px-6 py-2.5 bg-sterling-blue text-white text-sm rounded-lg font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,122,255,0.3)] cursor-pointer"
        >
          Return to Max Commander
        </button>
      </div>
    </div>
  );
};

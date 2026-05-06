import { useState } from 'react';
import { Search, Shield, Layout, Eye, GitBranch, Archive, Cloud, Puzzle, Clapperboard, History, MessageSquare, Plug } from 'lucide-react';
import { ProductLayout } from './ProductLayout';
import { type PricingPlan } from './Pricing';
import { STRIPE_PRICE_FOUNDER, STRIPE_PRICE_STANDARD } from '../../constants/checkout';
import { ChangelogModal } from './ChangelogModal';
import { SmartScreenGuide } from './SmartScreenGuide';
import { changelogData } from '../../data/max-commander-changelog';

interface MaxCommanderProps {
  onBack: () => void;
  onViewPrivacy: () => void;
}

export const MaxCommander = ({ onBack, onViewPrivacy }: MaxCommanderProps) => {
  const openSupport = () => {
    window.location.href = '/support?product=max-commander';
  };

  const openPlugins = () => {
    window.location.href = '/products/max-commander/plugins';
  };

  const steps = [
    {
      id: 1,
      title: "Orthodox Navigation",
      description: "Dual-pane efficiency with classic shortcuts (F5 Copy, F6 Move). Built for keyboard warriors.",
      icon: Layout,
      image: "/assets/max-commander/1.png"
    },
    {
      id: 2,
      title: "Space Analyzer",
      description: "Visualize disk usage with a responsive treemap. Flatten directories and clean up fast.",
      icon: Search,
      image: "/assets/max-commander/2.png"
    },
    {
      id: 3,
      title: "Smart Profiles",
      description: "Isolated Work/Personal workspaces with Path Firewalls to prevent accidental leaks.",
      icon: Shield,
      image: "/assets/max-commander/3.png"
    },
    {
      id: 4,
      title: "Quick Viewer",
      description: "Preview Markdown, Images, Videos, and Code with syntax highlighting instantly (F3).",
      icon: Eye,
      image: "/assets/max-commander/4.jpg"
    },
    {
      id: 5,
      title: "Git Command Center",
      description: "Full-scale Git integration. Visualize branching, track changes with precision markers, and leverage AI context detection.",
      icon: GitBranch,
      image: "/assets/max-commander/5.png"
    },
    {
      id: 6,
      title: "Universal Archives",
      description: "Treat Zip, Zip64, and 7Zip as native folders. Use 'Flat View' to pierce through nested archives effortlessly.",
      icon: Archive,
      image: "/assets/max-commander/6.png"
    },
    {
      id: 7,
      title: "Cloud Hybrid",
      description: "Seamlessly integrate cloud storage. Intelligent hydration warnings prevent accidental data avalanches.",
      icon: Cloud,
      image: "/assets/max-commander/7.png"
    },
    {
      id: 8,
      title: "Infinite Extensibility",
      description: "Limitless extensibility with isolated JavaScript plugins. Build secure, custom filesystem drivers in minutes.",
      icon: Puzzle,
      image: "/assets/max-commander/8.png"
    },
    {
      id: 9,
      title: "Media Streaming",
      description: "Jellyfin Plugin Example: Mount your media server as a local drive. Stream directly from your file manager.",
      icon: Clapperboard,
      image: "/assets/max-commander/9.jpg"
    }
  ];

  const plans: PricingPlan[] = [
    {
      price: "Free",
      type: "Personal Use",
      features: [
        "Full Dual-Pane File Manager",
        "TC-Style Keybindings (Configurable)",
        "FTP / SFTP Remote Connections",
        "Archive Support (ZIP, 7z, JAR)",
        "Multi-Rename (Shift+F6)",
        "Git Status & Branch Pills",
        "Cloud Hybrid & Sterling Blitz",
        "Quick Viewer (F3)"
      ],
      badge: "Free Forever",
      highlight: false,
      isFree: true
    },
    {
      price: "€15",
      type: "Founder's Edition",
      features: [
        "Everything in Free",
        "Space Analyzer (Treemap)",
        "Profiles & Workspaces (Path Firewall)",
        "Plugin System (Jellyfin & more)",
        "Git history & diff details",
        "Lifetime Updates",
        "Priority Feature Requests"
      ],
      badge: "Limited Time",
      highlight: true,
      priceId: STRIPE_PRICE_FOUNDER
    },
    {
      price: "€25",
      type: "Standard License",
      features: [
        "Everything in Free",
        "Space Analyzer (Treemap)",
        "Profiles & Workspaces (Path Firewall)",
        "Plugin System (Jellyfin & more)",
        "Git history & diff details",
        "Lifetime Updates",
        "Standard Support"
      ],
      badge: "Available Later",
      highlight: false,
      priceId: STRIPE_PRICE_STANDARD,
      comingSoon: true
    }
  ];

  const [showChangelog, setShowChangelog] = useState(false);
  const latestVersion = changelogData[0];

  const PromoSection = (
    <div className="flex flex-col items-center lg:items-start gap-3 animate-fade-in-up">
      <div className="flex items-center gap-3 bg-sterling-surface/50 border border-sterling-mist/10 rounded-full px-5 py-1.5 hover:bg-sterling-surface transition-colors cursor-default group">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
        <span className="text-sm font-semibold text-sterling-mist group-hover:text-white transition-colors">
          <span className="text-sterling-blue">v{latestVersion.version}</span> Available Now
        </span>
        <span className="w-px h-4 bg-sterling-mist/10 mx-1" />
        <span className="text-xs text-sterling-mist/40 italic hidden sm:inline-block">
          {latestVersion.description}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowChangelog(true)}
          className="text-[10px] font-mono text-sterling-mist/40 hover:text-sterling-blue underline decoration-transparent hover:decoration-sterling-blue/50 underline-offset-4 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <History size={10} />
          Changelog
        </button>
        <button
          onClick={openPlugins}
          className="text-[10px] font-mono text-sterling-mist/40 hover:text-sterling-blue underline decoration-transparent hover:decoration-sterling-blue/50 underline-offset-4 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plug size={10} />
          Plugins
        </button>
        <button
          onClick={openSupport}
          className="text-[10px] font-mono text-sterling-mist/40 hover:text-sterling-blue underline decoration-transparent hover:decoration-sterling-blue/50 underline-offset-4 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <MessageSquare size={10} />
          Support
        </button>
        <button
          onClick={onViewPrivacy}
          className="text-[10px] font-mono text-sterling-mist/40 hover:text-sterling-blue underline decoration-transparent hover:decoration-sterling-blue/50 underline-offset-4 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Shield size={10} />
          Privacy
        </button>
      </div>
    </div>
  );

  const HeroActions = (
    <button
      onClick={openPlugins}
      className="px-8 py-3 rounded-xl font-bold text-sterling-midnight bg-[#03defe] shadow-[0_0_20px_rgba(3,222,254,0.28)] hover:scale-105 transition-transform cursor-pointer"
    >
      Get Plugins
    </button>
  );

  return (
    <>
      <ProductLayout
        title="Max"
        titleSuffix="Commander"
        tagline="The productivity powerhouse. A modern, dual-pane file manager designed for speed, precision, and keyboard mastery."
        icon="/assets/mc-logo.png"
        heroImage="/assets/max-commander/1.png"
        steps={steps}
        pricingPlans={plans}
        onBack={onBack}
        extraHeroContent={PromoSection}
        heroActions={HeroActions}
      />
      <SmartScreenGuide />
      <ChangelogModal
        isOpen={showChangelog}
        onClose={() => setShowChangelog(false)}
        data={changelogData}
      />
    </>
  );
};

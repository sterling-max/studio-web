import { Folder, Search, Shield, Terminal, Layout, Eye } from 'lucide-react';
import { ProductLayout } from './ProductLayout';
import { type PricingPlan } from './Pricing';

interface MaxCommanderProps {
  onBack: () => void;
}

export const MaxCommander = ({ onBack }: MaxCommanderProps) => {
  const steps = [
    {
      id: 1,
      title: "Orthodox Navigation",
      description: "Dual-pane efficiency with classic shortcuts (F5 Copy, F6 Move). Built for keyboard warriors.",
      icon: Layout,
      image: "/assets/max-commander.png"
    },
    {
      id: 2,
      title: "Space Analyzer",
      description: "Visualize disk usage with a responsive treemap. Flatten directories and clean up fast.",
      icon: Search,
      image: "/assets/max-commander.png"
    },
    {
      id: 3,
      title: "Smart Profiles",
      description: "Isolated Work/Personal workspaces with Path Firewalls to prevent accidental leaks.",
      icon: Shield,
      image: "/assets/max-commander.png"
    },
    {
      id: 4,
      title: "Quick Viewer",
      description: "Preview Markdown, Images, Videos, and Code with syntax highlighting instantly (F3).",
      icon: Eye,
      image: "/assets/max-commander.png"
    },
    {
      id: 5,
      title: "Integrated Terminal",
      description: "Dropdown PowerShell terminal that automatically syncs with your active panel path.",
      icon: Terminal,
      image: "/assets/max-commander.png"
    }
  ];

  const plans: PricingPlan[] = [
    {
      price: "$19",
      type: "Founder's Edition",
      features: ["Early Access", "Lifetime Updates", "Priority Feature Request", "Special 'Founder' Badge"],
      badge: "Limited Time",
      highlight: true
    },
    {
      price: "$39",
      type: "Standard License",
      features: ["Full Commercial License", "1 Year of Updates", "Standard Support", "Available in 3 Months"],
      badge: "Future Price",
      highlight: false
    }
  ];

  return (
    <ProductLayout
      title="Max"
      titleSuffix="Commander"
      tagline="The productivity powerhouse. A modern, dual-pane file manager designed for speed, precision, and keyboard mastery."
      icon={Folder}
      steps={steps}
      pricingPlans={plans}
      onBack={onBack}
    />
  );
};

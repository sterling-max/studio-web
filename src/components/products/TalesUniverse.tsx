import { Book, Wand2, Users, Coins } from 'lucide-react';
import { ProductLayout } from './ProductLayout';
import { type PricingPlan } from './Pricing';

interface TalesUniverseProps {
  onBack: () => void;
}

export const TalesUniverse = ({ onBack }: TalesUniverseProps) => {
  const steps = [
    {
      id: 1,
      title: "Magical Library",
      description: "A curated, child-safe collection of interactive fairy tales with vibrant illustrations.",
      icon: Book,
      image: "/assets/tales-universe.png"
    },
    {
      id: 2,
      title: "AI Imagination",
      description: "Generate alternative endings using AI tokens. Let children explore 'What if?' scenarios.",
      icon: Wand2,
      image: "/assets/tales-universe.png"
    },
    {
      id: 3,
      title: "Child Profiles",
      description: "Track reading progress and favorites for each child individually.",
      icon: Users,
      image: "/assets/tales-universe.png"
    },
    {
      id: 4,
      title: "Virtual Economy",
      description: "Earn or purchase coins to unlock new stories and AI features.",
      icon: Coins,
      image: "/assets/tales-universe.png"
    }
  ];

  const plans: PricingPlan[] = [
    {
      price: "$0.99",
      type: "Coin Starter Pack",
      features: ["5 Magical Coins", "Unlock 1 Story", "No Ads"],
      badge: "Starter",
      highlight: false
    },
    {
      price: "$17.99",
      type: "Mega Bundle",
      features: ["100 Magical Coins", "Unlock All Stories", "AI Priority", "Bonus Content"],
      badge: "Best Value",
      highlight: true
    }
  ];

  return (
    <ProductLayout
      title="Tales"
      titleSuffix="Universe"
      tagline="Where imagination comes to life. A magical, interactive library for the next generation of readers."
      icon={Book}
      steps={steps}
      pricingPlans={plans}
      onBack={onBack}
      isMobileFrame={true}
    />
  );
};

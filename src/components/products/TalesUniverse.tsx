import { Book, Wand2, Users, Coins } from 'lucide-react';
import { ProductLayout } from './ProductLayout';

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
      image: "/assets/tales-universe/01.jpg"
    },
    {
      id: 2,
      title: "Story Magic",
      description: "Unlock alternative endings with magical coins. Let children explore 'What if?' scenarios.",
      icon: Wand2,
      image: "/assets/tales-universe/02.jpg"
    },
    {
      id: 3,
      title: "Child Profiles",
      description: "Track reading progress and favorites for each child individually.",
      icon: Users,
      image: "/assets/tales-universe/03.jpg"
    },
    {
      id: 4,
      title: "Virtual Economy",
      description: "Earn or purchase coins to unlock new stories and special features.",
      icon: Coins,
      image: "/assets/tales-universe/04.jpg"
    }
  ];

  return (
    <ProductLayout
      title="Tales"
      titleSuffix="Universe"
      tagline="Where imagination comes to life. A magical, interactive library for the next generation of readers."
      icon={Book}
      steps={steps}
      onBack={onBack}
      isMobileFrame={true}
      extraHeroContent={
        <div className="flex flex-col items-center lg:items-start gap-4 animate-fade-in-up">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-3 px-6 py-3 bg-sterling-surface hover:bg-sterling-surface/80 border border-sterling-mist/10 rounded-2xl transition-all hover:scale-105 group"
          >
            <img src="/assets/google-play-badge.png" alt="Get it on Google Play" className="h-10 w-auto" />
          </a>
          <p className="text-xs text-sterling-mist/40 italic">Available on Google Play Store</p>
        </div>
      }
    />
  );
};

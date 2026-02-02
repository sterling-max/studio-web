import { Play, Music, Mic2, Tv, Wind } from 'lucide-react';
import { ProductLayout } from './ProductLayout';

interface DashProps {
  onBack: () => void;
}

export const Dash = ({ onBack }: DashProps) => {
  const steps = [
    {
      id: 1,
      title: "Immersive Audio",
      description: "A seamless music experience with gapless playback and rich metadata visualization.",
      icon: Music,
      image: "/assets/dash.png"
    },
    {
      id: 2,
      title: "Infinite Glide Lyrics",
      description: "60fps scrolling lyrics engine with sub-pixel interpolation for the ultimate karaoke mode.",
      icon: Mic2,
      image: "/assets/dash.png"
    },
    {
      id: 3,
      title: "Glassmorphic Design",
      description: "Native Windows 11 aesthetics with Mica/Acrylic effects and fluid animations.",
      icon: Wind,
      image: "/assets/dash.png"
    },
    {
      id: 4,
      title: "Universal Media",
      description: "Browse movies, shows, and music from your Jellyfin server in a unified, beautiful interface.",
      icon: Tv,
      image: "/assets/dash.png"
    }
  ];

  return (
    <ProductLayout
      title="Dash"
      tagline="Your media, reimagined. A premium, atmospheric client for Jellyfin focused on speed and visual immersion."
      icon={Play}
      steps={steps}
      onBack={onBack}
    />
  );
};

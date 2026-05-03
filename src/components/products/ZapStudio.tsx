import { FileText, Bot, UserPlus, Mic, MonitorPlay, Youtube } from 'lucide-react';
import { ProductLayout } from './ProductLayout';
import { type PricingPlan } from './Pricing';

interface ZapStudioProps {
  onBack: () => void;
}

export const ZapStudio = ({ onBack }: ZapStudioProps) => {
  const steps = [
    {
      id: 1,
      title: "Connect Your AI",
      description: "You provide the API keys (OpenAI, Anthropic, etc.) for TOTAL CONTROL. We don't lock you in.",
      icon: FileText,
      image: "/assets/zap-studio/1.png"
    },
    {
      id: 2,
      title: "Generate Content",
      description: "Auto-generate from a theme, or use the manual editor to craft scenes, emotions*, and voices. (*Emotions require ElevenLabs)",
      icon: Bot,
      image: "/assets/zap-studio/2.png"
    },
    {
      id: 3,
      title: "Add Characters",
      description: "Include your saved characters and assets to maintain consistency across videos.",
      icon: UserPlus,
      image: "/assets/zap-studio/3.jpg"
    },
    {
      id: 4,
      title: "Emotional Voiceover",
      description: "Generate voiceovers using Eleven Labs with audio tags support for true emotion.",
      icon: Mic,
      image: "/assets/zap-studio/4.png"
    },
    {
      id: 5,
      title: "Format Selection",
      description: "Generate video in 16:9 for YouTube or 9:16 for Shorts/TikTok.",
      icon: MonitorPlay,
      image: "/assets/zap-studio/5.png"
    },
    {
      id: 6,
      title: "Optional Upload",
      description: "Seamlessly publish to your connected YouTube channel, or keep your final video strictly local.",
      icon: Youtube,
      image: "/assets/zap-studio/6.png"
    }
  ];

  const plans: PricingPlan[] = [
    {
      price: "Free Trial",
      type: "7-Day Access",
      features: ["Full Features Access", "Watermark on Export", "Standard Support"],
      badge: "Try Risk-Free",
      highlight: false
    },
    {
      price: "€60",
      type: "Lifetime License",
      features: ["4K Export", "No Watermark", "Commercial Rights", "One-time Payment"],
      badge: "Best Value",
      highlight: true
    }
  ];

  return (
    <ProductLayout
      title="Zap"
      titleSuffix="Studio"
      tagline="Your personal AI video factory. Generate stories, voiceovers, and visuals locally with total API key control."
      icon="/assets/zap-logo.svg"
      steps={steps}
      pricingPlans={plans}
      onBack={onBack}
    />
  );
};
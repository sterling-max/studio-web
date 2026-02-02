import { Activity, Heart, FileText, Users } from 'lucide-react';
import { ProductLayout } from './ProductLayout';
import { type PricingPlan } from './Pricing';

interface EasyMonitorProps {
  onBack: () => void;
}

export const EasyMonitor = ({ onBack }: EasyMonitorProps) => {
  const steps = [
    {
      id: 1,
      title: "Tactile Input",
      description: "OMRON-style scroll wheels for entering readings. Designed for elderly users with large touch targets.",
      icon: Activity,
      image: "/assets/easy-monitor.png"
    },
    {
      id: 2,
      title: "Health Trends",
      description: "Interactive SVG charts that visualize blood pressure and heart rate over time.",
      icon: Heart,
      image: "/assets/easy-monitor.png"
    },
    {
      id: 3,
      title: "Doctor Reports",
      description: "Generate professional PDF reports with statistics and classification (AHA/WHO Guidelines).",
      icon: FileText,
      image: "/assets/easy-monitor.png"
    },
    {
      id: 4,
      title: "Family Connect",
      description: "Securely share health data with family members or caregivers via the cloud sync.",
      icon: Users,
      image: "/assets/easy-monitor.png"
    }
  ];

  const plans: PricingPlan[] = [
    {
      price: "Local",
      type: "Private Device Only",
      features: ["Unlimited Readings", "PDF Export", "Privacy Focused", "Offline Mode"],
      badge: "Free Forever",
      highlight: false
    },
    {
      price: "Cloud",
      type: "Monthly Subscription",
      features: ["Family Sharing", "Cloud Backup", "Multi-Device Sync", "Priority Support"],
      badge: "Coming Soon",
      highlight: true
    }
  ];

  return (
    <ProductLayout
      title="Easy"
      titleSuffix="Monitor"
      tagline="The care platform. An accessible, professional health tracker designed for clarity and peace of mind."
      icon={Activity}
      steps={steps}
      pricingPlans={plans}
      onBack={onBack}
    />
  );
};

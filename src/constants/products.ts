export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: string[];
  category: 'productivity' | 'multimedia' | 'health' | 'creative';
}

export const PRODUCTS: Product[] = [
  {
    id: 'max-commander',
    name: 'Max Commander',
    tagline: 'The Productivity Powerhouse',
    description: 'A modern, dual-pane orthodox file manager designed for speed and precision on Windows 11. Reimagining the legendary Total Commander workflow for the modern era.',
    features: ['Dual-pane navigation', 'Native Windows 11 Acrylic effects', 'Hyper-fast drive loading', 'Recursive branch view', 'Integrated Terminal & FTP'],
    techStack: ['Rust (Tauri)', 'React', 'TypeScript', 'Zustand'],
    category: 'productivity'
  },
  {
    id: 'dash',
    name: 'Dash',
    tagline: 'Immersive Media Experience',
    description: 'A premium, Windows 11-inspired Jellyfin client. Focuses on high-performance visuals and a flawlessly continuous music and video experience.',
    features: ['Infinite Glide Lyrics', 'Glassmorphic UI', 'Theme-aware backdrops', '60fps scrolling engine'],
    techStack: ['Tauri', 'React', 'TypeScript', 'Zustand', 'Framer Motion'],
    category: 'multimedia'
  },
  {
    id: 'zap-studio',
    name: 'Zap Studio',
    tagline: 'The Creative Engine',
    description: 'A local-first studio for generating children\'s story videos with AI. Combines story generation, voiceovers, and illustrations into a seamless pipeline.',
    features: ['AI Story Generation', 'Voice Narration (ElevenLabs)', 'AI Illustrations (DALL-E 3)', 'Automated Video Assembly'],
    techStack: ['Next.js', 'Claude AI', 'FFmpeg', 'SQLite'],
    category: 'creative'
  },
  {
    id: 'easy-monitor',
    name: 'EasyMonitor',
    tagline: 'The Care Platform',
    description: 'An elderly-friendly blood pressure and heart rate tracking application. Designed with accessibility and clarity at its core.',
    features: ['OMRON-style reading input', 'Interactive trend charts', 'Professional PDF reports', 'Trilingual support'],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Supabase'],
    category: 'health'
  },
  {
    id: 'tales-universe',
    name: 'Tales Universe',
    tagline: 'The Magic Library',
    description: 'A children-safe mobile library of interactive stories. Features AI-generated alternative endings and a vibrant fairy-tale aesthetic.',
    features: ['AI Alternative Endings', 'Curated story library', 'Interactive virtual coin system', 'Safe, engaging design'],
    techStack: ['Flutter', 'AI Integration', 'Local Storage'],
    category: 'creative'
  }
];

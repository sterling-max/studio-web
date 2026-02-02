import { type ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Box, Palette, Info, MessageSquare, Sun, Moon } from 'lucide-react';
import { cn } from '../utils/cn';

interface NavItemProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <motion.button
    whileHover={{ scale: 1.1, y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      "relative group flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300",
      isActive ? "bg-sterling-blue text-white shadow-[0_0_20px_rgba(0,122,255,0.4)]" : "text-sterling-mist/60 hover:text-sterling-mist hover:bg-sterling-surface"
    )}
  >
    {icon}
    <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-sterling-surface text-sterling-mist text-xs px-2 py-1 rounded-md border border-sterling-blue/20 whitespace-nowrap pointer-events-none">
      {label}
    </span>
    {isActive && (
      <motion.div
        layoutId="active-pill"
        className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"
      />
    )}
  </motion.button>
);

export const Navbar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const items = [
    { id: 'home', icon: <Home size={22} />, label: 'Home' },
    { id: 'products', icon: <Box size={22} />, label: 'Products' },
    { id: 'design', icon: <Palette size={22} />, label: 'Design' },
    { id: 'about', icon: <Info size={22} />, label: 'Lab' },
    { id: 'contact', icon: <MessageSquare size={22} />, label: 'Contact' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-2 p-2 bg-sterling-midnight/40 backdrop-blur-xl border border-sterling-mist/10 rounded-[2.5rem] shadow-2xl"
      >
        {items.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
        
        <div className="w-px h-8 bg-sterling-mist/10 mx-1" />

        <NavItem 
          icon={isDark ? <Moon size={22} /> : <Sun size={22} />}
          label={isDark ? "Dark Mode" : "Light Mode"}
          onClick={() => setIsDark(!isDark)}
        />
      </motion.nav>
    </div>
  );
};

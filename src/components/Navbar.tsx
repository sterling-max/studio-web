import { type ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Box, Palette, MessageSquare, Sun, Moon, Menu, X, Key, DollarSign } from 'lucide-react';
import { cn } from '../utils/cn';
import { Logo } from './Logo';

interface NavItemProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <motion.button
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={cn(
      "w-full flex items-center justify-between gap-4 px-6 py-4 rounded-xl transition-all duration-300 cursor-pointer",
      isActive ? "bg-sterling-blue text-white shadow-[0_0_15px_rgba(0,122,255,0.3)]" : "text-sterling-mist/70 hover:text-sterling-mist hover:bg-sterling-surface"
    )}
  >
    <div className="flex items-center gap-4">
      {icon}
      <span className="text-base font-semibold">{label}</span>
    </div>
    {isActive && <motion.div layoutId="activeNavIndicatorMobile" className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]" />}
  </motion.button>
);

const DesktopNavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      "relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer",
      isActive ? "bg-sterling-blue text-white shadow-[0_0_15px_rgba(0,122,255,0.4)]" : "text-sterling-mist/60 hover:text-sterling-mist hover:bg-sterling-surface"
    )}
  >
    {icon}
    <span className="text-sm font-semibold whitespace-nowrap">{label}</span>
  </motion.button>
);

export const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const items = [
    { path: '/',        icon: <Home size={22} />,        label: 'Home' },
    { path: '/#products', icon: <Box size={22} />,       label: 'Products' },
    { path: '/pricing',   icon: <DollarSign size={22} />, label: 'Pricing' },
    { path: '/design',    icon: <Palette size={22} />,     label: 'Design' },
    { path: '/contact',   icon: <MessageSquare size={22} />, label: 'Contact' },
    { path: '/manage',    icon: <Key size={22} />,         label: 'Log In' },
  ];

  const isActive = (itemPath: string) => {
    if (itemPath === '/') return pathname === '/';
    if (itemPath === '/#products') return pathname.startsWith('/products');
    return pathname === itemPath;
  };

  const handleNavClick = (itemPath: string) => {
    setIsOpen(false);
    if (itemPath === '/#products') {
      if (pathname === '/') {
        const el = document.getElementById('products');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById('products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      }
    } else {
      navigate(itemPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isGlass = hasScrolled || isOpen;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b",
        isGlass
          ? "bg-sterling-midnight/70 backdrop-blur-2xl border-sterling-mist/10 py-4 shadow-xl"
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative w-full">
        {/* Left: Logo */}
        <div
          className={cn(
            "flex items-center gap-3 cursor-pointer group transition-opacity duration-300",
            pathname === '/' && !hasScrolled ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          )}
          onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsOpen(false); }}
        >
          <Logo className="w-8 h-8 drop-shadow-[0_0_10px_rgba(0,122,255,0.4)] transition-transform group-hover:scale-110" />
          <div className="text-xl font-bold tracking-wide text-sterling-mist">Sterling <span className="text-sterling-blue">Lab</span></div>
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {items.map((item) => (
            <DesktopNavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.path)}
              onClick={() => handleNavClick(item.path)}
            />
          ))}
          <div className="w-px h-6 bg-sterling-mist/10 mx-2" />
          <DesktopNavItem
            icon={isDark ? <Moon size={20} /> : <Sun size={20} />}
            label={isDark ? "Dark" : "Light"}
            onClick={() => setIsDark(!isDark)}
          />
        </div>

        {/* Right: Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 bg-sterling-surface rounded-xl border border-sterling-mist/10 text-sterling-mist hover:border-sterling-blue transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-4 md:right-12 mt-2 w-[calc(100%-2rem)] md:w-80 bg-sterling-midnight/90 backdrop-blur-3xl border border-sterling-mist/10 rounded-2xl shadow-2xl overflow-hidden p-2 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <NavItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  isActive={isActive(item.path)}
                  onClick={() => handleNavClick(item.path)}
                />
              ))}

              <div className="h-px w-full bg-sterling-mist/10 my-2" />

              <NavItem
                icon={isDark ? <Moon size={22} /> : <Sun size={22} />}
                label={isDark ? "Light Theme" : "Dark Theme"}
                onClick={() => setIsDark(!isDark)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

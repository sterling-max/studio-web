import React from 'react';

interface LogoProps {
  className?: string;
}

// Using official SVG assets via CDN to ensure 100% brand accuracy and no deformation
const LogoImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className}
    style={{ filter: 'grayscale(1) brightness(1.5) opacity(0.6)' }}
    onMouseOver={(e) => {
      e.currentTarget.style.filter = 'grayscale(0) brightness(1) opacity(1)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.filter = 'grayscale(1) brightness(1.5) opacity(0.6)';
    }}
  />
);

export const StripeLogo = ({ className }: LogoProps) => (
  <LogoImage 
    src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
    alt="Stripe" 
    className={className} 
  />
);

export const VisaLogo = ({ className }: LogoProps) => (
  <LogoImage 
    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
    alt="Visa" 
    className={className} 
  />
);

export const MastercardLogo = ({ className }: LogoProps) => (
  <LogoImage 
    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
    alt="Mastercard" 
    className={className} 
  />
);

export const AmexLogo = ({ className }: LogoProps) => (
  <LogoImage 
    src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" 
    alt="Amex" 
    className={className} 
  />
);

export const ApplePayLogo = ({ className }: LogoProps) => (
  <LogoImage 
    src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" 
    alt="Apple Pay" 
    className={className} 
  />
);

export const GooglePayLogo = ({ className }: LogoProps) => (
  <LogoImage 
    src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" 
    alt="Google Pay" 
    className={className} 
  />
);

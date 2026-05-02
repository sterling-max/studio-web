import React from 'react';

interface LogoProps {
  className?: string;
}

// Full color brand logos with high visibility
const LogoImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className}
    style={{ transition: 'transform 0.3s ease' }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'scale(1.1)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
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
    src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" 
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

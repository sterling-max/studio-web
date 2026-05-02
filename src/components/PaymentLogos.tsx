import React from 'react';

interface LogoProps {
  className?: string;
}

// Full color brand logos with high visibility using stable vector CDN
const LogoImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className}
    style={{ transition: 'transform 0.3s ease', display: 'block' }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'scale(1.1)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
    }}
    onError={(e) => {
      // Fallback if CDN fails
      e.currentTarget.style.display = 'none';
    }}
  />
);

export const StripeLogo = ({ className }: LogoProps) => (
  <LogoImage 
    src="https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg" 
    alt="Stripe" 
    className={className} 
  />
);

export const VisaLogo = ({ className }: LogoProps) => (
  <LogoImage 
    src="https://www.vectorlogo.zone/logos/visa/visa-ar21.svg" 
    alt="Visa" 
    className={className} 
  />
);

export const MastercardLogo = ({ className }: LogoProps) => (
  <LogoImage 
    src="https://www.vectorlogo.zone/logos/mastercard/mastercard-ar21.svg" 
    alt="Mastercard" 
    className={className} 
  />
);

export const AmexLogo = ({ className }: LogoProps) => (
  <LogoImage 
    src="https://www.vectorlogo.zone/logos/amex/amex-ar21.svg" 
    alt="Amex" 
    className={className} 
  />
);

export const ApplePayLogo = ({ className }: LogoProps) => (
  <LogoImage 
    src="https://www.vectorlogo.zone/logos/apple_pay/apple_pay-ar21.svg" 
    alt="Apple Pay" 
    className={className} 
  />
);

export const GooglePayLogo = ({ className }: LogoProps) => (
  <LogoImage 
    src="https://www.vectorlogo.zone/logos/google_pay/google_pay-ar21.svg" 
    alt="Google Pay" 
    className={className} 
  />
);

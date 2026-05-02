import React from 'react';

// Using precise, high-quality SVG paths for payment logos
export const StripeLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 63 26" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M62.9 19.3c0-4.4-2.3-6.1-6.1-6.1-3.1 0-5.3 1.2-5.3 3.9 0 4.8 6.7 3.4 6.7 5.8 0 .9-.9 1.4-2.1 1.4-1.6 0-3-.6-3.8-1.1l-.2 3.1c.9.5 2.5 1 4.3 1 4.5 0 6.6-2.1 6.6-5.8s-0.1-2.2-0.1-2.2zm-15.1-4.1c-1.3 0-2.2.6-2.8 1.4V11H41v14.4h3.9v-6.5c0-1.8 1.1-2.9 2.6-2.9.3 0 .6 0 .9.1V15.2h-0.6zm-5.4-8.7c0-1.2-.9-2.2-2.1-2.2s-2.1 1-2.1 2.2c0 1.2.9 2.2 2.1 2.2s2.1-1 2.1-2.2zm-0.2 6.5h-3.9v11.4h3.9V13h0zm-6.6 2.3c-1.2-1.3-3.1-2.3-5.5-2.3-4.5 0-8.1 3.7-8.1 8.2s3.6 8.2 8.1 8.2c2.4 0 4.3-1 5.5-2.3v2h3.9V11h-3.9v2.3h0zm-5.3 10.6c-2.4 0-4.3-1.9-4.3-4.4s1.9-4.4 4.3-4.4c2.4 0 4.3 1.9 4.3 4.4s-1.9 4.4-4.3 4.4zM11.6 6.5C11.6 5.3 10.7 4.3 9.5 4.3S7.4 5.3 7.4 6.5c0 1.2.9 2.2 2.1 2.2s2.1-1 2.1-2.2zm-0.2 6.5H7.5v11.4h3.9V13h0zM5.5 13.1c-1.2-1.3-3.1-2.3-5.5-2.3v3.3c1.4 0 2.6.7 3.3 1.6V24.4H7.2V11H3.3v2.1h2.2z" fill="currentColor"/>
  </svg>
);

export const VisaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 44 14" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 0.3l-2.4 13.4h3.8L21.4 0.3h-3.9zM10.1 0.3L6.3 9.4 5.9 7.4 4.5 1.5C4.3 0.8 3.7 0.3 3.1 0.3H0l0.1 0.4c2.1 0.5 3.9 1.4 5.2 2.7l3.6 10.3H13L17.5 0.3h-7.4zm23.6 8.9c0-2.3-3.2-2.5-3.2-3.6 0-0.3 0.3-0.7 1-0.8 0.3-0.1 1.3-0.1 2.4 0.4l0.4-2.6C33.6 2.3 32.5 1.9 31.3 1.9c-3.1 0-5.3 1.6-5.4 3.9 0 3.3 4.6 3.5 4.6 5.3 0 0.5-0.6 1.1-1.3 1.2-0.8 0.1-3.2 0.1-4.2-0.9l-0.5 2.7c0.8 0.4 2.3 0.7 3.8 0.7 3.2 0 5.4-1.6 5.4-4.1zM43.9 0.3h-3.1c-1 0-1.7 0.3-2.1 1.3L34.1 13.7h4l0.8-2.2h4.8l0.4 2.2h3.5L43.9 0.3zm-4.3 8.3L41.7 2.3l1.1 6.3h-3.2z" fill="currentColor"/>
  </svg>
);

export const MastercardLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 20" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.1 10c0-3-1.2-5.8-3.2-7.8-2-2-4.8-3.2-7.8-3.2C4.1-1 0 3.1 0 8.1c0 3 1.2 5.8 3.2 7.8 2 2 4.8 3.2 7.8 3.2 5 0 9.1-4.1 9.1-9.1z" fill="#EB001B" fillOpacity="0.8"/>
    <path d="M32 10c0-5-4.1-9.1-9.1-9.1-3 0-5.8 1.2-7.8 3.2 2 2 3.2 4.8 3.2 7.8 0 3-1.2 5.8-3.2 7.8 2 2 4.8 3.2 7.8 3.2 5 .1 9.1-4 9.1-9z" fill="#F79E1B" fillOpacity="0.8"/>
  </svg>
);

export const AmexLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 16" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="16" rx="2" fill="currentColor"/>
    <text x="5" y="12" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="10" fill="white">AMEX</text>
  </svg>
);

export const ApplePayLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 16" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.4 7.6c0-1.8 1.5-2.7 1.5-2.7-0.9-1.3-2.2-1.4-2.7-1.4-1.2-0.1-2.4 0.7-3 0.7-0.6 0-1.6-0.7-2.6-0.6-1.3 0-2.5 0.8-3.2 1.9-1.4 2.4-0.4 6 1 8 0.7 1 1.5 2.1 2.5 2.1 1 0 1.3-0.6 2.5-0.6 1.2 0 1.5 0.6 2.6 0.6 1.1 0 1.8-1 2.5-2 0.8-1.2 1.1-2.3 1.1-2.3-2.3-0.9-2.7-2.9-2.7-3.7zm-2.4-5c0.5-0.6 0.9-1.5 0.8-2.4-0.8 0-1.7 0.5-2.3 1.1-0.5 0.6-1 1.5-0.9 2.3 0.9 0.1 1.9-0.4 2.4-1z" fill="currentColor"/>
    <text x="18" y="13" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="11" fill="currentColor">Pay</text>
  </svg>
);

export const GooglePayLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 16" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 12.3c-2.4 0-4.4-1.9-4.4-4.3s2-4.3 4.4-4.3 3.6 1.1 4.2 2.4l-3.3 1.4c-0.3-0.8-1-1.3-1.9-1.3-1.1 0-2 1-2 2.2s0.9 2.2 2 2.2c1 0 1.5-0.5 1.9-1l3.3 1.4c-0.7 1.3-2.1 2.3-4.2 2.3zm13.1-8.3h-6v8.3h2.1V9h3.9c2 0 3.7-1.6 3.7-3.7s-1.7-3.7-3.7-3.7zm0 4.1h-3.9V6h3.9c0.9 0 1.6 0.7 1.6 1.6s-0.7 1.5-1.6 1.5zm11.2-4.1c-1.8 0-3.3 1-3.9 2.4l1.9 0.8c0.3-0.7 1-1.1 2-1.1s1.9 0.5 2.3 1.1v0.1c-0.6-0.1-1.2-0.2-1.9-0.2-2.1 0-3.7 1.6-3.7 3.7s1.6 3.7 3.7 3.7c1.3 0 2.2-0.6 2.7-1.4v1.1h2.1V7.5c0-2.1-1.6-3.5-3.7-3.5zm0.4 5.3c0 0.9-0.7 1.6-1.6 1.6s-1.6-0.7-1.6-1.6 0.7-1.6 1.6-1.6c0.3 0 0.6 0.1 0.9 0.2l0.7 0.3v1.1zm9.8-5.3l-3.4 8c-0.5 1.1-1.4 1.7-2.4 1.7-0.5 0-0.9-0.1-1.3-0.3l0.7-1.9c0.2 0.1 0.4 0.1 0.6 0.1 0.4 0 0.8-0.3 1-0.8l0.4-0.9L28.1 4h2.2l2.3 5.3L34.9 4h2.1z" fill="currentColor"/>
  </svg>
);

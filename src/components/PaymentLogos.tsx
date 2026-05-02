import React from 'react';

// Payment Logos - Using PNG assets for all logos as requested.
// Assets should be placed in: public/assets/payments/

export const StripeLogo = ({ className }: { className?: string }) => (
  <img src="/assets/payments/stripe.png" alt="Stripe" className={className} />
);

export const VisaLogo = ({ className }: { className?: string }) => (
  <img src="/assets/payments/visa.png" alt="Visa" className={className} />
);

export const MastercardLogo = ({ className }: { className?: string }) => (
  <img src="/assets/payments/mastercard.png" alt="Mastercard" className={className} />
);

export const ApplePayLogo = ({ className }: { className?: string }) => (
  <img src="/assets/payments/apple-pay.png" alt="Apple Pay" className={className} />
);

export const GooglePayLogo = ({ className }: { className?: string }) => (
  <img src="/assets/payments/google-pay.png" alt="Google Pay" className={className} />
);

export const AmexLogo = ({ className }: { className?: string }) => (
  <img src="/assets/payments/amex.png" alt="American Express" className={className} />
);

export const AmazonLogo = ({ className }: { className?: string }) => (
  <img src="/assets/payments/amazon.png" alt="Amazon Payments" className={className} />
);

export const KlarnaLogo = ({ className }: { className?: string }) => (
  <img src="/assets/payments/klarna.png" alt="Klarna" className={className} />
);

# EasyMonitor - Blood Pressure & Heart Rate Tracking

> **By Sterling Labs** - A responsive web application designed for elderly users to easily track blood pressure and heart rate readings, with sharing capabilities for family and healthcare providers.

![EasyMonitor](https://img.shields.io/badge/version-2.0-blue) ![React](https://img.shields.io/badge/React-18.2-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3-cyan)

## 🩺 Features

### ✅ Core Features (FREE)
- **OMRON-Style Reading Input** - Scroll-to-adjust interface mimicking physical tensiometers
- **Interactive Trend Charts** - SVG-based visualization with hover tooltips
- **Trilingual Support** - English, Spanish, and Italian with flag selector
- **Professional PDF Reports** - Medical-grade reports for healthcare providers
- **Multiple Export Formats** - JSON, CSV, Text, and Doctor PDF
- **Elderly-Friendly Design** - Large UI elements, high contrast, accessible
- **Dark Mode** - Professional glassmorphism design
- **Mobile Optimized** - PWA-ready with touch-friendly interface

### 🚀 Upcoming Features (PRO)
- **Medication Tracking** - Reminders and intake logging
- **Meal Logger** - Timing correlation with blood pressure
- **Family Sharing** - Multi-user access and data sharing
- **Advanced Analytics** - Long-term health insights

## 📱 Deployment Options

### Option 1: Local/Private Deployment (Recommended for Family)
**Perfect for your wife's private health data**

```bash
# Clone and install
git clone https://github.com/sterling-max/easymonitor.git
cd easymonitor
npm install

# Run locally
npm run dev

# Build for production
npm run build
npm run preview
```

**Benefits:**
- ✅ **Complete privacy** - data never leaves your server
- ✅ **No internet dependency** - works offline
- ✅ **Zero operational costs** - just electricity
- ✅ **Full control** - your data, your rules

### Option 2: Cloud Deployment (Public Users)
**Scalable solution with social authentication**

**Tech Stack:**
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Supabase (Auth + Database)
- **Deployment:** Vercel
- **Authentication:** Google OAuth (Apple coming soon)

**Setup Guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

**Benefits:**
- ✅ **Social login** - Google sign-in for elderly users
- ✅ **Automatic backups** - Supabase handles data safety
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Scalable** - handles unlimited users
- ✅ **Cost effective** - ~$1/month until significant growth

## 🏗️ Architecture

### Local Version (main branch)
```
Frontend (React) → localStorage → Your Device
```

### Cloud Version (feature/supabase-migration branch)
```
Frontend (React) → Supabase API → PostgreSQL
                ↗ Supabase Auth (Google OAuth)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development
```bash
# Clone repository
git clone https://github.com/sterling-max/easymonitor.git
cd easymonitor

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🌐 Browser Support

- ✅ **Chrome/Edge** - Full support including PWA
- ✅ **Safari** - iOS and desktop support
- ✅ **Firefox** - Full functionality
- ✅ **Mobile browsers** - Optimized touch interface

## 📊 Data Models

### User Profile
```typescript
{
  name: string
  age: number
  region: 'usa' | 'europe' | 'world'
  onboardingCompleted: boolean
  preferences: {
    language: 'en' | 'es' | 'it'
    theme: 'light' | 'dark'
  }
}
```

### Blood Pressure Reading
```typescript
{
  id: string
  timestamp: Date
  systolic: number      // mmHg
  diastolic: number     // mmHg
  heart_rate: number    // bpm
  notes?: string
  user_id: string       // (cloud version only)
}
```

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌍 Internationalization

Full trilingual support with automatic browser language detection:

- **English** (en) - Default
- **Spanish** (es) - Español  
- **Italian** (it) - Italiano

Language preference saved in cookies (1 year expiration).

## 📄 Export Formats

1. **Standard JSON** - Complete data with future-proof structure
2. **CSV** - Spreadsheet-friendly for Excel/Google Sheets
3. **Text** - Simple readable format for basic sharing
4. **Doctor PDF** - Professional medical report with:
   - Summary statistics and averages
   - Blood pressure classifications (AHA/ESC/WHO guidelines)
   - Clinical notes and compliance metrics

## 🔒 Privacy & Security

### Local Deployment
- **Zero data transmission** - everything stays on your device
- **No tracking** - no analytics or external services
- **Full privacy** - perfect for sensitive health data

### Cloud Deployment
- **Row Level Security** - users can only access their own data
- **Encrypted transmission** - HTTPS everywhere
- **SOC 2 compliance** - via Supabase infrastructure
- **GDPR ready** - data export/deletion capabilities

## 💡 Design Philosophy

- **Elderly-first design** - Large UI, accessible, friendly but not childish
- **Rapid prototyping** - Focus on core features and UX
- **MVP approach** - Avoid complexity, add professional services iteratively
- **Medical compliance** - Follow AHA/ESC/WHO guidelines

## 🤝 Contributing

This is a personal health tracking project. While not accepting external contributions, the code serves as a reference for building elderly-friendly health applications.

## 📜 License

Private project by Sterling Labs. All rights reserved.

## 📞 Support

For issues or questions:
- Create an issue in this repository
- Email: maximiliano.villarreal@outlook.com

---

**Made with ❤️ by Sterling Labs for better health monitoring**
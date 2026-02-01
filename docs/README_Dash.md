# Dash 🛸

**A premium, Windows 11-inspired Jellyfin client built for speed, aesthetics, and an immersive media experience.**

Dash is a modern media client designed to bring the sleek, glassmorphic aesthetic of Windows 11 to your Jellyfin library. Focused on high-performance visuals and pixel-perfect UI/UX, it offers a unique way to browse and enjoy your music, movies, and shows.

---

## ✨ Key Features

### 🎵 Immersive Music Experience
- **Infinite Glide Lyrics**: A high-performance, 60fps scrolling engine using sub-pixel interpolation for a flawlessly continuous karaoke experience.
- **Smart Lyrics Caching**: Persistent local caching for instant lyric loading and offline support.
- **Dynamic Backdrop**: Beautiful, theme-aware backdrops that adapt to your music's album art.
- **Interactive Metadata**: Glassmorphic, interactive links for artists and albums with subtle, premium hover effects.

### 🎨 State-of-the-Art UI/UX
- **Glassmorphism Everywhere**: Deep use of backdrop blurs, semi-transparent layers, and vibrant accent colors to match the Windows 11 design language.
- **Micro-Animations**: Smooth transitions, pulsing active states, and reactive hover effects that make the interface feel alive.
- **Themed Experience**: Full support for Light, Dark, and custom accent colors.
- **Pixel-Perfect Alignment**: Meticulously balanced layouts designed by and for developers who value design integrity.

### ⚙️ Technical Excellence
- **Tauri Powered**: Lightweight and fast desktop experience built with Rust and Web technologies.
- **React + TypeScript**: Robust, type-safe frontend architecture.
- **Global State Management**: Powered by Zustand for reactive and reliable state handling across the player and browser.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://www.rust-lang.org/) (for Tauri builds)
- A running [Jellyfin](https://jellyfin.org/) server

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dash.git
   cd dash
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start in development mode:
   ```bash
   npm run tauri dev
   ```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Vanilla CSS (Custom Glassmorphism Design System)
- **Desktop Wrapper**: Tauri
- **Icons**: React Icons (Fa, Hi, Io)
- **State**: Zustand
- **Animations**: CSS Keyframes + `requestAnimationFrame` for performance-critical loops

---

## 🗺️ Roadmap
- [ ] Multi-server support.
- [ ] Local music playback synchronization.
- [ ] Advanced theater mode for movies.
- [ ] Offline media downloading.

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed with ❤️ by MAX and the Antigravity AI.**

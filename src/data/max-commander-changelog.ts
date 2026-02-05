export interface ChangelogEntry {
    version: string;
    date: string;
    description: string;
    changes: string[];
}

export const changelogData: ChangelogEntry[] = [
    {
        version: "0.5.4",
        date: "Feb 04, 2026",
        description: "Hardening & Resilience Update.",
        changes: [
            "Archive QuickView: Pressing F3 inside archives now correctly displays content using on-the-fly extraction (Fixed OS Errror 123).",
            "Hex Viewer: New dedicated Hex mode for binary files (toggle in F3 viewer).",
            "Search Refinements: Persistent search bar in QuickView (F7 to focus, F3 to find next) with hit highlighting.",
            "Network Stability: Moved heavy I/O and metadata operations to background threads to prevent UI hangs on slow networks.",
            "Long Path Support: Validated and hardened support for paths > 260 characters.",
            "Testing Tools: Added 'Advanced' stress tests (Zip64, Long Path) in Settings for self-verification."
        ]
    },
    {
        version: "0.5.3",
        date: "Feb 04, 2026",
        description: "Dynamic Drive Monitoring & Safety.",
        changes: [
            "Hardware Hot-swapping: Implemented a backend drive monitor that detects USB/Disk disconnections in real-time.",
            "Intelligent Redirection: Panels on disconnected drives now automatically 'pivot' back to your profile's Home folder to prevent crashes.",
            "Plugin Awareness: Disconnection logic extended to virtual plugin filesystems (Jellyfin, FTP, etc.) for a seamless experience.",
            "Optimized Drive Loading: Consolidated drive refreshing logic into a high-priority store action for instant UI updates."
        ]
    },
    {
        version: "0.5.2",
        date: "Feb 04, 2026",
        description: "Operation Dialog UX & Performance Overhaul.",
        changes: [
            "Progress Dialog Overhaul: Redesigned the file operation interface with a centered, more readable layout and separated file details.",
            "Visual Performance Indicators: The progress bar now features a dynamic color-coded scale (Red/Orange/Blue/Green) based on real-time transfer speed.",
            "Pills Design System: Introduced fixed-width pill containers for file counts and data size to eliminate layout shifts during operations.",
            "Hardened UI Responsiveness: Implemented event throttling and removed high-frequency logging to ensure F2 and Minimize buttons remain responsive during heavy copies.",
            "Global Capture Logic: Optimized keyboard event handling to prioritize dialog actions over panel navigation."
        ]
    },
    {
        version: "0.5.1",
        date: "Feb 01, 2026",
        description: "Consistency & Viewer Navigation Fixes.",
        changes: [
            "Standardized Data Schema: Unified internal file properties to 'is_dir' across all modules, improving reliability of file system operations.",
            "QuickView Navigation Polish: Fixed a critical bug preventing file-hopping in F3/QuickView (Ctrl+Q) and blocked keyboard leaks in modal mode with event isolation.",
            "Thumbnail View Fixes: Resolved a bug where arrow keys were non-functional in thumbnail mode by ensuring robust row calculation and preventing event bubbling.",
            "Enhanced Core Components: Updated FileList, ProviderRegistry, and all Dialogs to ensure stable interaction with the new data format.",
            "Developer Documentation Update: Refreshed the Developer Guide and plugin templates with the new 'is_dir' standard."
        ]
    },
    {
        version: "0.5.0",
        date: "Feb 01, 2026",
        description: "Media Streaming & Navigation Overhaul.",
        changes: [
            "Jellyfin Plugin Overhaul: Fixed 'Go Up' navigation and significantly improved data fetching reliability.",
            "Universal Media Streaming: Double-click or press Enter on movies/songs to launch them in your default system media player (VLC, etc.) via a temporary M3U8 playlist.",
            "Standardized Navigation: Synced keyboard and mouse behavior for Backspace, Enter, and Parent Folder (..) interaction across all panels.",
            "Smart Protocol Handling: Eliminated annoying 'Get an app to open this link' dialogs by strictly isolating virtual plugin paths from local system calls.",
            "Photo Support: Images from Jellyfin now correctly display in the QuickViewer (F3) and open in the default photo viewer."
        ]
    },
    {
        version: "0.4.2",
        date: "Feb 01, 2026",
        description: "Plugin System Polish & UI Refinements.",
        changes: [
            "Fixed Plugin Drive Labels: Custom schemes (e.g. 'emby:') now correctly display in the Drive Bar.",
            "Visual Polish: Removed mock 'mem:' and 's3:' drives from production builds.",
            "Expanded Icon Library: Added 'Chip', 'Network', and 'Plug' icons for versatile plugin customization.",
            "Synchronization Fix: Drive Menu (Alt+F1/F2) now instantly reflects installed/removed plugins.",
            "Robust Loading: Improved script plugin initialization to handle multiple plugin instances gracefully."
        ]
    },
    {
        version: "0.4.1",
        date: "Jan 31, 2026",
        description: "Thumbnail View and System Hardening.",
        changes: [
            "Introduced 'Thumbnail View' mode for rich media processing capabilities.",
            "Integrated 'System Types' using IShellItemImageFactory for zero-latency thumbnails.",
            "Major refactor of FileList.tsx: virtualization optimized, template interpolation fixed.",
            "Backend compilation fixes: finalized IBindCtx and COM threading models.",
            "Renamed internal hooks for better duplication detection (useKeyboard)."
        ]
    },
    {
        version: "0.4.0",
        date: "Jan 30, 2026",
        description: "Premium Drag & Drop Experience.",
        changes: [
            "Custom Premium Drag Cursor: replaced standard OS pointers with a floating, informative UI.",
            "Visual Drop Feedback: unified targets (folders, panels, parent folder) with consistent styling.",
            "Intelligent Same-Panel Drops: enabled organizing files into subfolders within the same panel.",
            "Smart Cancel Logic: real-time visual indicator for invalid drop targets.",
            "Refined Interaction: hidden native OS ghost images and system pointers for a polished UI.",
            "Adaptive Logo Tinting: app logo now resets to official blue on profile switch, then gracefully stains to match the accent color after a 10s delay.",
            "Portable Persistence Fix: resolved storage conflict that prevented profile colors and settings from saving correctly in standalone mode."
        ]
    },
    {
        version: "0.3.1",
        date: "Jan 30, 2026",
        description: "Git Stability and AI Integration.",
        changes: [
            "Fixed Git repository detection: resolved ownership errors and improved branch detection accuracy.",
            "Integrated 'AI Context' dropdown in the Environment Bar for quick access to development tools.",
            "Visual polish for project indicators: added status icons and improved hover interaction feedback.",
            "Optimized cross-panel state synchronization for active Git branches."
        ]
    },
    {
        version: "0.3.0",
        date: "Jan 29, 2026",
        description: "Core UI Polish and Path Navigation enhancements.",
        changes: [
            "Implemented 'Smart Root' button: Ctrl+Click now jumps directly to your profile's home folder.",
            "Visual overhaul for all dropdowns and menus: added layered shadows and backdrop-blur effects.",
            "Refined the Path History menu with folder icons, path truncation, and better active states.",
            "New 'Windows 11' style focus indicators for keyboard navigation in menus.",
            "Fixed path concatenation bug when navigating from home folders."
        ]
    },
    {
        version: "0.2.5",
        date: "Jan 28, 2026",
        description: "Contextual Profiles and Security Firewall.",
        changes: [
            "Dedicated 'Work' and 'Personal' profiles with isolated workspaces and settings.",
            "Path Firewall: automatically hide or restrict sensitive directories based on active profile.",
            "Context-aware switching: auto-trigger profile changes when entering designated project paths.",
            "Profile-specific overrides for external editors and terminal shells."
        ]
    },
    {
        version: "0.2.0",
        date: "Jan 26, 2026",
        description: "Rich Content Viewers and Sterling Blitz.",
        changes: [
            "Added high-fidelity Markdown render (GFM) to the F3 viewer.",
            "Integrated Mermaid.js for interactive diagrams with auto-peeking in text files.",
            "Sterling Blitz v2: Full audio engine, Boss mechanics, and Parallax backgrounds.",
            "Improved path truncation logic for long filenames in the viewer header."
        ]
    },
    {
        version: "0.1.5",
        date: "Jan 23, 2026",
        description: "The 'Mega Pack' - Core Power-user features.",
        changes: [
            "SFTP/FTP Support: connect and browse remote servers directly in the panels.",
            "Advanced Archive support: browse and extract .7z files.",
            "Project Environment Module: detect Node/Rust/Python versions in the status bar.",
            "Full Keyboard Shortcut Editor in Settings.",
            "Initial System Notifications (Toasts) for background tasks."
        ]
    },
    {
        version: "0.1.1",
        date: "Jan 19, 2026",
        description: "Interface Refinement.",
        changes: [
            "Auto-hide Panel Divider with 'Hot Zone' hover recovery.",
            "Vertical Sidebars with Acrylic Pills for collapsed panels.",
            "Async Hardware Detection for ultra-fast drive loading and labeling."
        ]
    },
    {
        version: "0.1.0",
        date: "Jan 18, 2026",
        description: "Initial Alpha Release.",
        changes: [
            "Dual-pane file management with Norton Commander keybindings.",
            "Acrylic / Mica window effects for Windows 11.",
            "High-performance Rust backend using Tauri v2.",
            "Integrated Quick Viewer (F3) for text, images, and videos."
        ]
    }
];

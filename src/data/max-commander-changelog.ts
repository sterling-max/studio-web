export interface ChangelogEntry {
    version: string;
    date: string;
    description: string;
    changes: string[];
}

export const changelogData: ChangelogEntry[] = [
    {
        version: "0.8.11",
        date: "May 6, 2026",
        description: "Support Feedback & Plugin Catalog.",
        changes: [
            "Added a solid in-app feedback dialog that submits bug reports, suggestions, feature requests, and support notes to Sterling Lab.",
            "Feedback submissions now include Max Commander version, build channel, platform, and license tier context.",
            "Added a browser fallback to the Sterling support page when in-app feedback submission fails.",
            "Added a direct link from the Plugins settings area to the official Max Commander plugin catalog.",
            "Plugin usage remains Pro-gated while official plugin downloads are free during the early catalog phase."
        ]
    },
    {
        version: "0.8.10",
        date: "May 1, 2026",
        description: "Navigation, Filtering & Tooltip Polish.",
        changes: [
            "Tooltips now render consistently across navigation controls, profile controls, and truncated file names without being clipped.",
            "Drive buttons now stay in place when you are already browsing that drive, avoiding accidental jumps back to the drive root.",
            "The pane filter now searches the whole visible row, including names, extensions, dates, sizes, attributes, paths, and related details.",
            "The file list filter control now lives in the leading header slot and clears the filter row with a single close action.",
            "Focused rows now use a cleaner top-and-bottom cursor marker.",
            "Free-mode Pro messaging now highlights Steam Library and Jellyfin Media Server plugin value more clearly."
        ]
    },
    {
        version: "0.8.9",
        date: "Apr 30, 2026",
        description: "Installed App & Update Flow Polish.",
        changes: [
            "Installed builds now start more cleanly and show the file panels only when the first useful view is ready.",
            "Audio playback, album art, and lyrics lookup are more reliable in packaged builds.",
            "The update dialog has a cleaner solid surface, and updates use a quieter installer flow.",
            "New installs start in the Personal profile with refined defaults and normal Windows app data storage."
        ]
    },
    {
        version: "0.8.7",
        date: "Apr 29, 2026",
        description: "Search, Profiles & Toolbar Refinements.",
        changes: [
            "Search results are easier to review and keep their previews stable, even with unusual file content.",
            "Toolbar menus now feel more predictable, with better keyboard navigation and cleaner behavior near long paths.",
            "Profile controls are cleaner in the title bar, with optional compact placement and theme-aware colors.",
            "Folder history now focuses on places you actually used instead of every folder you quickly passed through.",
            "Drive refreshes are more resilient, so a temporary device hiccup no longer clears the whole DriveBar."
        ]
    },
    {
        version: "0.8.6",
        date: "Apr 28, 2026",
        description: "Steam Library Plugin & Viewer Polish.",
        changes: [
            "Added a packaged Steam Library plugin for browsing installed games, tools, soundtracks, workshop content, and library drives.",
            "Steam games can be launched directly from Max Commander, with quick actions for Steam, install folders, and workshop pages.",
            "Game libraries now use richer poster-style artwork where available.",
            "Music and media viewers received cleaner layouts, better controls, and preserved state while moving between files.",
            "Plugin drives and action menus now behave more consistently across the interface."
        ]
    },
    {
        version: "0.8.5",
        date: "Apr 22, 2026",
        description: "Remote Access, Media View & Space Analyzer Polish.",
        changes: [
            "Remote FTP and SFTP connections are more reliable on slow networks and recover more gracefully after interruptions.",
            "Remote drives now persist across restarts and feel more like first-class locations in the DriveBar.",
            "Added Media View for artwork-heavy folders, with better movie and music artwork discovery.",
            "Focused movie and album folders can now show useful local metadata directly in the panel status area.",
            "Folder Quick View now opens to a clearer information view, while Space Analyzer adds Treemap and Sunburst options.",
            "Space Analyzer labels, colors, and hover details were refined for cleaner disk cleanup sessions.",
            "License and Security settings are clearer, with more predictable Pro status when reconnecting or working offline."
        ]
    },
    {
        version: "0.8.1",
        date: "Apr 07, 2026",
        description: "PathBar Editor & Smart DriveBar.",
        changes: [
            "Full-Width Path Editor: Activating the path bar expands to fill the entire header for focused, distraction-free editing.",
            "Smart Autocomplete: Suggests completions from history and favorites, and reads subfolders in real-time as you type.",
            "Ghost-Text Suggestions: Inline ghost text shows the best match; Tab to accept, Escape to dismiss, Enter to navigate.",
            "Drive Menu Button: The left DriveBar button transforms into a Drive Menu trigger when at scroll start.",
            "Pinnable Locations: Pin Desktop, Documents, Downloads, FTP, or LAN directly to the Drive Bar from the Drive Menu.",
            "Drive Bar Pinning: Drives can be unpinned to keep the bar tidy. All configuration persists across sessions.",
            "Native Context Menu on Drives: Right-clicking a drive in the Drive Bar opens the Windows Explorer context menu."
        ]
    },
    {
        version: "0.8.0",
        date: "Apr 05, 2026",
        description: "TitleBar UI Refinement & Granular Controls.",
        changes: [
            "Granular UI Control: Independently show or hide the Theme, Settings, and Profile buttons in the TitleBar.",
            "Modern Profile Aesthetic: Profile Selector transformed into a sleek pill with CamelCase labeling.",
            "Native Header Feel: Removed custom borders and accent-tinted hover states from TitleBar actions.",
            "Localized Settings: Full translation support for new visibility toggles across all supported languages."
        ]
    },
    {
        version: "0.7.9",
        date: "Apr 04, 2026",
        description: "Instant Startup Optimization & Viewer Refinements.",
        changes: [
            "Lightning Fast Startup: Eliminated the initial window flash. Max Commander boots in ~150 milliseconds.",
            "Text Selection Enabled: Fixed restriction that prevented text selection in Quick View and Modal View.",
            "Inline Rename Fixes: Optimistic UI updates for instant, flicker-free feedback across all view modes.",
            "Lightning Fast Thumbnails: Fast-path engine for folder previews with JPEG encoding for large directories.",
            "Unified Drive Navigation: Consolidated drive icons and access points into a single shared system."
        ]
    },
    {
        version: "0.7.8",
        date: "Mar 24, 2026",
        description: "Sample Plugins and Critical Stability Hotfix.",
        changes: [
            "Sample Plugins: High-fidelity Tool and FileSystem samples demonstrating UI blocks and custom VFS columns.",
            "UI Stability Fix: Resolved a recursive loading loop in the plugin system.",
            "Window Titles: Restored branding to the Windows taskbar.",
            "Permission Hardening: Granular window controls enabled in the security schema."
        ]
    },
    {
        version: "0.7.7",
        date: "Mar 23, 2026",
        description: "Plugin Export Workflow and Manifest Recovery.",
        changes: [
            "Export to .mcx: Introduced a one-click export feature in the Plugin Editor to package custom scripts into valid .mcx archives automatically.",
            "Jellyfin Manifest Recovery: Resolved the 'plugin.json not found' error by restoring the missing manifest for the Jellyfin plugin.",
            "Mount-time Plugin Sync: The Plugins section now automatically re-scans the local directory on mount, ensuring the UI is always in sync with your disk.",
            "Backend Resilience: Hardened the archive packing logic in Rust to resolve type ambiguity and improve reliability during plugin exports."
        ]
    },
    {
        version: "0.7.6",
        date: "Mar 22, 2026",
        description: "Reliable Drive Management and Unified PRO Experience.",
        changes: [
            "Reliable Drive Loading: Fixed a critical bug where the Drive Bar could appear empty after app restarts or internal refreshes by implementing a module-level lock and atomic state updates.",
            "Unified PRO Flow: Re-engineered the 'PRO Feature' dialog into a global system, ensuring a consistent premium experience across the app.",
            "Profile Polish: Added a clear 'PRO' pill to the 'Work' profile in the switcher, providing instant feedback for gated feature discovery.",
            "Store Stability: Implemented robust state migration logic for all application stores (Settings, Typography, etc.) to eliminate console warnings and ensure smooth updates.",
            "Backend Cleanup: Resolved several internal Rust and TypeScript warnings to improve build stability and overall code quality."
        ]
    },
    {
        version: "0.7.5",
        date: "Mar 22, 2026",
        description: "Refining Pause & Background Behavior plus Quick Navigation.",
        changes: [
            "Visual Pause Feedback: Operations in the background (Pills) now turn orange and show a Pause icon when halted, with a one-click Resume button for instant recovery.",
            "Pause Acknowledgment Handshake: Implemented clear 'Asking Windows to Pause...' feedback in the progress dialog, ensuring the user knows precisely when the OS has frozen the operation thread.",
            "Robust Archive Pausing: Re-engineered ZIP and 7z extraction loops to natively support the pause state, preventing progress leaks and data corruption during halts.",
            "Quick Navigation Buttons: Added optional '..' (Go Up) and '/' (Go to Root) buttons to the toolbar, toggleable via a new setting in the Interface panel (F9).",
            "Smart Root Resolution: The new '/' button intelligently understands the current environment, resolving correctly to local drive roots, UNC network shares, or the 'Network Neighbourhood' virtual root."
        ]
    },
    {
        version: "0.7.3",
        date: "Mar 18, 2026",
        description: "Distribution & Deployment Infrastructure Polish.",
        changes: [
            "Resilient Distribution Pipeline: Migrated to high-performance cloud delivery for installers and updates on Windows.",
            "GitHub Release Security: Hardened deployment permissions to ensure stable artifact distribution for new versions.",
            "Direct Licensing Integration: Finalized secure communication between the app and sterling.ltd for machine seat management.",
            "Platform Reliability: Optimized MSI and NSIS installer logic for more resilient installations across various Windows configurations."
        ]
    },
    {
        version: "0.7.0",
        date: "Mar 16, 2026",
        description: "Max Commander Pro & Offline Licensing.",
        changes: [
            "Pro License Ecosystem: Introduced the 'Max Commander Pro' license tier. Users can now unlock advanced commercial features with a one-time purchase.",
            "Cryptographic Verification: Implemented military-grade ed25519 digital signatures for 100% offline license verification. No phone-home required for daily usage.",
            "Hardware Binding: Integrated intelligent Machine ID heuristics that bind licenses to up to 3 specific devices, preventing unauthorized key sharing while staying flexible for power users.",
            "Simplified Activation: Added a dedicated 'License & Pro' tab in the Settings (F9) for instant key application and hardware diagnostic read-outs.",
            "Device Management Portal: Launched a companion management portal on sterling.ltd for users to remotely deactivate old machines and recover lost keys via magic links.",
            "Onboarding Auto-Bypass: Streamlined the first-launch experience by auto-completing onboarding for existing users."
        ]
    },
    {
        version: "0.6.4",
        date: "Mar 14, 2026",
        description: "Terminal, Command Palette & Script Library Polish.",
        changes: [
            "Terminal & Palette Activation: Resolved triggering issues for international keyboard layouts. Ctrl+` and Ctrl+P now reliably open the Terminal and Command Palette.",
            "Panel-Aware Tools: The Tools menu is now context-aware, correctly opening the terminal or script library in the directory of the focused panel.",
            "Visual Consistency: Overhauled the Script Library and Command Palette overlays with premium backdrop-blur effects and unified styling to match the system design.",
            "Global Script Folders: Added a dedicated setting in the Tools panel (F9) to configure custom scan paths for the Script Library, enabling central management of user scripts.",
            "Robust Interface Logic: Cleaned up internal event handling and fixed syntax errors that caused occasional UI instability in the Tools menu."
        ]
    },
    {
        version: "0.6.3",
        date: "Mar 10, 2026",
        description: "Title Bar Consolidation & Smart Error Handling.",
        changes: [
            "Simplified Title Bar: Moved the Theme Toggle and Settings buttons cleanly into the Profile drop-down menu for a more streamlined, distraction-free header.",
            "Smart Operation Badge: The background operations pill now exclusively appears for minimized background transfers, avoiding redundant indicators when the main progress dialog is open.",
            "Graceful Cancellations: Canceling file operations natively suppresses dense technical tracebacks, resolving directly to a clean blue 'Cancelled' confirmation.",
            "Copyable Error Diagnostics: Re-designed error Toasts with intelligent message truncating and a one-click Copy button to seamlessly paste file-system blockages.",
            "Vibrant Theme Icons: Brightened the Light, Dark, and System theme selectors with distinctive flat colors inside the drop-down menu.",
            "Drive System Resilience: Fixed a critical path-watcher leak where navigating to virtual drives caused OS-level filesystem hooks to overload, preserving drive stability.",
            "Orthodox Selection Physics: Fully separated the Focus Caret from the Explicit Selection state mimicking classic Orthodox File Managers. Using the `Space` and `Insert` keys now flawlessly marks files while auto-moving rows downwards for rapid-fire selection without breaking logic."
        ]
    },
    {
        version: "0.6.2",
        date: "Mar 02, 2026",
        description: "Onboarding Polish & First Impressions.",
        changes: [
            "Impactful First Run: Completely redesigned the Onboarding flow with a high-impact 'Hero' aesthetic, making the initial experience modern and memorable.",
            "Global Localization: Translated the entire onboarding flow authentically into Spanish, French, German, Italian, and Russian with a proper developer-oriented tone.",
            "Live Language Switching: The language selector on the welcome screen now updates all slide translations instantly and renders localized content flawlessly.",
            "Modal Refinements: The onboarding dialog is now vertically scrollable to comfortably fit all text and international translations on lower-resolution screens.",
            "Help Page Visuals: Restored the sidebar navigation styles in the Help & About page to elegantly match the new Settings interface design."
        ]
    },
    {
        version: "0.6.1",
        date: "Mar 01, 2026",
        description: "Operation Dialog Telemetry & UX Overhaul.",
        changes: [
            "Precision Speed Histogram: Rebuilt the file operation histogram to map exactly to the completion percentage (0% to 100%) rather than a scrolling time window, offering a true spatial visualization of the transfer.",
            "Visual Stability: Fixed 'ghost bars' appearing during instantaneous delete operations and prevented valid speed buckets from being overwritten by momentary delays between files.",
            "Modern Speed Bubble: Replaced the floating text speed label with a polished, dynamic comic-bubble UI that matches the operation color and perfectly tracks the leading edge of the histogram.",
            "Robust Interface Controls: Eliminated dropped clicks on the Pause/Cancel buttons by decoupling their event handlers from high-frequency React render cycles.",
            "Responsive Data Feed: The progress telemetry now recalculates remaining time and transfer totals more accurately, preventing 'NaN/Infinity' flashes during extremely fast SSD maneuvers."
        ]
    },
    {
        version: "0.6.0",
        date: "Feb 21, 2026",
        description: "Advanced Archive Operations & LAN Browsing.",
        changes: [
            "Seamless Archive Integration: Treat ZIP files truly like folders. Copy, move, and delete files directly within archives without manual extraction.",
            "Cross-Archive Operations: Transparently copy or move files between different ZIP archives.",
            "Archive Folder Creation: Create new folders directly inside existing ZIP files.",
            "Robust Conflict Handling: Bypasses standard file conflict checks safely when writing into archives, ensuring fast transparent modifications.",
            "Nested Archive Packing: Pack selected files directly into a new ZIP archive located inside an existing ZIP archive.",
            "Targeted Unpacking: Select and extract individual files directly from within an archive to a destination.",
            "Archive UI Polish: Fixed path duplication rendering bugs when navigating deep into nested archive folders.",
            "LAN Browsing: Browse your local network and discover servers directly from the Drive Bar or the Alt+F1/F2 Drive Menu. Navigate through network shares just like local folders.",
            "Smart Network Navigation: Pressing Backspace or '..' from a network server automatically returns you to the Network overview, and from there back to your local drives.",
            "Network Path UI Fix: Resolved an issue causing double server names in the PathBar when drilling down into network shares."
        ]
    },
    {
        version: "0.5.5",
        date: "Feb 17, 2026",
        description: "Store Submission Preparation & Hardening.",
        changes: [
            "Store Compatibility: Optimizing build for NSIS redistribution on the Microsoft Store.",
            "Protocol Integrity: Verified asset loading and secure shell execution for Win32-packaged environments.",
            "Hardware Detection: Refined drive monitoring and removable storage detection for better reliability.",
            "Network Stability: Finalized background operations for SFTP and Jellyfin streaming in production builds.",
            "Archive High-Fidelity Preview: Seamlessly view high-res images and documents inside ZIP and 7z archives with hybrid memory management.",
            "Vite 7 Migration: Internal build tools updated to latest standards for faster startup performance."
        ]
    },
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

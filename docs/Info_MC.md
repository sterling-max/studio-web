# Max Commander (MC) - Project Memory

## Structure Note
- Feature plans and `Features.md` are located in `docs/plans/`.

## Project Overview
- **Name**: Max Commander
- **Short**: MC
- **Type**: Orthodox File Manager (dual-pane, like Total Commander)
- **Target OS**: Windows 11
- **Language**: English Only
- **Version**: 0.3.0
- **Goal**: Personal TC replacement (30+ years of TC usage!)

## Core Principles
1. **PARAMOUNT**: Simple but Refined, beautiful, modern Windows application
2. **PARAMOUNT**: Super fast loading
3. **PARAMOUNT**: ALWAYS resolve user questions in the prompt BEFORE starting work.
4. Same key bindings as Total Commander
5. Same feature set as Total Commander
6. Modern Visual Style: Acrylic / Mica / Light & Dark Mode

---

## Technology Stack ✅

| Layer | Technology |
|-------|------------|
| Backend | Rust (Tauri v2) |
| Frontend | React 19 + TypeScript + Vite 7 |
| Styling | Custom CSS |
| State | Zustand |
| Animations | Framer Motion |
| Window Effects | `window-vibrancy` crate |
| Content Engines | `mermaid.js`, `react-markdown` |


---

## Project Status: MVP++ ✅

### Implemented Features
- **Dual-pane file browser** with TC-style navigation
- **Resizable panels** with grip divider and collapse buttons
- **Auto-hide Divider**: Hide divider after 20s, restore on "hot zone" hover (±40px)
- **Panel Collapse**: Collapse panels to vertical sidebars with single-click expansion
- **Vertical Acrylic Pills**: Drive and Folder pills in collapsed view with Windows 11 aesthetics
- **Parent folder item (..)**: Always at top, navigates up (even from ZIPs/Drive roots)
- **Item Visibility**: Toggle hidden and system files in Settings
- **Advanced Sorting**: Click any column header to sort; configurable "folders apart" logic
- **File operations**: Copy (F5), Move (F6), Delete (F8), Create Folder (F7)
- **Selection behavior**: If no selection, uses focused item as source
- **Persistent Selection/Focus**: Restores cursor position to the previous folder when navigating up (TC-style).
- **Progress dialog** with F2 background, queue indicator
- **TC keybindings**: Arrow, Space, Insert, Home/End, PageUp/Down, Shift+Arrow
- **ENTER**: Navigate folders OR launch files with default app
- **Quick Viewer (F3)**: Text (with syntax highlighting), images, video (external player)
- **Settings Panel (F9)**: Theme, syntax highlighting, video player, function bar, **Divider Mode**
- **Theme support**: Light/Dark/System with persistence
- **Acrylic backdrop**: Native Windows 11 effects via `window-vibrancy`
- **Drive bar**: Global state optimization for instant panel switching
- **Drive menu (ALT+F1/F2)**: Drives + system folders (true locations via Shell API) with instant keyboard letter selection
- **PathBar**: Favorites (❤️) and history dropdowns
- **Terminal panel (Ctrl+`)**: PowerShell in active panel
- **Shift selection**: Range select with Shift+Arrow/Click
- **Folder size calculation**: ALT+SHIFT+ENTER
- **Search dialog (ALT+F7)**: Filename glob + content search
- **Space Analyzer (Space Map)**: WinDirStat-like squarified treemap visualization for disk usage analysis with multi-level flattening, folder navigation, and file deletion.
- **Sterling Blitz (Easter Egg)**: Isolated 1980's retro shmup mini-game starring the VF-1 Veritech, accessible via Ctrl+Shift+Click on the app logo. Includes high-score persistence.
- **Profiles & Context Switching**: Isolated workspaces (Work/Personal) with dedicated tab sets, history, pinned folders, and accent colors.
- **Path Firewall & Protection**: Ability to hide sensitive drives/folders based on the active profile.
- **Process & Tool Presets**: Profile-specific overrides for external editors (F4) and terminal shells.
- **Context Awareness**: Automatic profile switching when entering designated project paths.
- **Archive Support**: Pack (Alt+F5) and Unpack (Alt+F9) with modern dialogs
- **Archive Browsing**: Enter/Double-click to enter ZIP/JAR/WAR files
- **Multi-rename (Shift+F6)**: Batch rename with patterns
- **Compare directories (Ctrl+M)**: Highlight differences between panels
- **Mouse Experience**: Double-click to open, slow click to rename (like Windows Explorer)
- **Native Windows Context Menu**: True `IContextMenu` COM integration for native Windows right-click experience.
- **Hyper-fast Drive Loading**: Near-zero disk IO on startup (bitmask only) with background async hardware detection (SSD/USB) and labels.
- **Drive Persistence**: Cached drive types and labels persist between sessions for instant visual accuracy on launch.
- **Project-Aware Environment**: Detects Node, Rust, and Python projects and displays versions/markers in a sleek panel bar.
- **FTP/SFTP Support**: Connect to remote servers and browse them directly in the panels.
- **Advanced Archives**: Support for `.7z` archives (browsing and extraction).
- **System Notifications**: Lightweight toast system for background operations.
- **Configurable Keybindings**: Full control over all TC-style shortcuts via the Settings page.
- **Markdown Render (F3)**: High-fidelity rendering with GFM support and syntax highlighting for code blocks.
- **Mermaid Diagrams (F3)**: SVG rendering for charts/diagrams with intelligent content "peeking" in .txt/.md files.
- **Graceful Error Recovery**: Auto-pivot to Code View on Mermaid syntax errors with high-visibility banners.
- **Folder Quick View**: View folder stats (size, file count, folder count) with deferred calculation.
- **Profile System**: Robust profile isolation (Work/Personal) with dedicated "Home folders" (basePath) and "Security Firewall" to prevent accidental data leaks.
- **Smart Root Button**: PathBar root button now doubles as a "Home" shortcut (Ctrl+Click) with dynamic icon switching (Database -> Home).
- **Core UI Polish**: Overhauled dropdown aesthetics with layered shadows, backdrop-blurs, and modern "pill" focus states for better Chip aesthetics.
- **Path History (Refined)**: History items now feature folder icons, path truncation with tooltips, and a clearer "Active Folder" checkmark system.
- **Icon Stability**: Migrated critical UI icons to `react-icons/vsc` to resolve cache conflicts and ensure build stability.
- **Drag & Drop Strategy**: Enabled HTML5 Drag & Drop by setting `"dragDropEnabled": false` in `tauri.conf.json`. This allows the Webview to handle drag events directly, fixing the "cancel icon" issue. State is managed via `useDragStore` and executed via `useDragOperations.ts`.

- **Space Analyzer**: WinDirStat-like treemap visualization for disk usage analysis with multi-level flattening, folder navigation, and file deletion.
- **Jellyfin Plugin**: Browse and stream from Jellyfin Media Server with full library traversal, thumbnails, and inline video playback.
- **Plugin Streaming Media**: Plugins can provide `streamUrl` and `thumbnailUrl` for media items. QuickViewer (F3) renders HTML5 video/audio directly.
- **Plugin Preferred View Mode**: Plugins can declare `preferredViewMode: 'thumbnails'` to auto-switch view when entering their paths.
- **PathBar Breadcrumb Resolution**: Plugins can implement `resolvePath()` to show friendly names instead of GUIDs.

### Key Shortcuts
| Key | Action |
|-----|--------|
| Tab | Switch panels |
| Arrows | Navigate files |
| Shift+Arrows | Range select |
| Enter / Double-Click | Open folder / Launch file / Browse archive |
| Backspace | Parent folder |
| Space | Toggle selection |
| Insert | Select + move down |
| Alt+Left/Right | History back/forward |
| Alt+F1 / Alt+F2 | Drive menu |
| Alt+F5 | Pack to Archive |
| Alt+F7 | Search |
| Alt+F9 | Unpack Archive |
| Alt+S | Quick Search |
| Alt+Shift+Enter | Calculate folder size |
| Ctrl+` | Terminal panel |
| Ctrl+M | Compare directories |
| F1 | Help / Keybindings |
| F2 | Inline rename (or slow click) |
| F3 | View / Quick view |
| F4 | Edit file (external) |
| F5 | Copy |
| F6 | Move |
| Shift+F6 | Multi-rename |
| F7 | New folder |
| F8 | Delete |
| F9 | Settings (Configurable) |
| F10 | Quit |

---

## Remaining Tasks (Priority Order)
### LOW PRIORITY - Nice to Have
- [ ] **Archive support**: RAR browsing (currently ZIP/7z/JAR only).
- [ ] **Operation start notifications**: Toast/notification for long operations.

---

## Known Issues
- Terminal: "program not allowed on shell scope" requires shell scope config
- Ghost Title Bar: Appearing as a duplicate white bar on focus in Windows 11.

---

## Design Decisions
| Date | Decision |
|------|----------|
| 2026-01-18 | Project initiated |
| 2026-01-18 | Tauri v2 stack chosen |
| 2026-01-18 | PowerShell for drive info (single call) |
| 2026-01-18 | No plugins initially - internal features |
| 2026-01-18 | Context menu: fallback to explorer /select (native COM needs research) |
| 2026-01-19 | Divider Auto-hide with Hot-Zone (±40px) implemented |
| 2026-01-19 | Vertical sidebars for collapsed panels with Acrylic Pills |
| 2026-01-19 | Async drive loading: Bitmask only at start, PowerShell hardware detection via dedicated background thread (`spawn_blocking`) |
| 2026-01-19 | Persistent drive info: Cache hardware types/labels in Zustand to eliminate UI flicker at launch |
| 2026-01-20 | Branch View (Recursive): Backend walkdir flattening, relative paths for operations, "pacifier" overlay for loading |
| 2026-01-22 | Layout Fix: Replaced absolute positioning with nested flexbox in Panel.tsx to fix internal scrolling and containment. |
| 2026-01-22 | Visual Polish: Re-enabled Acrylic transparency and established title bar visual parity as priority. |
| 2026-01-23 | Mega Pack: Project Environments, SFTP/FTP, 7z Support, Notifications, and Keybinding Editor implemented. |
| 2026-01-24 | Settings Redesign: Borderless Zebra language, DriveBar-style tabs with auto-scroll, and blue pill toggles. |
| 2026-01-25 | Sterling Blitz Polish: Hitbox refinement, layout persistence (30/70 auto-toggle), full audio integration, multi-layer parallax backgrounds, and dual-phase boss mechanics. |
| 2026-01-26 | Sterling Blitz v2: DOM HUD overlay, audio engine stabilization (Shot Pool), orbital satellites in Sector 1, IDDQD God Mode with Organic Plasma Shield, and input firewall improvements. |
| 2026-01-26 | Markdown & Mermaid: High-fidelity Markdown viewer (GFM) and interactive Mermaid diagram viewer with auto-peeking and graceful recovery. |
| 2026-01-28 | Contextual Profiles: Implemented Work/Personal profiles with isolated workspaces, path firewalls, and auto-trigger switching. |


---

## Build Procedures ✅

### Portable Standalone Executable
To generate a single, portable `.exe` without installers/bundles:
1. Ensure the frontend is built: `npm run build`
2. Run the Tauri build with the no-bundle flag:
   ```pwsh
   npx tauri build --no-bundle
   ```
3. The output will be located at:
   `src-tauri/target/release/max-commander.exe`

---

---

## Configurable Settings List (SettingsPage) ✅

| Group | Setting | Description |
|-------|---------|-------------|
| **General** | Show Parent Folder (..) | Always show ".." at the top of file lists |
| | Show Hidden Files | Toggle hidden files visibility |
| | Show System Files | Toggle system/protected files visibility |
| | Folders Apart | Show folders at the top of the list |
| | Native Context Menu | Enable shell extension (COM) right-click menu |
| | Default Sort Column | Column used for initial sorting (Name, Ext, Size, Date) |
| **Interface** | Theme Selection | Light / Dark / System mode |
| | Function Bar (F-Keys) | Toggle function key bar at the bottom |
| | Tabs Visibility | Smart (hide if 1) / Always show |
| | Divider Mode | Always show / Auto-hide / Always hidden |
| | Keyboard Shortcuts | Full rebinding of all app operations |
| **Tools** | Primary Editor | Text editor for F4 (Presets: VS Code, Notepad++, Notepad, Custom) |
| | Video Player | Player for video files (Presets: Internal, System, VLC, Custom) |
| | Syntax Highlighting | Color coding in F3 Quick View |
| **Advanced** | System Notifications | Toast on background operation completion |
| | Project Env Module | Detection of Node/Rust/Python environments |
| | Advanced Archives | Support for `.7z` extraction and browsing |
| | Remote Connections | Saved FTP/SFTP server credentials |

---

## Settings Page Design System ✅

### Layout & Navigation
- **Top Tab Bar**: Horizontal navigation using `DriveBar` aesthetics.
    - **Active State**: Tinted background (`accent 20%`), solid blue border, bold text.
    - **Scrolling**: Smooth auto-scroll chevrons appear on hover when tabs exceed panel width.
- **Content Area**: Centered and constrained to `700px` for optimal readability at any window size.

### Visual Language: "Borderless Zebra"
- **Grid Structure**: No horizontal lines or borders between sections.
- **Zebra Striping**: Very faint `rgba(128,128,128, 0.02)` tint on even rows for optical grouping.
- **Interaction**: Subtle `var(--color-bg-hover)` highlight on row hover.
- **Inputs**: Borderless and lightly tinted (`0.05`) by default. Blue stroke appears ONLY on focus.
- **Toggles**: Custom blue pill design (`var(--color-accent)`) with white circular knobs.

### UX Behavior
- **Toggle Visibility**: `F9` (Settings) and `F1` (Help) act as toggles; hitting the key while the page is open will close it.
- **Shortcut Editor**: Vertical list with monospace fields and zebra striping for rapid key remapping.

---

## Git Repository
- **GitHub**: https://github.com/sterling-max/max-commander (private)

## Gemini Added Memories
- **Debugging Rule**: DO NOT REIMPLEMENT or REWRITE existing features when debugging. Verify state and fix logic errors only.
- **Style Rule**: DO NOT TOUCH STYLES or change theme variables unless explicitly instructed.
- **Regression Rule**: Trace functionality loss through git history or logic analysis rather than assuming it needs rebuilding.
- **Changelog Rule**: After every feature commit, you MUST update `src/features/pages/changelogData.ts` with a new entry (or update the latest) using customer-facing, non-technical language.
- **Feature Check**: Before "fixing" a feature (like autoPlay), verify if the user considers the current behavior broken or just glitchy.
- **Windows 11 Environment**: User runs Windows 11. Always use PowerShell commands (not bash/Linux). If a tool is needed, ask the user to install it rather than assuming availability.
- **Plugin Spec Rule**: `docs/plans/plugin_architecture.md` is the SOURCE OF TRUTH for all plugin-related features. NEVER implement a plugin feature without updating this spec first. It serves as the base for developer documentation.

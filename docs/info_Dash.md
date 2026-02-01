# Project Memory: Sterling Apps - Dash

> **Previously known as:** *winJelly*
> **Version:** 2.1 (Modules & Rebranding)

## 1. Vision & Architecture
**Dash** is a modular "Start Menu for your Day." It is an extensible shell for "Applets" that assist everyday tasks.

### Core Philosophy
- **Modular by Design**: The "Shell" (`core`) is agnostic. Functionality comes from "Modules" (`modules/jellyfin`, `modules/worktools`).
- **Aesthetic First**: Windows 11 Acrylic/Mica style, rich animations, sub-pixel precision.
- **Privacy & Speed**: Local-first where possible. Direct connections.

### Directory Structure (The "Pod" Pattern)
```text
/src
  /core                 # The "Shell" - Host application
     /components        # Generic UI Kit (Buttons, Modal, GlassPill, ScrollArea)
     /layout            # Main Window Layout (Sidebar, Footer with Module Switcher)
     /styles            # Shared Styles (shared-components.css)
     /utils             # Shared Utils (icons.tsx)
     /store             # Core Settings (Theme, EnabledModulesRegistry)
     
  /modules              # The "Applets"
     /jellyfin          # [Module] Jellyfin Client (The "Model")
     /worktools         # [Module] Productivity Tools (Notes, Jira, Time, Todo)
        /components     # WorkToolsHome (Shell), Sub-tools
        index.tsx       # Entry Point
```

## 2. Abstractions & Surfaces
Future modules should leverage these shared surfaces provided by `core` and `shared-components.css`:

### A. Surfaces (Where Modules Live)
1.  **Dashboard Widget**: A standardized card rendered on the "Start Menu" / Home Grid. (e.g. "Continue Watching").
2.  **Full View (Route)**: A dedicated full-screen experience.
    *   *Examples*: `/` (Jellyfin Home), `/worktools` (WorkTools Home).
    *   *WorkTools Home*: Follows the "Model" styling with Pinned Bar + Content Area.
3.  **Footer Switcher**: Icons in the bottom bar to switch between enabled modules.
    *   Briefcase = WorkTools.
    *   Play Circle = Jellyfin.

### B. Shared Resources
*   **Styles**: `core/styles/shared-components.css` (App Items, Section Headers, Modals).
*   **Icons**: `core/utils/icons.tsx` (Centralized `PRESET_ICONS` and `getLibraryIcon`).
*   **Store**: `settingsStore` manages `enabledModules`, `pinnedItems` (generic), and `iconOverrides`.

## 3. Implementation Status
- [x] **Rebranding**: App renamed to "Dash" (`tauri.conf.json`, Store defaults).
- [x] **Architecture**: Core + Modules structure established.
- [x] **Settings UI**: Refactored to Sidebar Layout (165px). Added "Enable/Disable Module" logic.
- [x] **WorkTools Module**:
    - [x] Scaffolded `WorkToolsHome`.
    - [x] Implemented "Model" UI (Pinned Bar, All Tools Grid, Context Menus).
    - [x] Nested Routing (`/worktools/notes`, etc.).
- [x] **Jira Module**:
    - [x] Link Store (Folders & Links).
    - [x] External Link Drag-and-Drop (Solution: `dragDropEnabled: false` in `tauri.conf.json`).
    - [x] Metadata Extraction (Key parsing & Title fetching).
- [x] **Project Tracker Module**:
    - [x] HUD with expandable project cards.
    - [x] Bi-directional integration with ToDos, Links, and Vault.
- [x] **Data Folder Architecture**:
    - [x] File-system-based sync for WorkTools stores (JSON).
    - [x] Global "Dash Data Folder" setting.
- [x] **Module Switcher**: Implemented in Footer.
- [x] **External Player Support**: 
    - [x] Rust backend commands for launching and path verification.
    - [x] Expandable Preset UI with auto-detection (VLC, MPC-HC, foobar2000, etc.).
    - [x] Global integration in Jellyfin module.

## 4. Next Steps (Pending Tasks)
1.  **WorkTools Logic Phase**:
    - [ ] **Notes**: Implement full Markdown persistent storage (Save/Load to local files).
    - [x] **Time Tracker**: Add "Start/Stop" logic to the new horizontal UI.
    - [x] **To Do**: Implement task persistence and archive logic (Internal sync via Data Folder).
    - [x] **Project Tracker**: Integration with other tools.
2.  **Dashboard Integration**:
    - [ ] Add "Currently Tracking" widget to the Start Menu.
    - [ ] Add "Continue Watching" (Jellyfin) vs "Next Task" (Jira) toggle logic.
3.  **Refinement**:
    - [x] **WorkTools Settings**: Create `WorkToolsSettings.tsx` for global preferences.

## 5. Coding Standards & Habits
- **Check Problems Tab**: Always check the "Problems" tab (lint/compile errors) before finishing a step. ensuring no unused imports or syntax errors remain.

## 6. Detailed Specifications (New)

### A. Core / Global Settings
- [ ] **Default Module**:
    - Add a setting to choose which module opens on launch (`Settings` -> `General` -> `Default Module`).
    - Options: "Media Center" (Jellyfin), "WorkTools".
    - Implementation: Route `/` acts as a dispatcher.

### B. Module: To Do
*Common, essential tool.*
- **Features**:
    - [ ] Create, Edit, Dismiss, Delete/Archive tasks.
    - [ ] "Scan Pending": A mode to review what's left.
    - [ ] History / Completed log.
- **UX/UI**:
    - Rich aesthetics (Mica/Acrylic), fluid animations for checking off tasks.
    - Priority indicators, categories/tags.

### C. Module: Notes
*Hierarchical Markdown Editor.*
- **Features**:
    - [x] **Root Folder**: User selects a local folder (saved in settings).
    - [x] **Sidebar**: Recursive file tree of the root folder.
        - Show folder names as titles.
        - Icons indicating file format.
    - **Editor**:
        - [x] Simple Text/Markdown editor.
        - [x] Toggle: "Edit" vs "Preview" (rendered Markdown).
        - [x] Auto-save on edit.
    - **Navigation**: Quick jump between files.

### D. Module: Jira
*Bookmark Manager for Issues.*
- **Phase 1**:
    - [x] **Link Store**: Hierarchical storage (folders) for Jira links.
    - [x] **Extraction**: Extract/Store description/title from link (or manual entry).
    - [x] **Purpose**: "Keep track of current Jira tasks the user is working on."

### E. Module: Time Tracker
*Visual Day Planner.*
- **Features**:
    - [x] **The Tank**: Visual representation of the day (e.g. 8h cap). Fills up as time is tracked.
    - [x] **Entities**: Track time against "Common Tasks" or linked "Jira Issues".
    - [x] **Switching Panel**: Quick switcher for current active task.
    - [x] **History**: Visual log of past days.
    - [x] **Logic**: Start/Stop, Resume (Accumulate), Midnight Rollover, "Set Holiday" & "Fill Timesheet".
- **UX**:
    - [x] Unified Header (Day Progress | Timeline).
    - [x] Suggestion Dropdown with Jira Integration (Key + Summary).
    - [x] High-visibility "Current Active Task" indicator.

### F. Module: Jellyfin (Media Center)
- [x] **External Player Support**:
    - [x] **Presets**: VLC, MPC-HC, MPV, PotPlayer (Video); foobar2000, MusicBee, Winamp (Audio).
    - [x] **Auto-Detection**: Smart scan of standard installation paths.
    - [x] **UX**: Compact, expandable selection cards.
    - [x] **Fallback**: Gracious fallback to internal player if external fails.

---
*Updated by Antigravity for Sterling Apps*

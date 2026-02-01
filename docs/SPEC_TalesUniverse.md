# Tales Universe Solution Specification

## 1. Solution Overview
- **Solution Name:** Tales Universe
- **Description:**
  Tales Universe is a children-safe mobile library of interactive stories, designed for parents and children to explore, read, and enjoy fairy tales. The app features a vibrant, fairy-tale-inspired design, easy navigation, and interactive features such as AI-generated alternative endings and a virtual coin system for unlocking content.

## 2. Target Platforms
- [x] Android
- [x] iOS

## 3. Purpose and Goals
- **Main Purpose:**
  To provide a safe, engaging, and interactive digital library of children’s stories for families.
- **Key Goals:**
  - Offer a curated, local collection of children’s stories with a free starter bundle.
  - Enable users to discover, read, and favorite stories by category and search.
  - Allow users to generate AI-powered alternative endings using virtual coins.
  - Provide a seamless, parent-friendly experience with easy navigation and accessibility.

## 4. Core Features
- Home screen with:
  - Hero image presenting the section.
  - Tappable, circular sliding row of story categories (with labels) to filter new and favorite stories.
  - Vertical list of new and favorite stories, filtered by selected category.
  - Persistent bottom menu for navigation.
- Tales library:
  - Category filter (same as home screen).
  - Prominent search box for story lookup.
- Read page:
  - Display selected story with summary (including estimated reading time in minutes).
  - Like button (pops up child selector if more than one child is configured).
  - Option to generate AI alternative endings using virtual coins (no limit if coins are available).
- Store page:
  - Purchase virtual coin packages and story bundles (using platform in-app purchases).
- Settings page:
  - Manage list of children for tracking favorites.
- All pages:
  - Hero image for each section.
  - Persistent bottom menu.

## 5. User Roles & Personas
- **Primary Users:** Parents (with or without children), children (with parental guidance).
- **User Personas:**
  - Parent in their 30s-40s seeking quality storytime content.
  - Child (with parent) exploring and favoriting stories.

## 6. User Journey / Flow
- User opens app and lands on home screen with hero image and category slider.
- User browses or searches for stories by category or keyword.
- User selects a story to read, can like it (choosing which child if multiple are set up).
- User can generate alternative endings using coins.
- User visits store to purchase coins or bundles.
- User manages children profiles in settings.

## 7. Technical Requirements
- **Mobile Framework:** (To be decided: Recommend FLUTTER for maintainability, cross-platform support, and your experience. React Native or Flutter are also options if you want broader community support.)
- **APIs / Integrations:**
  - In-app purchases (Google Play Store, Apple App Store).
  - AI service for generating alternative endings (to be specified).
- **Data Storage:**
  - Local JSON files for stories and user data .
  - Access control for purchased/unlocked content.
  - Story content organized by language for easy internationalization.
- **Authentication:**
  - No authentication required initially; optional local user (child) profiles for favorites tracking.
  - Platform authentication for IAP 

## 8. UI/UX Considerations
- **Design Style:** Fairy tale, bright colors, geometric shapes. Base images and palette to be provided (see `spec/assets/`).
- **Accessibility:**
  - Easy-to-read fonts for adults (30s-40s).
  - Large, tappable controls for children.
- **Navigation Structure:**
  - Persistent bottom menu on all pages.
  - Hero image at the top of each section.

## 9. Monetization (if any)
- In-app purchases for virtual coins and story bundles (consumable items via Play Store/App Store).

## 10. Success Metrics
- Number of active users and stories read.
- Number of alternative endings generated.
- In-app purchase conversion rate.
- User satisfaction (ratings, reviews).

## 11. Risks & Challenges
- Ensuring all content is children-safe and appropriate.
- Managing in-app purchases and access control reliably.
- Providing a seamless, bug-free experience across Android and iOS.
- Integrating and maintaining AI-generated content.

## 12. Roadmap / Milestones
- Finalize UI/UX design and palette.
- Implement core navigation and home/library/read/store/settings pages.
- Integrate local story content and in-app purchase system.
- Add AI alternative endings feature.
- Test accessibility and usability.
- Launch MVP with free bundle and store.

# Reader Page UI/UX Update 

## Reader Page Layout Improvements
- Like/Favorite action is now a Floating Action Button (FAB) at the bottom right, decluttering the info area and improving accessibility.
- Title, summary, and reading time are grouped in a styled card (Frame) for a modern, visually appealing look.
- Reading time now includes a clock icon for clarity.
- FAB pops up a child selector if more than one child is configured.

## Next Steps
- Continue UI/UX polish and accessibility improvements.
- Integrate child selector logic and AI features as planned.

# Added: Reader Page Enhancements 

## Reader Page Feature Enhancements

- Like/Favorite button with child selector logic to allow users to favorite stories per child profile.
- Display of estimated reading time and story summary/description.
- Integration of AI service calls for generating alternative endings and images.
- All user-facing strings to be bound to resource files for full internationalization.
- Reader Page prepared to receive and apply settings from a repository/service (via dependency injection).
- Accessibility improvements: font sizes, color contrast, touch targets.
- UI/UX polish and extensibility for future features.

## Asset & Content Management

- All assets and content are now referenced via MAUI resource paths (e.g., `Resources/Images/`, `Resources/Raw/`).
- Dynamic language selection for categories and stories based on UI culture.

## Version Control

- Project is now tracked on GitHub with a standard  `.gitignore`.

---

**Next Steps:**
- Implement and test Reader Page enhancements as described above.
- Continue UI/UX and accessibility improvements.



---

# Tales Universe - Virtual Coin Economy & Content Management 

## Overview
Implementation of a comprehensive virtual coin economy system with AI-generated content management for Tales Universe mobile application.

## 🏗️ Current Implementation Status


### ❌ **NOT IMPLEMENTED:**
- AI Service with multi-provider support (OpenAI, Anthropic, Stability AI)
- StoryService with centralized story management  
- Basic coin display in ReaderPage header
- FAB system for AI generation (images and alternative endings)
- SettingsService with coin storage in settings.json
- Image generation with base64/URL support
- Alternative ending generation
- Market page UI with coin packages
- Story bundle system via packages.json
- Google Play Store integration for coin purchases
- Generated content local storage and management
- Content browsing UI (image carousels, ending lists)
- Coin transaction system
- Restore purchases functionality
- Content export/sharing features

## 💰 Virtual Coin Economy

### Coin Packages (Market Page Integration)
Based on existing `coin_packages.json` structure:
```json
Pricing Structure (Configurable):
- 5 Coins: $0.99
- 10 Coins: $1.99  
- 50 Coins: $9.99
- 100 Coins: $17.99
```

### Coin Usage Pricing
```
AI Features:
- Image Generation: 15 coins
- Alternative Ending: 20 coins
- Future Character Descriptions: 10 coins
```

### Coin Acquisition Methods
```
In-App Purchases (Primary):
- Integration with existing Market page UI
- Google Play Billing Library v5
- Purchase validation and receipt verification
- Restore purchases across devices

Future Rewards (Next Version):
- Daily login bonuses
- Story completion rewards
- Achievement unlocks
```

## 🗄️ Data Storage Strategy

### JSON-Based Approach (Recommended)
Extends existing JSON file architecture for simplicity and consistency:

```
Storage Structure:
├── settings.json (existing - enhanced with coin transactions)
├── generated_content.json (new - metadata for generated content)
├── /LocalData/
│   ├── /GeneratedImages/
│   │   ├── story_123_001.png
│   │   ├── story_123_002.png
│   │   └── /thumbnails/
│   │       ├── story_123_001_thumb.png
│   │       └── story_123_002_thumb.png
│   └── /AlternativeEndings/
│       ├── story_123_001.txt
│       └── story_123_002.txt
```

### Generated Content JSON Schema
```json
{
  "images": [
    {
      "id": "uuid",
      "storyId": 123,
      "fileName": "story_123_001.png",
      "thumbnailPath": "thumbnails/story_123_001_thumb.png",
      "prompt": "Scene description...",
      "dateCreated": "2024-12-01T10:30:00Z",
      "provider": "StabilityAI"
    }
  ],
  "endings": [
    {
      "id": "uuid", 
      "storyId": 123,
      "title": "The Magical Resolution",
      "fileName": "story_123_001.txt",
      "prompt": "Alternative ending for...",
      "dateCreated": "2024-12-01T11:15:00Z",
      "provider": "Anthropic"
    }
  ]
}
```

### Transaction Logging (Optional - Simple Implementation)
```json
Enhanced settings.json:
{
  "coins": 150,
  "coinTransactions": [
    {
      "type": "purchase",
      "amount": 50,
      "description": "50 Coin Package",
      "timestamp": "2024-12-01T09:00:00Z"
    },
    {
      "type": "spent", 
      "amount": -15,
      "description": "Image Generation - Story: Cinderella",
      "timestamp": "2024-12-01T10:30:00Z"
    }
  ]
}
```

## 🎨 UI/UX Enhancements

### ReaderPage Content Management
```
Enhanced Reader Layout:
├── Story Content (existing)
├── Generated Images Section
│   ├── Thumbnail carousel (horizontal ScrollView)
│   ├── Tap thumbnail → Full-screen image viewer popup
│   ├── Image count indicator: "3 images generated"
│   └── Generate new image FAB (15 coins)
└── Alternative Endings Section  
    ├── "Alternative Endings" expandable section
    ├── List with auto-generated titles:
    │   ├── "A Magical Resolution" (Dec 1)
    │   ├── "The Friendship Ending" (Nov 28)
    │   └── "The Adventure Continues" (Nov 25)
    ├── Tap ending → Full-screen text viewer popup
    └── Generate new ending FAB (20 coins)
```

### Market Page Integration
```
Enhanced Market Page:
├── Current Coins Display (prominent)
├── Coin Packages Section (existing UI)
├── Story Bundles Section (existing)
├── "Restore Purchases" button
└── Purchase success/error handling
```

### Content Viewer Components
```
New UI Components:
├── ImageCarouselView: Horizontal thumbnail gallery
├── ImageViewerPopup: Full-screen image with zoom/pan
├── EndingsListView: Expandable list with generated titles
├── EndingViewerPopup: Full-screen text viewer
└── CoinIndicatorComponent: Reusable coin display
```

## ⚙️ Technical Implementation

### New Services Architecture
```
Service Layer:
├── CoinService: Centralized coin management
│   ├── GetCoinBalance()
│   ├── DeductCoins(amount, description)
│   ├── AddCoins(amount, description) 
│   └── GetTransactionHistory()
├── BillingService: Google Play integration
│   ├── InitializeBilling()
│   ├── PurchaseCoins(packageId)
│   ├── RestorePurchases()
│   └── ValidateReceipt()
├── ContentStorageService: Generated content management  
│   ├── SaveGeneratedImage(storyId, imageData, prompt)
│   ├── SaveAlternativeEnding(storyId, content, prompt)
│   ├── GetStoredImages(storyId)
│   ├── GetStoredEndings(storyId)
│   ├── DeleteContent(contentId)
│   └── GenerateThumbnail(imagePath)
└── Enhanced StoryService:
    ├── Link generated content to stories
    └── Content cleanup and management
```

### Enhanced Existing Services
```
SettingsService Extensions:
├── Coin transaction logging
├── Generated content metadata storage
└── Purchase history tracking

AiService Extensions:  
├── Return generation metadata for storage
├── Provider usage tracking
└── Error handling improvements
```

## 🔄 Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Create CoinService with JSON-based storage
- [ ] Implement ContentStorageService 
- [ ] Add thumbnail generation for images
- [ ] Enhanced coin display throughout app
- [ ] Basic content storage after AI generation

### Phase 2: UI Components (Week 1-2)
- [ ] ImageCarouselView component
- [ ] ImageViewerPopup component  
- [ ] EndingsListView component
- [ ] EndingViewerPopup component
- [ ] Integrate components into ReaderPage

### Phase 3: Store Integration (Week 2)
- [ ] BillingService implementation
- [ ] Google Play Billing Library integration
- [ ] Purchase flow implementation
- [ ] Restore purchases functionality
- [ ] Receipt validation

### Phase 4: Polish & Testing (Week 2-3)
- [ ] Content management features (delete, export)
- [ ] Performance optimization
- [ ] Error handling and edge cases
- [ ] Comprehensive testing across devices
- [ ] Play Store submission preparation

## 🔒 Google Play Store Integration

### Billing Library Implementation
```
Google Play Billing v5:
├── BillingClient setup and connection
├── SKU details retrieval for coin packages
├── Purchase flow initiation
├── Purchase acknowledgment 
├── Consumption of purchased coins
└── Restore purchases for existing users
```

### Purchase Validation
```
Security Measures:
├── Server-side receipt verification (recommended)
├── Local signature validation (fallback)
├── Purchase token storage and tracking
└── Duplicate purchase prevention
```

### Compliance Requirements
```
Play Store Policies:
├── Clear virtual currency disclosure
├── Honest pricing representation
├── No gambling or random rewards
├── Age-appropriate content only
└── Proper parental controls
```

## 📊 Content Management Features

### Auto-Generated Titles for Endings
```
Title Generation Logic:
├── Extract key themes from ending content
├── Use simple patterns: "The [Adjective] [Noun]"
├── Examples: "The Magical Resolution", "The Brave Adventure"
├── Fallback: "Alternative Ending #N" with timestamp
```

### Content Lifecycle Management
```
Storage Management:
├── Automatic thumbnail creation for images
├── Content cleanup after 30 days (configurable)
├── Storage usage monitoring and warnings
├── Export to device gallery option
└── Content sharing with watermarks
```

### Performance Considerations
```
Optimization Strategies:
├── Lazy loading for image thumbnails
├── Efficient content caching
├── Background thumbnail generation
├── Async file operations
└── Memory management for large images
```

## 🚀 Migration Strategy (Non-Disruptive)

### Backwards Compatibility
```
Migration Approach:
├── Preserve existing coin storage in settings.json
├── Generate metadata for any existing generated content
├── Graceful fallbacks for missing content files
├── Version-aware JSON schema handling
└── Safe upgrade path for existing users
```

### Deployment Strategy
```
Release Plan:
├── Internal testing with generated content
├── Beta testing with selected users
├── Gradual rollout of store integration
├── Monitor performance and user feedback
└── Full release with comprehensive documentation
```

---

**Implementation Priority:**
1. Content storage and UI components (core user value)
2. Google Play Store integration (monetization)
3. Polish and optimization (user experience)

**Success Metrics:**
- Generated content engagement rates
- Coin purchase conversion rates  
- User retention after purchasing coins
- Content creation frequency per user

This specification provides a comprehensive roadmap for implementing the virtual coin economy while maintaining the existing architecture's simplicity and extending it thoughtfully for the new features.

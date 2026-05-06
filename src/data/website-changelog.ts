export interface WebsiteVersion {
  version: string;
  date: string;
  changes: string[];
}

export const websiteChangelog: WebsiteVersion[] = [
  {
    version: "1.0.18",
    date: "2026-05-06",
    changes: [
      "Added product-agnostic Sterling Lab support intake with a shared feedback API",
      "Added the official Max Commander plugin catalog for Pro plugins with free downloads",
      "Added admin plugin catalog management for R2-hosted .mcx packages",
      "Published Max Commander 0.8.11 support and plugin catalog metadata"
    ]
  },
  {
    version: "1.0.17",
    date: "2026-05-02",
    changes: [
      "Added 'Secured by Stripe' badge to pricing sections",
      "Compacted pricing cards and Thanks page layouts to improve visibility",
      "Disabled Standard license purchase temporarily to focus on Founder edition"
    ]
  },
  {
    version: "1.0.16",
    date: "2026-05-02",
    changes: [
      "Added dedicated /thanks page for post-checkout redirection",
      "Fixed Stripe checkout status passing to prevent Cloudflare Edge HTML overrides"
    ]
  },
  {
    version: "1.0.15",
    date: "2026-05-02",
    changes: [
      "Implemented direct Stripe checkout and webhook handling for Max Commander 0.8.10",
      "Activated paid checkout buttons and removed coming soon messaging"
    ]
  },
  {
    version: "1.0.14",
    date: "2026-05-01",
    changes: [
      "Published Max Commander 0.8.10 update metadata for in-app updates",
      "Updated the public Max Commander changelog with navigation, filtering, and tooltip polish"
    ]
  },
  {
    version: "1.0.13",
    date: "2026-04-30",
    changes: [
      "Paused Max Commander paid checkout while direct Stripe payments are prepared",
      "Kept the free Windows download available and added paid-license coming-soon messaging"
    ]
  },
  {
    version: "1.0.12",
    date: "2026-04-30",
    changes: [
      "Published Max Commander 0.8.9 update metadata for in-app updates",
      "Updated the public Max Commander changelog with installed app and update flow polish",
      "Added release metadata checks for future Max Commander website publishing"
    ]
  },
  {
    version: "1.0.11",
    date: "2026-04-29",
    changes: [
      "Published Max Commander 0.8.8 update metadata for in-app updates",
      "Updated the public Max Commander changelog with updater and license activation polish"
    ]
  },
  {
    version: "1.0.10",
    date: "2026-04-29",
    changes: [
      "Updated the Max Commander product page to the 0.8.7 release line",
      "Refreshed the public Max Commander changelog with the latest major user-facing releases",
      "Prepared latest-version messaging for future in-app update checks"
    ]
  },
  {
    version: "1.0.9",
    date: "2026-04-07",
    changes: [
      "Synced Max Commander product changelog and version to 0.8.1",
      "Updated Cloudflare version endpoint to reflect latest release notes"
    ]
  },
  {
    version: "1.0.8",
    date: "2026-03-24",
    changes: [
      "Synced Max Commander product changelog and version to 0.7.8",
      "Fixed critical UI stability issues and restored taskbar branding"
    ]
  },
  {
    version: "1.0.7",
    date: "2026-03-23",
    changes: [
      "Synced Max Commander product changelog and version to 0.7.7",
      "Optimized plugin management documentation for Sterling Lab members"
    ]
  },
  {
    version: "1.0.6",
    date: "2026-03-22",
    changes: [
      "Synced Max Commander product changelog and version to 0.7.5",
      "Fixed visibility issue for version numbers in the changelog modal under Light Theme"
    ]
  },
  {
    version: "1.0.5",
    date: "2026-03-19",
    changes: [
      "Added client-side cache buster to download URL for instant updates",
      "Fixed redundant scroll logic on free plan checkout"
    ]
  },
  {
    version: "1.0.4",
    date: "2026-03-19",
    changes: [
      "Added timestamped version verification to diagnostics",
      "Confirmed sorting logic for v-prefixed release folders"
    ]
  },
  {
    version: "1.0.3",
    date: "2026-03-19",
    changes: [
      "Added x-version debug header to download worker for troubleshooting",
      "Reinforced no-cache policy for binary downloads"
    ]
  },
  {
    version: "1.0.2",
    date: "2026-03-19",
    changes: [
      "Disabled caching for download binary to ensure latest version is always fetched",
      "Fixed small layout inconsistencies in the footer version tag"
    ]
  },
  {
    version: "1.0.1",
    date: "2026-03-19",
    changes: [
      "Fixed Max Commander download worker logic for R2 robustness",
      "Added direct download button to License Management dashboard",
      "Simplified Pricing Page download trigger for better browser compatibility",
      "Added footer versioning system"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-03-14",
    changes: [
      "Initial launch of the Sterling Lab website",
      "Product showcase for Max Commander, Dash, Zap Studio",
      "Merchant of Record billing integration",
      "License management system"
    ]
  }
];

export const LATEST_WEBSITE_VERSION = websiteChangelog[0].version;

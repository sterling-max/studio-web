export interface WebsiteVersion {
  version: string;
  date: string;
  changes: string[];
}

export const websiteChangelog: WebsiteVersion[] = [
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
      "Paddle billing integration",
      "License management system"
    ]
  }
];

export const LATEST_WEBSITE_VERSION = websiteChangelog[0].version;

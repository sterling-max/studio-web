export interface WebsiteVersion {
  version: string;
  date: string;
  changes: string[];
}

export const websiteChangelog: WebsiteVersion[] = [
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

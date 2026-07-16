/**
 * Demonstration report cadences.
 * These configurations describe interface options only.
 */

const baseFeatures = {
  sampleDataOnly: true,
  persistentDemonstrationLabel: true,
  externalUseApproved: false
};

export const reportTypes = {
  pickup: {
    name: 'Sample Pickup Record',
    description: 'Fictional single-event record layout',
    icon: 'PICKUP',
    maxPages: 3,
    defaultSections: ['executiveSummary', 'assetTracking'],
    requiredSections: ['executiveSummary'],
    dataRequirements: { sampleRecords: true },
    timeframe: 'single-event',
    features: { ...baseFeatures, itemizedList: true }
  },
  monthly: {
    name: 'Sample Monthly Summary',
    description: 'Fictional monthly workflow summary layout',
    icon: 'MONTH',
    maxPages: 4,
    defaultSections: ['executiveSummary', 'kpis', 'assetTracking'],
    requiredSections: ['executiveSummary'],
    dataRequirements: { sampleRecords: true },
    timeframe: 'monthly',
    features: { ...baseFeatures, trendLayout: true }
  },
  quarterly: {
    name: 'Sample Quarterly Summary',
    description: 'Fictional quarterly workflow and review-gate layout',
    icon: 'QUARTER',
    maxPages: 6,
    defaultSections: ['executiveSummary', 'kpis', 'assetTracking', 'compliance'],
    requiredSections: ['executiveSummary'],
    dataRequirements: { sampleRecords: true, approvals: true },
    timeframe: 'quarterly',
    features: { ...baseFeatures, reviewGate: true }
  },
  semiAnnual: {
    name: 'Sample Semi-Annual Summary',
    description: 'Fictional six-month workflow and review-gate layout',
    icon: 'HALF-YEAR',
    maxPages: 8,
    defaultSections: ['executiveSummary', 'kpis', 'assetTracking', 'compliance', 'recommendations'],
    requiredSections: ['executiveSummary'],
    dataRequirements: { sampleRecords: true, approvals: true },
    timeframe: 'semi-annual',
    features: { ...baseFeatures, reviewGate: true }
  },
  annual: {
    name: 'Sample Annual Summary',
    description: 'Fictional annual workflow and next-action layout',
    icon: 'YEAR',
    maxPages: 10,
    defaultSections: ['executiveSummary', 'kpis', 'assetTracking', 'compliance', 'recommendations'],
    requiredSections: ['executiveSummary'],
    dataRequirements: { sampleRecords: true, approvals: true },
    timeframe: 'annual',
    features: { ...baseFeatures, reviewGate: true }
  }
};

export function getReportType(type) {
  return reportTypes[type] || null;
}

export function getAllReportTypes() {
  return Object.keys(reportTypes).map(key => ({ key, ...reportTypes[key] }));
}

export function isValidReportType(type) {
  return type in reportTypes;
}

export function getReportTypesByFeature(feature) {
  return getAllReportTypes().filter(type => type.features?.[feature]);
}

export function getReportTypesByTimeframe(timeframe) {
  return getAllReportTypes().filter(type => type.timeframe === timeframe);
}

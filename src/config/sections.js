/**
 * Sanitized report-section configuration.
 * Section availability is a product-design artifact, not evidence that source
 * data, operating controls, outcomes, or external approvals exist.
 */

export const sections = {
  executiveSummary: {
    name: 'Demonstration Summary',
    description: 'Fictional overview with a persistent demonstration label',
    icon: 'INFO',
    required: true,
    category: 'overview',
    estimatedPages: 0.5,
    dependencies: [],
    dataRequirements: { summary: true },
    features: { charts: false, tables: false, interactive: false }
  },
  kpis: {
    name: 'Sample Workflow Measures',
    description: 'Illustrative intake, assessment, disposition, and exception counts',
    icon: 'DATA',
    required: false,
    category: 'metrics',
    estimatedPages: 1,
    dependencies: [],
    dataRequirements: { sampleRecords: true },
    features: { charts: true, tables: false, interactive: true }
  },
  environmentalImpact: {
    name: 'Methodology Review Placeholder',
    description: 'Reserved for governed calculations after source and reviewer approval',
    icon: 'REVIEW',
    required: false,
    category: 'governance',
    estimatedPages: 1,
    dependencies: [],
    dataRequirements: { approvedMethodology: true },
    features: { charts: false, tables: true, interactive: false }
  },
  assetTracking: {
    name: 'Sample Record Tracking',
    description: 'Fictional record states and ownership fields',
    icon: 'RECORDS',
    required: false,
    category: 'operational',
    estimatedPages: 1,
    dependencies: [],
    dataRequirements: { sampleRecords: true },
    features: { charts: false, tables: true, interactive: false }
  },
  financialImpact: {
    name: 'Value Record Review Placeholder',
    description: 'Reserved for approved source fields; no outcome is calculated here',
    icon: 'REVIEW',
    required: false,
    category: 'governance',
    estimatedPages: 1,
    dependencies: [],
    dataRequirements: { approvedSources: true },
    features: { charts: false, tables: true, interactive: false }
  },
  csrImpact: {
    name: 'Stakeholder Notes Placeholder',
    description: 'Reserved for reviewed stakeholder records and approvals',
    icon: 'NOTES',
    required: false,
    category: 'governance',
    estimatedPages: 1,
    dependencies: [],
    dataRequirements: { approvedSources: true },
    features: { charts: false, tables: true, interactive: false }
  },
  compliance: {
    name: 'Governance Review',
    description: 'Source, owner, scope, date, validation, and approval status',
    icon: 'GATE',
    required: false,
    category: 'governance',
    estimatedPages: 1,
    dependencies: [],
    dataRequirements: { approvals: true },
    features: { charts: false, tables: true, interactive: false }
  },
  recommendations: {
    name: 'Next-Action Review',
    description: 'Proposed actions that remain subject to owner approval',
    icon: 'NEXT',
    required: false,
    category: 'strategic',
    estimatedPages: 1,
    dependencies: [],
    dataRequirements: { owners: true },
    features: { charts: false, tables: true, interactive: false }
  }
};

export const sectionCategories = {
  overview: { name: 'Overview', description: 'Demonstration summary', icon: 'INFO', color: '#3498db' },
  metrics: { name: 'Sample measures', description: 'Fictional workflow counts', icon: 'DATA', color: '#327963' },
  operational: { name: 'Operational records', description: 'Sample record structure', icon: 'OPS', color: '#f39c12' },
  governance: { name: 'Governance gates', description: 'Source and approval requirements', icon: 'GATE', color: '#34495e' },
  strategic: { name: 'Next actions', description: 'Proposed owner-reviewed actions', icon: 'NEXT', color: '#8e44ad' }
};

export function getSection(sectionKey) {
  return sections[sectionKey] || null;
}

export function getAllSections() {
  return Object.keys(sections).map(key => ({ key, ...sections[key] }));
}

export function getSectionsByCategory(category) {
  return getAllSections().filter(section => section.category === category);
}

export function getRequiredSections() {
  return getAllSections().filter(section => section.required);
}

export function validateSectionDependencies(selectedSections) {
  const missing = [];
  selectedSections.forEach(sectionKey => {
    const section = sections[sectionKey];
    section?.dependencies?.forEach(dependency => {
      if (!selectedSections.includes(dependency)) {
        missing.push({ section: sectionKey, dependency, dependencyName: sections[dependency]?.name || dependency });
      }
    });
  });
  return { isValid: missing.length === 0, missing, warnings: [] };
}

export function calculateEstimatedPages(selectedSections) {
  return selectedSections.reduce((total, sectionKey) => total + (sections[sectionKey]?.estimatedPages || 0), 0);
}

export function getSectionsWithFeature(feature) {
  return getAllSections().filter(section => section.features?.[feature]);
}

/**
 * Demonstration Data Processor
 *
 * This prototype intentionally uses fictional records. It does not fetch or
 * represent live client, operating, assurance, financial, or environmental data.
 */

export class DataProcessor {
  constructor(config = {}) {
    this.config = config;
    this.cache = new Map();
  }

  async processForReport(reportType, options = {}) {
    const dateRange = options.dateRange || this.getDefaultDateRange();
    const sections = options.sections || { executiveSummary: true, kpis: true };
    const rawData = await this.fetchData(dateRange);

    const processedData = {
      metadata: this.generateMetadata(reportType, dateRange),
      client: rawData.client,
      sections: {},
      demonstration: true
    };

    for (const [sectionKey, enabled] of Object.entries(sections)) {
      if (enabled) processedData.sections[sectionKey] = this.processSection(sectionKey, rawData);
    }

    processedData.summary = this.calculateSummaryMetrics(rawData.records);
    return processedData;
  }

  async fetchData() {
    return {
      client: {
        id: 'SAMPLE-CLIENT-001',
        name: 'Fictional Sample Organization',
        status: 'DEMONSTRATION ONLY'
      },
      records: this.generateSampleRecords()
    };
  }

  processSection(sectionKey, rawData) {
    const summary = this.calculateSummaryMetrics(rawData.records);

    switch (sectionKey) {
      case 'executiveSummary':
        return {
          text: 'DEMONSTRATION ONLY: This fictional sample shows how intake, assessment, disposition, and exception records could be summarized. It is not an operating result or customer deliverable.',
          highlights: [
            { label: 'Sample intake records', value: summary.intake },
            { label: 'Sample assessment queue', value: summary.assessment },
            { label: 'Sample disposition drafts', value: summary.disposition },
            { label: 'Sample open exceptions', value: summary.exceptions }
          ]
        };

      case 'kpis':
        return {
          cards: [
            { label: 'Sample intake records', value: summary.intake },
            { label: 'Sample assessment queue', value: summary.assessment },
            { label: 'Sample disposition drafts', value: summary.disposition },
            { label: 'Sample open exceptions', value: summary.exceptions }
          ]
        };

      case 'assetTracking':
        return {
          notice: 'FICTIONAL SAMPLE RECORDS - no chain-of-custody or operating assurance is asserted.',
          records: rawData.records.slice(0, 8)
        };

      default:
        return {
          notice: 'DEMONSTRATION PLACEHOLDER - this section requires governed source data, a named owner, validation rules, and approval before external use.'
        };
    }
  }

  generateSampleRecords() {
    const statuses = ['intake', 'assessment', 'disposition-draft', 'exception'];
    return Array.from({ length: 120 }, (_, index) => ({
      id: `SAMPLE-${String(index + 1).padStart(4, '0')}`,
      category: ['Laptop', 'Desktop', 'Server', 'Mobile'][index % 4],
      status: statuses[index % statuses.length],
      fictional: true
    }));
  }

  calculateSummaryMetrics(records) {
    const count = status => records.filter(record => record.status === status).length;
    return {
      intake: records.length,
      assessment: count('assessment'),
      disposition: count('disposition-draft'),
      exceptions: count('exception')
    };
  }

  generateMetadata(reportType, dateRange) {
    return {
      reportName: `${reportType || 'workflow'} demonstration report`,
      reportSubtitle: 'FICTIONAL SAMPLE DATA - NOT FOR EXTERNAL USE',
      clientName: 'Fictional Sample Organization',
      dateRange,
      generatedAt: new Date().toISOString(),
      demonstration: true
    };
  }

  getDefaultDateRange() {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 30);
    return { startDate, endDate };
  }

  validateData(data) {
    const errors = [];
    if (!data || typeof data !== 'object') errors.push('Data must be an object');
    if (!Array.isArray(data?.records)) errors.push('records must be an array');
    return { isValid: errors.length === 0, errors, warnings: [] };
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.cache.clear();
  }
}

export default DataProcessor;

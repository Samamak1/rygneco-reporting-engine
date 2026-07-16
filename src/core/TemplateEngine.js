/**
 * Template Engine
 * Handles template rendering and HTML generation
 */

import Handlebars from 'handlebars';
import { formatDate, formatCurrency, formatNumber } from '../utils/formatters.js';

export class TemplateEngine {
  constructor(config) {
    this.config = config;
    this.handlebars = Handlebars.create();
    this.templates = new Map();
    this.partials = new Map();
    
    // Register helpers
    this.registerHelpers();
    
    // Register partials
    this.registerPartials();
    
    // Load templates
    this.loadTemplates();
  }

  /**
   * Register Handlebars helpers
   */
  registerHelpers() {
    // Date formatting
    this.handlebars.registerHelper('formatDate', (date, format) => {
      return formatDate(date, format);
    });

    // Currency formatting
    this.handlebars.registerHelper('formatCurrency', (amount) => {
      return formatCurrency(amount);
    });

    // Number formatting
    this.handlebars.registerHelper('formatNumber', (number, decimals) => {
      return formatNumber(number, decimals);
    });

    // Conditional helpers
    this.handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    this.handlebars.registerHelper('ifGreaterThan', function(arg1, arg2, options) {
      return (arg1 > arg2) ? options.fn(this) : options.inverse(this);
    });

    // Math helpers
    this.handlebars.registerHelper('add', (a, b) => a + b);
    this.handlebars.registerHelper('subtract', (a, b) => a - b);
    this.handlebars.registerHelper('multiply', (a, b) => a * b);
    this.handlebars.registerHelper('divide', (a, b) => a / b);
    this.handlebars.registerHelper('percentage', (value, total) => {
      return Math.round((value / total) * 100);
    });

    // Array helpers
    this.handlebars.registerHelper('first', (array) => array?.[0]);
    this.handlebars.registerHelper('last', (array) => array?.[array.length - 1]);
    this.handlebars.registerHelper('count', (array) => array?.length || 0);

    // String helpers
    this.handlebars.registerHelper('truncate', (str, length) => {
      if (!str || str.length <= length) return str;
      return str.substring(0, length) + '...';
    });

    this.handlebars.registerHelper('uppercase', (str) => str?.toUpperCase());
    this.handlebars.registerHelper('lowercase', (str) => str?.toLowerCase());

    // Chart data helper
    this.handlebars.registerHelper('toJSON', (object) => {
      return JSON.stringify(object);
    });

    // Progress bar width
    this.handlebars.registerHelper('progressWidth', (value, max = 100) => {
      return Math.min(Math.round((value / max) * 100), 100);
    });

    // Color coding helper
    this.handlebars.registerHelper('changeColor', (change) => {
      if (change > 0) return 'positive';
      if (change < 0) return 'negative';
      return 'neutral';
    });

    // Icon helper
    this.handlebars.registerHelper('icon', (type) => {
      const icons = {
        'success': '✓',
        'error': '✗',
        'warning': '⚠',
        'info': 'ℹ',
        'environmental': '🌍',
        'financial': '💰',
        'social': '🤝',
        'compliance': '✅'
      };
      return icons[type] || '•';
    });
  }

  /**
   * Register partial templates
   */
  registerPartials() {
    // Header partial
    this.handlebars.registerPartial('header', `
      <div class="header">
        <div class="logo">{{branding.logo}} {{branding.companyName}}</div>
        <div class="report-info">
          {{#if metadata.reportName}}{{metadata.reportName}}<br>{{/if}}
          {{#if metadata.dateRange}}
            {{formatDate metadata.dateRange.startDate}} - {{formatDate metadata.dateRange.endDate}}
          {{/if}}
        </div>
      </div>
    `);

    // Footer partial
    this.handlebars.registerPartial('footer', `
      <div class="footer">
        <strong>DEMONSTRATION / FICTIONAL SAMPLE DATA - NOT FOR EXTERNAL USE</strong><br>
        {{branding.companyName}} product-program prototype
      </div>
    `);

    // KPI Card partial
    this.handlebars.registerPartial('kpiCard', `
      <div class="kpi-card">
        <div class="kpi-value">{{value}}</div>
        <div class="kpi-label">{{label}}</div>
        {{#if change}}
          <div class="kpi-change {{changeClass}}">{{change}}</div>
        {{/if}}
      </div>
    `);

    // Data table partial
    this.handlebars.registerPartial('dataTable', `
      <table class="data-table">
        <thead>
          <tr>
            {{#each headers}}
              <th>{{this}}</th>
            {{/each}}
          </tr>
        </thead>
        <tbody>
          {{#each rows}}
            <tr {{#if highlight}}class="highlight"{{/if}}>
              {{#each cells}}
                <td>{{this}}</td>
              {{/each}}
            </tr>
          {{/each}}
        </tbody>
      </table>
    `);

    // Progress bar partial
    this.handlebars.registerPartial('progressBar', `
      <div class="progress-bar">
        <div class="progress-fill" style="width: {{progressWidth value max}}%;"></div>
      </div>
    `);
  }

  /**
   * Load template files
   */
  loadTemplates() {
    // Report layout template
    this.templates.set('report-layout', `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{metadata.reportName}} - {{metadata.clientName}}</title>
        <link rel="stylesheet" href="../styles/base.css">
        <link rel="stylesheet" href="../styles/components.css">
        <link rel="stylesheet" href="../styles/print.css" media="print">
        <style>
          .demonstration-notice {
            margin: 16px;
            padding: 12px;
            border: 2px solid #d59b00;
            background: #fff8dc;
            text-align: center;
            font-weight: 700;
          }
        </style>
      </head>
      <body>
        <div class="demonstration-notice">DEMONSTRATION / FICTIONAL SAMPLE DATA - NOT AN OPERATING OR CUSTOMER REPORT</div>
        {{#each sections}}
          {{{this}}}
        {{/each}}
        
        <script src="../assets/js/report-interactions.js"></script>
      </body>
      </html>
    `);

    // Executive Summary section template
    this.templates.set('section-executiveSummary', `
      <div class="page">
        <div class="page-number">Page {{pageNumber}} of {{totalPages}}</div>
        {{> header}}
        
        <div class="title">
          <h1>{{metadata.reportName}}</h1>
          <h2>{{metadata.clientName}} - {{metadata.reportSubtitle}}</h2>
        </div>
        
        <div class="executive-summary">
          <h3>{{icon 'info'}} Executive Summary</h3>
          <p>{{data.text}}</p>
        </div>
        
        {{#if data.highlights}}
          <div class="kpi-grid">
            {{#each data.highlights}}
              {{> kpiCard}}
            {{/each}}
          </div>
        {{/if}}
        
        {{> footer}}
      </div>
    `);

    // KPIs section template
    this.templates.set('section-kpis', `
      <div class="page">
        <div class="page-number">Page {{pageNumber}} of {{totalPages}}</div>
        {{> header}}
        
        <div class="section">
          <h3>{{icon 'info'}} Key Performance Indicators</h3>
          
          <div class="kpi-grid">
            {{#each data.cards}}
              <div class="kpi-card">
                <div class="kpi-value">{{value}}</div>
                <div class="kpi-label">{{label}}</div>
                {{#if change}}
                  <div class="kpi-change {{changeColor change}}">
                    {{#ifGreaterThan change 0}}↑{{else}}↓{{/ifGreaterThan}} {{Math.abs change}}%
                  </div>
                {{/if}}
              </div>
            {{/each}}
          </div>
          
          {{#if data.trends}}
            <div class="chart-container">
              <h4>Trend Analysis</h4>
              <div class="chart" data-chart-type="line" data-chart-data="{{toJSON data.trends}}"></div>
            </div>
          {{/if}}
        </div>
        
        {{> footer}}
      </div>
    `);

    // Governed-data placeholder. The prototype does not calculate or assert impact.
    this.templates.set('section-environmentalImpact', `
      <div class="page">
        <div class="page-number">Page {{pageNumber}} of {{totalPages}}</div>
        {{> header}}

        <div class="section">
          <h3>Governed Methodology Placeholder</h3>
          <div class="info-box">
            {{data.notice}}
            No impact value may be displayed without a documented source, boundary, methodology version, reviewer, and approval status.
          </div>
        </div>

        {{> footer}}
      </div>
    `);
  }

  /**
   * Render a template with data
   * @param {string} templateName - Name of template to render
   * @param {Object} data - Data for template
   * @returns {string} Rendered HTML
   */
  render(templateName, data) {
    let template = this.templates.get(templateName);
    if (!template && templateName.startsWith('section-')) {
      template = `
        <div class="page">
          {{> header}}
          <div class="section">
            <h3>Demonstration Section Placeholder</h3>
            <p>{{data.notice}}</p>
            <p><strong>FICTIONAL SAMPLE DATA - NOT FOR EXTERNAL USE</strong></p>
          </div>
          {{> footer}}
        </div>
      `;
    }
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }

    try {
      const compiled = this.handlebars.compile(template);
      return compiled(data);
    } catch (error) {
      console.error(`Template rendering error in ${templateName}:`, error);
      throw error;
    }
  }

  /**
   * Render a partial template
   * @param {string} partialName - Name of partial
   * @param {Object} data - Data for partial
   * @returns {string} Rendered HTML
   */
  renderPartial(partialName, data) {
    const partial = this.partials.get(partialName);
    if (!partial) {
      throw new Error(`Partial not found: ${partialName}`);
    }

    const compiled = this.handlebars.compile(partial);
    return compiled(data);
  }

  /**
   * Add custom template
   * @param {string} name - Template name
   * @param {string} template - Template content
   */
  addTemplate(name, template) {
    this.templates.set(name, template);
  }

  /**
   * Add custom partial
   * @param {string} name - Partial name
   * @param {string} partial - Partial content
   */
  addPartial(name, partial) {
    this.partials.set(name, partial);
    this.handlebars.registerPartial(name, partial);
  }

  /**
   * Compile and cache a template
   * @param {string} name - Template name
   * @param {string} template - Template content
   * @returns {Function} Compiled template function
   */
  compile(name, template) {
    const compiled = this.handlebars.compile(template);
    this.templates.set(name, compiled);
    return compiled;
  }

  /**
   * Update configuration
   * @param {Object} newConfig - New configuration
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }
}

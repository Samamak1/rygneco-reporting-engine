/**
 * Demo Script for E-Waste Reporting System
 * This creates a simple demo with sample data
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Create demo HTML with embedded sample report
const demoHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RYGNECO E-Waste Reporting System - Live Demo</title>
    <link rel="stylesheet" href="src/styles/base.css">
    <link rel="stylesheet" href="src/styles/components.css">
    <style>
        body { background: #f5f5f5; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .demo-header { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px; text-align: center; }
        .demo-section { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px; }
        .demo-controls { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .report-container { border: 2px solid #ecf0f1; border-radius: 8px; padding: 20px; background: white; }
    </style>
</head>
<body>
    <div class="container">
        <div class="demo-header">
            <h1>🌱 RYGNECO E-Waste Reporting System - Live Demo</h1>
            <p>Professional E-Waste Management Reporting Dashboard</p>
        </div>
        
        <div class="demo-section">
            <h2>📊 Interactive Report Builder</h2>
            <div class="demo-controls">
                <h3>Quick Actions:</h3>
                <div class="export-options">
                    <button onclick="showQuarterlyReport()" class="export-button primary">View Quarterly Report</button>
                    <button onclick="showMonthlyReport()" class="export-button secondary">View Monthly Report</button>
                    <button onclick="showAnnualReport()" class="export-button secondary">View Annual Report</button>
                    <button onclick="printReport()" class="export-button secondary">🖨️ Print Report</button>
                </div>
            </div>
            
            <div id="report-customizer"></div>
            
            <div class="report-container" id="report-preview">
                <h3>Sample Q1 2025 Report Preview - ACME Corporation</h3>
                <div class="kpi-grid">
                    <div class="kpi-card">
                        <div class="kpi-value">2,847</div>
                        <div class="kpi-label">Total Pounds Processed</div>
                        <div class="kpi-change positive">↑ 23% vs Q4 2024</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-value">94%</div>
                        <div class="kpi-label">Landfill Diversion Rate</div>
                        <div class="kpi-change positive">↑ 4% vs Q4 2024</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-value">$18,450</div>
                        <div class="kpi-label">Tax Deduction Value</div>
                        <div class="kpi-change positive">↑ 31% vs Q4 2024</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-value">15.2</div>
                        <div class="kpi-label">CO₂ Tons Avoided</div>
                        <div class="kpi-change positive">↑ 18% vs Q4 2024</div>
                    </div>
                </div>
                
                <div style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 8px;">
                    <h4>Executive Summary</h4>
                    <p>During Q1 2025, RYGNECO successfully processed 2,847 lbs of electronic waste for ACME Corporation, achieving a 94% landfill diversion rate. Your partnership has resulted in significant environmental impact, tax benefits of $18,450, and strengthened your corporate sustainability profile.</p>
                </div>
                
                <div style="margin-top: 30px;">
                    <h4>Environmental Impact</h4>
                    <div class="impact-grid">
                        <div class="impact-card">
                            <div class="impact-icon">💧</div>
                            <div style="font-weight: bold;">1.2M Gallons</div>
                            <div style="font-size: 12px;">Water saved vs new manufacturing</div>
                        </div>
                        <div class="impact-card">
                            <div class="impact-icon">⚡</div>
                            <div style="font-weight: bold;">43,200 kWh</div>
                            <div style="font-size: 12px;">Energy saved through refurbishment</div>
                        </div>
                        <div class="impact-card">
                            <div class="impact-icon">🏭</div>
                            <div style="font-weight: bold;">89%</div>
                            <div style="font-size: 12px;">Reduction in manufacturing demand</div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 30px; text-align: center;">
                    <a href="src/templates/quarterly-report.html" target="_blank" class="export-button primary">
                        View Full Sample Report
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        function showQuarterlyReport() {
            alert('Quarterly report for RYGNECO would be generated here. This integrates with your Green Tech Vault dashboard.');
            // In real implementation: reporting.generateReport('quarterly', options);
        }
        
        function showMonthlyReport() {
            alert('Monthly report would be generated here.');
        }
        
        function showAnnualReport() {
            alert('Annual report would be generated here.');
        }
        
        function printReport() {
            window.print();
        }
    </script>
</body>
</html>
`;

// Simple HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/demo') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(demoHTML);
  } else if (req.url.startsWith('/src/')) {
    // Serve static files
    const filePath = path.join('.', req.url);
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
      } else {
        const ext = path.extname(filePath);
        const contentType = ext === '.css' ? 'text/css' : 
                          ext === '.js' ? 'text/javascript' : 
                          'text/plain';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║        🌱 E-WASTE REPORTING SYSTEM DEMO 🌱             ║
╚════════════════════════════════════════════════════════╝

✅ Server is running successfully!

📍 Open your web browser and go to:
   👉 http://localhost:${PORT}

📋 What you can do:
   • View sample reports
   • See the customization interface
   • Preview different report types
   • Print reports

🛑 To stop the server, press Ctrl+C

Need help? Check the README.md file for documentation.
`);
}); 
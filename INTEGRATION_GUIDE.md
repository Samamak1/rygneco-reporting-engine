# RYGNECO Reporting Module Integration Guide

## Integration Steps for Green Tech Vault Dashboard

### Step 1: Copy the Reporting Module

1. Copy the entire `reporting` folder from `C:\path\to\rygneco-reporting-engine` to your dashboard:
   ```
   C:\path\to\your-dashboard\client\src\modules\reporting
   ```

### Step 2: Install Dependencies

Add these dependencies to your `client/package.json`:

```json
"dependencies": {
  // ... existing dependencies ...
  "handlebars": "^4.7.8",
  "html2canvas": "^1.4.1",
  "lodash-es": "^4.17.21"
}
```

Run: `npm install` in the client directory.

### Step 3: Create Report Integration Component

Create a new file: `client/src/components/ReportingModule.js`

```javascript
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  Description as ReportIcon,
  GetApp as DownloadIcon,
  Visibility as ViewIcon 
} from '@mui/icons-material';
import axios from 'axios';

// Import the reporting module
import { ReportingModule } from '../modules/reporting/src/index.js';

const RYGNECOReporting = ({ clientId, clientName }) => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  // Initialize reporting module
  const reporting = new ReportingModule({
    clientId: clientId,
    clientName: clientName,
    branding: {
      companyName: 'RYGNECO',
      logo: '🌱'
    }
  });

  const generateReport = async (reportType) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch client data from your API
      const response = await axios.get(`/api/clients/${clientId}/report-data`);
      
      const report = await reporting.generateReport(reportType, {
        clientData: response.data,
        sections: {
          executiveSummary: true,
          kpis: true,
          environmentalImpact: true,
          assetTracking: true,
          financialImpact: true,
          csrImpact: true,
          compliance: true,
          recommendations: true
        },
        dateRange: {
          startDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
          endDate: new Date()
        }
      });
      
      setReportData(report);
    } catch (err) {
      setError('Failed to generate report. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (format = 'pdf') => {
    if (!reportData) return;
    
    try {
      await reporting.exportReport(reportData, format, `RYGNECO-Report-${clientName}-${new Date().toISOString().split('T')[0]}`);
    } catch (err) {
      setError('Failed to download report.');
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        RYGNECO E-Waste Reports
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        {/* Report Type Cards */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quarterly Report
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Comprehensive quarterly analysis of e-waste processing
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<ReportIcon />}
                onClick={() => generateReport('quarterly')}
                disabled={loading}
              >
                Generate
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Report
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Monthly summary of activities and metrics
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<ReportIcon />}
                onClick={() => generateReport('monthly')}
                disabled={loading}
              >
                Generate
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Annual Report
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Year-end comprehensive sustainability report
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<ReportIcon />}
                onClick={() => generateReport('annual')}
                disabled={loading}
              >
                Generate
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pickup Report
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Individual pickup transaction report
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<ReportIcon />}
                onClick={() => generateReport('pickup')}
                disabled={loading}
              >
                Generate
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Report Preview/Download Section */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {reportData && !loading && (
        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Report Ready
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ViewIcon />}
              onClick={() => window.open(`/reports/preview/${reportData.id}`, '_blank')}
              sx={{ mr: 2 }}
            >
              View Report
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={() => downloadReport('pdf')}
            >
              Download PDF
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default RYGNECOReporting;
```

### Step 4: Update ClientReports.js

Add the reporting module to your existing ClientReports page:

```javascript
// In ClientReports.js
import RYGNECOReporting from '../components/ReportingModule';

// Add this to your component
<RYGNECOReporting 
  clientId={user.clientId} 
  clientName={user.companyName} 
/>
```

### Step 5: Create API Endpoints

Add these endpoints to your backend (`server/routes/reports.js`):

```javascript
const express = require('express');
const router = express.Router();

// Get report data for a client
router.get('/clients/:clientId/report-data', async (req, res) => {
  try {
    const { clientId } = req.params;
    
    // Fetch actual data from your database
    const reportData = {
      client: {
        id: clientId,
        name: req.user.companyName,
        // ... other client data
      },
      pickups: await getClientPickups(clientId),
      assets: await getClientAssets(clientId),
      processing: await getProcessingData(clientId),
      financial: await getFinancialData(clientId),
      environmental: await getEnvironmentalData(clientId),
      compliance: await getComplianceData(clientId),
      community: await getCommunityData(clientId)
    };
    
    res.json(reportData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### Step 6: Add Route to App.js

In your main App.js, add the route:

```javascript
import ClientReports from './pages/ClientReports';

// In your routes
<Route path="/client/reports" element={<ClientReports />} />
```

### Step 7: Add Navigation Link

Add a link in your client navigation:

```javascript
// In your navigation component
{
  label: 'Reports',
  icon: <AssessmentIcon />,
  path: '/client/reports'
}
```

### Step 8: Style Integration

The reporting module uses its own styles, but you can override them with Material-UI theme:

```javascript
// In your theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#27ae60', // RYGNECO green
    },
    secondary: {
      main: '#3498db',
    },
  },
  // ... rest of your theme
});
```

### Step 9: Environment Variables

Add these to your `.env` file:

```
REACT_APP_REPORTING_API_URL=http://localhost:5000/api
REACT_APP_COMPANY_NAME=RYGNECO
```

### Step 10: Test the Integration

1. Start your backend server
2. Start your React app
3. Login as a client
4. Navigate to Reports section
5. Generate a test report

## Features Available After Integration:

1. **Report Generation**
   - Quarterly Reports (6 pages)
   - Monthly Reports
   - Annual Reports  
   - Per-Pickup Reports

2. **Report Sections**
   - Executive Summary with KPIs
   - Environmental Impact Analysis
   - Asset Tracking & Chain of Custody
   - Financial Impact & Tax Benefits
   - CSR Impact & Community Benefits
   - Compliance & Strategic Recommendations

3. **Export Options**
   - PDF Download
   - HTML View
   - Excel Export (future)
   - Email Report (future)

4. **Customization**
   - Section selection
   - Date range picker
   - Custom branding
   - Template selection

## Next Steps:

1. Customize the report templates with your specific data
2. Add real-time data fetching from your database
3. Implement report scheduling
4. Add email notifications
5. Create admin report management interface

## Support:

For any issues with integration, check:
- Console logs for errors
- Network tab for API calls
- Report module logs in `src/modules/reporting/logs` 
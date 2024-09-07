import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, TextField, Card, CardContent, Typography, Grid 
} from '@mui/material';
import { getAdminReport } from '../../api/ReportApi';
import { saveAs } from 'file-saver';

const AdminReport = () => {
  const id = useSelector((state) => state.user?.user?.id);
  const token = useSelector((state) => state.user?.token);

  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [sortByPriceAsc, setSortByPriceAsc] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchOwnerReport = async () => {
      try {
        if (id && token) {
          const response = await getAdminReport(token);
          console.log(response);
          
          setReportData(response);
          setFilteredData(response);
        }
      } catch (error) {
        console.error('Error fetching owner report:', error);
      }
    };
    fetchOwnerReport();
  }, [id, token]);

  const handleSortByDate = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });
    setSortAsc(!sortAsc);
    setFilteredData(sortedData);
  };

  const handleSortByPrice = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return sortByPriceAsc ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice;
    });
    setSortByPriceAsc(!sortByPriceAsc);
    setFilteredData(sortedData);
  };

  const handleFilterByDate = () => {
    const filtered = reportData.filter((row) => {
      const rowDate = new Date(row.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      return (!start || rowDate >= start) && (!end || rowDate <= end);
    });
    setFilteredData(filtered);
  };

  const downloadCSV = () => {
    // Prepare CSV rows with headers
    const csvRows = [
      ["Sl.No", "Owner Name", "Date", "Total Price"],
      ...filteredData.map((row, index) => [
        index + 1, // Sequential number starting from 1
        row.username.toUpperCase(), // Assuming you want the username in uppercase
        row.date,
        `₹${row.totalPrice}` // Adding currency symbol
      ])
    ];
  
    // Convert the rows to CSV format
    const csvContent = csvRows.map(row => row.join(",")).join("\n");
  
    // Create a Blob and save the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, "admin_report.csv");
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f5f5' }}>
      <Card style={{ margin: '20px auto', maxWidth: '900px', padding: '20px' }}>
        <CardContent>
          <Typography variant="h4" component="h2" style={{ marginBottom: '20px', textAlign: 'center' }}>
            Admin Report
          </Typography>

          {/* Date Filter */}
          <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '60px'}}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                sx={{height:'10px'}}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleFilterByDate} 
                fullWidth
              >
                Filter by Date
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={3}>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={downloadCSV} 
                fullWidth
              >
                Download CSV
              </Button>
            </Grid>
          </Grid>

          {/* Report Table */}
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead style={{ backgroundColor: '#e0e0e0' }}>
                <TableRow>
                  <TableCell><strong>Sl.No</strong></TableCell>
                  <TableCell><strong>Owner Name</strong></TableCell>
                  <TableCell onClick={handleSortByDate} style={{ cursor: 'pointer' }}>
                    <strong>Date {sortAsc ? "↑" : "↓"}</strong>
                  </TableCell>
                  <TableCell onClick={handleSortByPrice} style={{ cursor: 'pointer' }}>
                    <strong>Total Revenue {sortByPriceAsc ? "↑" : "↓"}</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData?.map((row, index) => (
                  <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.username.toUpperCase()}</TableCell>

                    <TableCell>{row.date}</TableCell>
                    <TableCell>₹{row.totalPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReport;

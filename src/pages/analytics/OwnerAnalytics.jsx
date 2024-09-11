import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getOwnerBookingAnalytics } from '../../api/AnalyticsApi';
import Grid from '@mui/material/Grid';
import { StatsCard, UserBarChart, UserLineChart } from '../../components/index';

const OwnerAnalytics = () => {
    const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user.id);
  const wallet = useSelector((state) => state.user.user.wallet);
  const [analyticsData, setAnalyticsData] = useState({
    TotalAmount: 0,
    TotalBooking:0,
    BookingCounts: [], // Array of MonthlyBookingCount objects
    TopTheaters: [] ,
    TopMovies:[]   // Array of TheaterCount objects
  });
  useEffect(() => {
    if (token && userId) {
      const fetchData = async () => {
        try {
          const response = await getOwnerBookingAnalytics(token, userId);
          setAnalyticsData(response);
        } catch (error) {
          console.error('Error fetching user booking analytics:', error);
        }
      };

      fetchData();
    }
  }, [token, userId]);
  return (
    <Grid container spacing={2} mt={2} justifyContent="center" alignItems="center">
    <Grid item xs={12} sm={6} md={4}>
      <StatsCard
        title="Total Amount"
        value={`₹${analyticsData.TotalAmount}`}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      <StatsCard
        title="No. of Bookings"
        value={analyticsData.TotalBooking}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      <StatsCard
        title="Wallet Balance"
        value={`₹${wallet}`}
      />
    </Grid>
    <Grid item xs={12} sm={6} mt={2}mb={2}>
      <UserBarChart data={analyticsData.TopTheaters} />
    </Grid>
    <Grid item xs={12} sm={6} mt={2}mb={2}>
      <UserBarChart data={analyticsData.TopMovies} />
    </Grid>
    <Grid item xs={12} sm={6} mt={2} mb={2}>
      <UserLineChart data={analyticsData.BookingCounts} />
    </Grid>
  </Grid>
  )
}

export default OwnerAnalytics
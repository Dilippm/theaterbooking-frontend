import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserBookingAnalytics } from '../../api/AnalyticsApi';
import Grid from '@mui/material/Grid';
import { StatsCard, UserBarChart, UserLineChart } from '../../components/index';

const UserAnalytics = () => {
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user.id);
  const wallet = useSelector((state) => state.user.user.wallet);

  const [analyticsData, setAnalyticsData] = useState({
    TotalAmount: 0,
    Count: 0,
    BookingCounts: [], // Array of MonthlyBookingCount objects
    TopTheaters: []    // Array of TheaterCount objects
  });

  useEffect(() => {
    if (token && userId) {
      const fetchData = async () => {
        try {
          const response = await getUserBookingAnalytics(token, userId);
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
          value={analyticsData.Count}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard
          title="Wallet Balance"
          value={`₹${wallet}`}
        />
      </Grid>
      <Grid item xs={12} sm={6} mt={2}>
        <UserBarChart data={analyticsData.TopTheaters} />
      </Grid>
      <Grid item xs={12} sm={6} mt={2}>
        <UserLineChart data={analyticsData.BookingCounts} />
      </Grid>
    </Grid>
  );
};

export default UserAnalytics;

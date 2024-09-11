import React from 'react';
import UserAnalytics from './UserAnalytics';
import AdminAnalytics from './AdminAnalytics';
import OwnerAnalytics from './OwnerAnalytics';
import { useSelector } from 'react-redux';

const Analytics = () => {
  // Get the user's role from the Redux store
  const role = useSelector((state) => state.user?.user?.role);

  return (
    <div>
      {role === "admin" && <AdminAnalytics />}
      {role === "user" && <UserAnalytics />}
      {role === "owner" && <OwnerAnalytics />}
    </div>
  );
};

export default Analytics;

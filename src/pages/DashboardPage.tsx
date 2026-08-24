import React from 'react';
import { CustomerDashboard } from '../components/dashboards/CustomerDashboard';
import { ExpertDashboard } from '../components/dashboards/ExpertDashboard';
import { AdminDashboard } from '../components/dashboards/AdminDashboard';
import { useAuth } from '../context/AuthContext';

/**
 * Role-based Control Center (updates/05 + todo-v5)
 * Customer / Expert / Admin each get a dedicated dashboard.
 */
export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'customer';

  if (role === 'expert') return <ExpertDashboard />;
  if (role === 'admin' || role === 'manager') return <AdminDashboard />;
  if (role === 'ai_agent') return <ExpertDashboard />;
  return <CustomerDashboard />;
};

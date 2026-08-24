import React, { useEffect, useState } from 'react';
import { CustomerDashboard } from '../components/dashboards/CustomerDashboard';
import { ExpertDashboard } from '../components/dashboards/ExpertDashboard';
import { AdminDashboard } from '../components/dashboards/AdminDashboard';
import { OnboardingWizard, shouldShowOnboarding } from '../components/OnboardingWizard';
import { useAuth } from '../context/AuthContext';

/**
 * Role-based Control Center (v5/v6)
 */
export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'customer';
  const [showOnboard, setShowOnboard] = useState(false);

  useEffect(() => {
    if (role === 'customer' && shouldShowOnboarding()) {
      setShowOnboard(true);
    }
  }, [role]);

  const content =
    role === 'expert' || role === 'ai_agent' ? (
      <ExpertDashboard />
    ) : role === 'admin' || role === 'manager' ? (
      <AdminDashboard />
    ) : (
      <CustomerDashboard />
    );

  return (
    <>
      {content}
      <OnboardingWizard open={showOnboard} onClose={() => setShowOnboard(false)} />
    </>
  );
};

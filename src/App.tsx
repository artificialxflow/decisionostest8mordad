import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { PlatformLayout } from './components/layout/PlatformLayout';
import { LandingPage } from './pages/LandingPage';
import { ServicesPage } from './pages/ServicesPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';
import {
  CasesPage,
  CaseDetailPage,
  DocumentsPage,
  ChatPage,
  AuditPage,
  PricingPage,
  AboutPage,
} from './pages/PlatformPages';
import {
  ContractsPage,
  ReportsPage,
  SubscriptionPage,
  BillingPage,
  SupportPage,
  SettingsPage,
} from './pages/PlaceholderPages';
import { CmsPage } from './pages/CmsPage';
import { ROUTES } from './routes';

function CaseDetailRoute() {
  const { caseId } = useParams();
  if (!caseId) return <Navigate to={ROUTES.cases} replace />;
  return <CaseDetailPage caseId={caseId} />;
}

function AppServicesPage() {
  return <ServicesPage embedded />;
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            {/* Public site */}
            <Route element={<PublicLayout />}>
              <Route path={ROUTES.home} element={<LandingPage />} />
              <Route path={ROUTES.services} element={<ServicesPage />} />
              <Route path={ROUTES.pricing} element={<PricingPage />} />
              <Route path={ROUTES.about} element={<AboutPage />} />
              <Route path={ROUTES.faq} element={<FaqPage />} />
              <Route path={ROUTES.blog} element={<BlogPage />} />
              <Route path={ROUTES.contact} element={<ContactPage />} />
              <Route path={ROUTES.login} element={<LoginPage />} />
            </Route>

            {/* Platform */}
            <Route path={ROUTES.app} element={<PlatformLayout />}>
              <Route index element={<Navigate to={ROUTES.dashboard} replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="services" element={<AppServicesPage />} />
              <Route path="workspace" element={<WorkspacePage />} />
              <Route path="workspace/:workspaceId" element={<WorkspacePage />} />
              <Route path="cases" element={<CasesPage />} />
              <Route path="cases/:caseId" element={<CaseDetailRoute />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="contracts" element={<ContractsPage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="subscription" element={<SubscriptionPage />} />
              <Route path="billing" element={<BillingPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="audit" element={<AuditPage />} />
              <Route path="cms" element={<CmsPage />} />
            </Route>

            <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
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
import { RequestWizardPage, RequestSuccessPage } from './pages/RequestWizardPage';
import { ExpertsPage } from './pages/ExpertsPage';
import { ServicesAdminPage } from './pages/admin/ServicesAdminPage';
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
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path={ROUTES.home} element={<LandingPage />} />
                <Route path={ROUTES.services} element={<ServicesPage />} />
                <Route path={ROUTES.pricing} element={<PricingPage />} />
                <Route path={ROUTES.about} element={<AboutPage />} />
                <Route path={ROUTES.faq} element={<FaqPage />} />
                <Route path={ROUTES.blog} element={<BlogPage />} />
                <Route path={ROUTES.contact} element={<ContactPage />} />
                <Route path={ROUTES.login} element={<LoginPage />} />
                <Route path={ROUTES.register} element={<LoginPage />} />
              </Route>

              <Route
                path={ROUTES.app}
                element={
                  <ProtectedRoute>
                    <PlatformLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to={ROUTES.dashboard} replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="services" element={<AppServicesPage />} />
                <Route path="request/new" element={<RequestWizardPage />} />
                <Route path="request/success" element={<RequestSuccessPage />} />
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
                <Route path="experts" element={<ExpertsPage />} />
                <Route path="admin/services" element={<ServicesAdminPage />} />
              </Route>

              <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

/** نقش‌های پلتفرم DecisionOS — Sprint 2 */
export type UserRole = 'admin' | 'manager' | 'expert' | 'customer' | 'partner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  licenseNumber?: string;
  organization?: string;
  avatarUrl?: string;
  workspaceIds?: string[];
  subscriptionId?: string;
}

export type CaseCategory =
  | 'legal'
  | 'real_estate'
  | 'contract'
  | 'finance'
  | 'accounting'
  | 'insurance'
  | 'investment'
  | 'business'
  | 'ai';

export type CaseStatus =
  | 'new'
  | 'waiting_docs'
  | 'under_review'
  | 'in_progress'
  | 'waiting_customer'
  | 'quality_control'
  | 'completed'
  | 'archived'
  | 'cancelled';

export type CasePriority = 'high' | 'medium' | 'low';

export type CaseProgress = 0 | 10 | 25 | 50 | 75 | 90 | 100;

export interface LegalDetails {
  disputeType: string;
  courtBranch: string;
  plaintiff: string;
  defendant: string;
  judgeName?: string;
  claimAmount?: number;
  filingDate?: string;
  nextHearingDate?: string;
}

export interface RealEstateDetails {
  propertyType: 'apartment' | 'land' | 'villa' | 'commercial' | 'industrial';
  deedType: 'single_page' | 'booklet' | 'joint_ownership' | 'power_of_attorney' | 'peace_deed' | 'bench_mark';
  registrationSection: string;
  parcelMainNumber: string;
  parcelSubNumber: string;
  areaSqMeters: number;
  address: string;
  postalCode?: string;
  zoning: 'residential' | 'commercial' | 'administrative' | 'agricultural' | 'mixed' | 'industrial';
  estimatedValue?: number;
  riskScore: number;
  successProbability: number;
}

export interface CaseHistoryEntry {
  id: string;
  caseId: string;
  action: string;
  actorName: string;
  timestamp: string;
  details?: string;
}

export interface CaseItem {
  id: string;
  title: string;
  caseNumber: string;
  category: CaseCategory;
  status: CaseStatus;
  priority: CasePriority;
  progress?: number;
  description: string;
  tags: string[];
  assignedAdvocate: string;
  customerId?: string;
  serviceId?: string;
  assignedExpertId?: string;
  deadline?: string;
  workspaceId?: string;
  requestId?: string;
  createdAt: string;
  updatedAt: string;
  legalDetails?: LegalDetails;
  realEstateDetails?: RealEstateDetails;
  history?: CaseHistoryEntry[];
}

export interface CaseNote {
  id: string;
  caseId: string;
  title: string;
  content: string;
  authorName: string;
  category: 'court_session' | 'internal_note' | 'client_meeting' | 'verdict' | 'deadline';
  date: string;
}

export interface DocumentVersion {
  id: string;
  version: number;
  uploadedAt: string;
  uploadedBy: string;
  fileSize: string;
  fileUrl?: string;
  note?: string;
}

export interface DocumentItem {
  id: string;
  caseId: string;
  workspaceId?: string;
  title: string;
  category: 'deed' | 'contract' | 'petition' | 'expert_opinion' | 'verdict' | 'id_card' | 'official_notice' | 'other';
  fileType: string;
  fileSize: string;
  fileUrl?: string;
  uploadedAt: string;
  uploadedBy: string;
  ocrSummary?: string;
  ocrReady?: boolean;
  docStatus?: DocumentStatus;
  aiKeyFindings?: string[];
  versions?: DocumentVersion[];
  previewUrl?: string;
}

export interface ChatMessage {
  id: string;
  caseId?: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  referencedDocTitle?: string;
  suggestedActions?: string[];
}

export interface CaseReport {
  id: string;
  caseId: string;
  generatedAt: string;
  summary: string;
  riskAnalysis: {
    score: number;
    level: 'کم' | 'متوسط' | 'بالا' | 'بحرانی';
    keyRisks: string[];
  };
  winningProbability: number;
  recommendedActions: string[];
  relevantLaws: string[];
  verdictForecast: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  target: string;
  ipAddress: string;
  timestamp: string;
  details?: string;
}

export type Language = 'fa' | 'en' | 'ar';

export type ThemeMode = 'light' | 'dark';

/** Workspace — هسته پلتفرم */
export interface Workspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  memberIds: string[];
  caseIds: string[];
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'archived';
}

export type ServiceCategory =
  | 'legal'
  | 'contract'
  | 'finance'
  | 'accounting'
  | 'real_estate'
  | 'insurance'
  | 'investment'
  | 'business'
  | 'ai';

export type ServicePricingType = 'fixed' | 'hourly' | 'quote' | 'free';
export type ServiceStatus = 'active' | 'inactive';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  icon?: string;
  features?: string[];
  ctaLabel?: string;
  requiredDocuments?: string[];
  estimatedTime?: string;
  pricingType?: ServicePricingType;
  status?: ServiceStatus;
  sortOrder?: number;
}

export type RequestStatus = 'draft' | 'submitted' | 'reviewing' | 'approved' | 'rejected';

export interface RequestItem {
  id: string;
  serviceId: string;
  customerId: string;
  title: string;
  description: string;
  status: RequestStatus;
  caseId?: string;
  workspaceId?: string;
  documentIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ExpertProfile {
  id: string;
  userId: string;
  name: string;
  specialty: string;
  status: 'active' | 'inactive';
  activeCases: number;
  email?: string;
}

export interface TimelineEventItem {
  id: string;
  caseId?: string;
  workspaceId?: string;
  action: string;
  actorName: string;
  actorId?: string;
  objectType?: string;
  objectId?: string;
  timestamp: string;
  details?: string;
}

export type DocumentStatus = 'ready' | 'incomplete' | 'needs_clarification';

export type NotificationChannel = 'in_app' | 'email' | 'sms' | 'whatsapp';

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  channel: NotificationChannel;
  read: boolean;
  createdAt: string;
  link?: string;
  type?: 'info' | 'warning' | 'success' | 'action';
}

export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'enterprise';

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'expired' | 'cancelled' | 'trial';
  startDate: string;
  endDate?: string;
  seats?: number;
}

export interface Invoice {
  id: string;
  userId: string;
  workspaceId?: string;
  caseId?: string;
  amount: number;
  currency: 'IRR' | 'IRT';
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  issuedAt: string;
  dueAt?: string;
  description?: string;
}

export interface PlatformTask {
  id: string;
  title: string;
  workspaceId?: string;
  caseId?: string;
  assigneeId?: string;
  status: 'todo' | 'doing' | 'done';
  dueDate?: string;
  priority: CasePriority;
}

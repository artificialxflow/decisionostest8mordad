import {
  FormSchemaDef,
  ServiceTypeId,
  ServiceTypeRegistryEntry,
  FormFieldOption,
} from '../../types';

const IMP: FormFieldOption[] = [
  { value: 'required', label: 'الزامی' },
  { value: 'preferred', label: 'ترجیحی' },
  { value: 'not_required', label: 'مهم نیست' },
];

export const FORM_SCHEMAS: Record<string, FormSchemaDef> = {
  property_investment_v1: {
    id: 'property_investment_v1',
    version: 'v1',
    serviceTypeId: 'PROPERTY_INVESTMENT',
    title: 'سرمایه‌گذاری ملکی',
    sections: [
      {
        id: 'objective',
        title: 'هدف سرمایه‌گذاری',
        fields: [
          {
            fieldId: 'request_type',
            label: 'نوع درخواست',
            type: 'enum',
            required: true,
            kind: 'fact',
            options: [
              { value: 'residence', label: 'خرید برای سکونت' },
              { value: 'investment', label: 'سرمایه‌گذاری' },
              { value: 'flip', label: 'خرید و فروش مجدد' },
              { value: 'rent', label: 'اجاره‌داری' },
              { value: 'build', label: 'ساخت و سرمایه‌گذاری' },
            ],
          },
          {
            fieldId: 'profit_goal',
            label: 'هدف سود',
            type: 'enum',
            kind: 'preference',
            options: [
              { value: 'appreciation', label: 'افزایش قیمت' },
              { value: 'rent', label: 'اجاره' },
              { value: 'both', label: 'هر دو' },
            ],
          },
          {
            fieldId: 'horizon',
            label: 'افق سرمایه‌گذاری',
            type: 'enum',
            kind: 'preference',
            options: [
              { value: 'short', label: 'کوتاه‌مدت' },
              { value: 'mid', label: 'میان‌مدت' },
              { value: 'long', label: 'بلندمدت' },
            ],
          },
          {
            fieldId: 'risk_appetite',
            label: 'ریسک قابل قبول',
            type: 'enum',
            kind: 'fact',
            required: true,
            options: [
              { value: 'low', label: 'کم' },
              { value: 'medium', label: 'متوسط' },
              { value: 'high', label: 'زیاد' },
            ],
          },
        ],
      },
      {
        id: 'budget',
        title: 'بودجه',
        description: 'مبالغ به‌صورت قطعی (Fact) ثبت می‌شوند',
        fields: [
          { fieldId: 'budget_total', label: 'بودجه کل (میلیارد تومان)', type: 'currency', required: true, kind: 'fact' },
          { fieldId: 'budget_min', label: 'حداقل سرمایه', type: 'currency', kind: 'fact' },
          { fieldId: 'budget_max', label: 'حداکثر سرمایه', type: 'currency', required: true, kind: 'fact' },
          { fieldId: 'cash_amount', label: 'مبلغ نقد', type: 'currency', kind: 'fact' },
          {
            fieldId: 'finance_method',
            label: 'روش تأمین مالی',
            type: 'enum',
            kind: 'fact',
            options: [
              { value: 'cash', label: 'نقد' },
              { value: 'loan', label: 'وام' },
              { value: 'mixed', label: 'ترکیبی' },
            ],
          },
        ],
      },
      {
        id: 'location',
        title: 'محدوده جغرافیایی',
        fields: [
          { fieldId: 'province', label: 'استان', type: 'text', required: true, kind: 'fact' },
          { fieldId: 'city', label: 'شهر', type: 'text', required: true, kind: 'fact' },
          { fieldId: 'district', label: 'منطقه / محله', type: 'text', kind: 'preference' },
          { fieldId: 'preferred_areas', label: 'محدوده‌های ترجیحی', type: 'textarea', kind: 'preference' },
        ],
      },
      {
        id: 'property',
        title: 'مشخصات ملک',
        fields: [
          {
            fieldId: 'property_type',
            label: 'نوع ملک',
            type: 'enum',
            required: true,
            kind: 'fact',
            options: [
              { value: 'apartment', label: 'آپارتمان' },
              { value: 'villa', label: 'ویلا' },
              { value: 'land', label: 'زمین' },
              { value: 'commercial', label: 'تجاری' },
              { value: 'office', label: 'اداری' },
            ],
          },
          { fieldId: 'area_min', label: 'متراژ حداقل', type: 'number', kind: 'preference', unit: 'م²' },
          { fieldId: 'area_max', label: 'متراژ حداکثر', type: 'number', kind: 'preference', unit: 'م²' },
          { fieldId: 'age_max', label: 'حداکثر سن بنا', type: 'number', kind: 'preference', unit: 'سال' },
          {
            fieldId: 'rooms',
            label: 'تعداد خواب',
            type: 'enum',
            kind: 'preference',
            options: [
              { value: '1', label: '۱' },
              { value: '2', label: '۲' },
              { value: '3', label: '۳' },
              { value: '4+', label: '۴+' },
            ],
          },
          { fieldId: 'parking', label: 'پارکینگ', type: 'importance', kind: 'preference', options: IMP },
          { fieldId: 'storage', label: 'انباری', type: 'importance', kind: 'preference', options: IMP },
          { fieldId: 'elevator', label: 'آسانسور', type: 'importance', kind: 'preference', options: IMP },
          {
            fieldId: 'deed_type',
            label: 'نوع سند',
            type: 'enum',
            kind: 'fact',
            options: [
              { value: 'single', label: 'تک‌برگ' },
              { value: 'booklet', label: 'دفترچه‌ای' },
              { value: 'waqf', label: 'اوقافی' },
              { value: 'other', label: 'سایر' },
            ],
          },
        ],
      },
    ],
  },

  legal_case_v1: {
    id: 'legal_case_v1',
    version: 'v1',
    serviceTypeId: 'LEGAL_CASE',
    title: 'پرونده حقوقی',
    sections: [
      {
        id: 'core',
        title: 'اطلاعات پرونده',
        fields: [
          { fieldId: 'case_type', label: 'نوع پرونده', type: 'text', required: true, kind: 'fact' },
          { fieldId: 'subject', label: 'موضوع دعوا', type: 'textarea', required: true, kind: 'fact' },
          { fieldId: 'plaintiff', label: 'خواهان', type: 'text', required: true, kind: 'fact' },
          { fieldId: 'defendant', label: 'خوانده', type: 'text', required: true, kind: 'fact' },
          { fieldId: 'claim_amount', label: 'بهای خواسته (میلیون تومان)', type: 'currency', kind: 'fact' },
          { fieldId: 'court', label: 'مرجع قضایی', type: 'text', kind: 'fact' },
          { fieldId: 'branch', label: 'شعبه', type: 'text', kind: 'fact' },
          { fieldId: 'court_case_no', label: 'شماره پرونده', type: 'text', kind: 'fact' },
        ],
      },
      {
        id: 'story',
        title: 'شرح و ادعاها',
        fields: [
          { fieldId: 'story', label: 'شرح ماجرا', type: 'textarea', required: true, kind: 'fact' },
          { fieldId: 'claims', label: 'ادعاهای طرفین', type: 'textarea', kind: 'fact' },
          { fieldId: 'deadlines', label: 'مهلت‌های قانونی مهم', type: 'textarea', kind: 'fact' },
        ],
      },
    ],
  },

  contract_analysis_v1: {
    id: 'contract_analysis_v1',
    version: 'v1',
    serviceTypeId: 'CONTRACT_ANALYSIS',
    title: 'تحلیل قرارداد',
    sections: [
      {
        id: 'meta',
        title: 'مشخصات قرارداد',
        fields: [
          {
            fieldId: 'contract_type',
            label: 'نوع قرارداد',
            type: 'enum',
            required: true,
            kind: 'fact',
            options: [
              { value: 'sale', label: 'بیع' },
              { value: 'lease', label: 'اجاره' },
              { value: 'partnership', label: 'مشارکت' },
              { value: 'service', label: 'خدمات' },
              { value: 'insurance', label: 'بیمه' },
              { value: 'other', label: 'سایر' },
            ],
          },
          { fieldId: 'contract_number', label: 'شماره قرارداد', type: 'text', kind: 'fact' },
          { fieldId: 'contract_date', label: 'تاریخ', type: 'date', kind: 'fact' },
          { fieldId: 'parties', label: 'طرفین', type: 'textarea', required: true, kind: 'fact' },
          { fieldId: 'subject', label: 'موضوع', type: 'textarea', required: true, kind: 'fact' },
          { fieldId: 'price', label: 'مبلغ', type: 'currency', kind: 'fact' },
          { fieldId: 'payment_terms', label: 'شرایط پرداخت', type: 'textarea', kind: 'fact' },
          { fieldId: 'guarantees', label: 'ضمانت‌ها', type: 'textarea', kind: 'preference' },
          { fieldId: 'risks_focus', label: 'ریسک‌های مورد توجه', type: 'textarea', kind: 'preference' },
        ],
      },
    ],
  },

  property_transaction_v1: {
    id: 'property_transaction_v1',
    version: 'v1',
    serviceTypeId: 'PROPERTY_TRANSACTION',
    title: 'خرید و فروش ملک',
    sections: [
      {
        id: 'parties',
        title: 'طرفین و ملک',
        fields: [
          { fieldId: 'buyer', label: 'خریدار', type: 'text', required: true, kind: 'fact' },
          { fieldId: 'seller', label: 'فروشنده', type: 'text', required: true, kind: 'fact' },
          { fieldId: 'property_desc', label: 'شرح ملک', type: 'textarea', required: true, kind: 'fact' },
          { fieldId: 'price', label: 'قیمت (میلیارد)', type: 'currency', required: true, kind: 'fact' },
          { fieldId: 'deposit', label: 'بیعانه', type: 'currency', kind: 'fact' },
          { fieldId: 'transfer_date', label: 'تاریخ انتقال', type: 'date', kind: 'preference' },
          {
            fieldId: 'registry_status',
            label: 'وضعیت ثبتی',
            type: 'enum',
            kind: 'fact',
            options: [
              { value: 'free', label: 'آزاد' },
              { value: 'mortgage', label: 'در رهن' },
              { value: 'seizure', label: 'بازداشت' },
              { value: 'unknown', label: 'نامشخص' },
            ],
          },
        ],
      },
    ],
  },

  auction_v1: {
    id: 'auction_v1',
    version: 'v1',
    serviceTypeId: 'AUCTION',
    title: 'مزایده',
    sections: [
      {
        id: 'core',
        title: 'اطلاعات مزایده',
        fields: [
          { fieldId: 'authority', label: 'مرجع مزایده', type: 'text', required: true, kind: 'fact' },
          { fieldId: 'auction_number', label: 'شماره مزایده', type: 'text', kind: 'fact' },
          { fieldId: 'subject', label: 'موضوع / دارایی', type: 'textarea', required: true, kind: 'fact' },
          { fieldId: 'base_price', label: 'قیمت پایه', type: 'currency', required: true, kind: 'fact' },
          { fieldId: 'deposit', label: 'ودیعه', type: 'currency', kind: 'fact' },
          { fieldId: 'auction_date', label: 'تاریخ', type: 'date', kind: 'fact' },
          { fieldId: 'max_bid', label: 'سقف پیشنهاد شما', type: 'currency', kind: 'preference' },
          { fieldId: 'legal_restrictions', label: 'محدودیت‌های حقوقی', type: 'textarea', kind: 'fact' },
        ],
      },
    ],
  },

  tender_v1: {
    id: 'tender_v1',
    version: 'v1',
    serviceTypeId: 'TENDER',
    title: 'مناقصه',
    sections: [
      {
        id: 'core',
        title: 'اطلاعات مناقصه',
        fields: [
          { fieldId: 'authority', label: 'مرجع مناقصه', type: 'text', required: true, kind: 'fact' },
          { fieldId: 'tender_number', label: 'شماره', type: 'text', kind: 'fact' },
          { fieldId: 'subject', label: 'موضوع', type: 'textarea', required: true, kind: 'fact' },
          { fieldId: 'deadline', label: 'مهلت', type: 'date', required: true, kind: 'fact' },
          { fieldId: 'tech_req', label: 'الزامات فنی', type: 'textarea', kind: 'fact' },
          { fieldId: 'fin_req', label: 'الزامات مالی', type: 'textarea', kind: 'fact' },
          { fieldId: 'guarantees', label: 'ضمانت‌نامه‌ها', type: 'textarea', kind: 'preference' },
        ],
      },
    ],
  },

  investment_advisory_v1: {
    id: 'investment_advisory_v1',
    version: 'v1',
    serviceTypeId: 'INVESTMENT_ADVISORY',
    title: 'مشاوره سرمایه‌گذاری',
    sections: [
      {
        id: 'profile',
        title: 'پروفایل سرمایه‌گذار',
        fields: [
          { fieldId: 'capital', label: 'سرمایه (میلیارد)', type: 'currency', required: true, kind: 'fact' },
          { fieldId: 'goal', label: 'هدف سرمایه‌گذاری', type: 'textarea', required: true, kind: 'fact' },
          {
            fieldId: 'horizon',
            label: 'افق زمانی',
            type: 'enum',
            kind: 'preference',
            options: [
              { value: 'short', label: 'کوتاه' },
              { value: 'mid', label: 'میان' },
              { value: 'long', label: 'بلند' },
            ],
          },
          {
            fieldId: 'risk',
            label: 'تحمل ریسک',
            type: 'enum',
            required: true,
            kind: 'fact',
            options: [
              { value: 'low', label: 'کم' },
              { value: 'medium', label: 'متوسط' },
              { value: 'high', label: 'زیاد' },
            ],
          },
          { fieldId: 'preferred_assets', label: 'دارایی‌های مطلوب', type: 'textarea', kind: 'preference' },
          { fieldId: 'excluded_assets', label: 'دارایی‌های حذف‌شده', type: 'textarea', kind: 'preference' },
        ],
      },
    ],
  },

  technology_v1: {
    id: 'technology_v1',
    version: 'v1',
    serviceTypeId: 'TECHNOLOGY',
    title: 'فناوری / نرم‌افزار',
    sections: [
      {
        id: 'core',
        title: 'شرح نیاز فناوری',
        fields: [
          { fieldId: 'project_type', label: 'نوع پروژه', type: 'text', required: true, kind: 'fact' },
          { fieldId: 'scope', label: 'محدوده کار', type: 'textarea', required: true, kind: 'fact' },
          { fieldId: 'budget', label: 'بودجه تقریبی', type: 'currency', kind: 'fact' },
          { fieldId: 'deadline', label: 'مهلت تحویل', type: 'date', kind: 'preference' },
        ],
      },
    ],
  },
};

export const SERVICE_REGISTRY: ServiceTypeRegistryEntry[] = [
  {
    serviceId: 'PROPERTY_INVESTMENT',
    name: 'سرمایه‌گذاری ملکی',
    category: 'investment',
    version: '1',
    active: true,
    formSchemaId: 'property_investment_v1',
    caseSchemaSections: [
      'Investor Profile',
      'Requirements',
      'Property Candidates',
      'Documents',
      'AI Analysis',
      'Risk',
      'Decision',
    ],
    workflow: ['intake', 'system_reply', 'docs', 'match', 'decision'],
    permissions: ['customer', 'expert', 'admin'],
    aiCapabilities: ['Requirement Extraction', 'Property Matching', 'Financial Analysis', 'Risk Analysis'],
    agents: ['property-investment-agent'],
    icon: 'TrendingUp',
    description: 'تحلیل و تصمیم‌سازی برای خرید/سرمایه‌گذاری ملک',
    legacyServiceIds: ['s6'],
    sortOrder: 1,
  },
  {
    serviceId: 'LEGAL_CASE',
    name: 'پرونده حقوقی',
    category: 'legal',
    version: '1',
    active: true,
    formSchemaId: 'legal_case_v1',
    caseSchemaSections: ['اطلاعات پرونده', 'اسناد', 'ادله', 'ریسک', 'تصمیم'],
    workflow: ['intake', 'system_reply', 'docs', 'expert', 'decision'],
    permissions: ['customer', 'expert', 'admin'],
    aiCapabilities: ['Document Analysis', 'Legal Retrieval', 'Contradiction Detection'],
    agents: ['legal-agent'],
    icon: 'Scale',
    description: 'مدیریت پرونده قضایی و دعاوی',
    legacyServiceIds: ['s1'],
    sortOrder: 2,
  },
  {
    serviceId: 'CONTRACT_ANALYSIS',
    name: 'تحلیل قرارداد',
    category: 'contract',
    version: '1',
    active: true,
    formSchemaId: 'contract_analysis_v1',
    caseSchemaSections: ['قرارداد', 'تعهدات', 'ریسک', 'AI Analysis'],
    workflow: ['intake', 'system_reply', 'docs', 'expert'],
    permissions: ['customer', 'expert', 'admin'],
    aiCapabilities: ['Contract Extraction', 'Risk Analysis'],
    agents: ['contract-agent'],
    icon: 'FileSignature',
    description: 'بازبینی و ریسک‌سنجی قرارداد (شامل بیمه)',
    legacyServiceIds: ['s2', 's4'],
    sortOrder: 3,
  },
  {
    serviceId: 'PROPERTY_TRANSACTION',
    name: 'خرید و فروش ملک',
    category: 'real_estate',
    version: '1',
    active: true,
    formSchemaId: 'property_transaction_v1',
    caseSchemaSections: ['طرفین', 'ملک', 'Due Diligence', 'Decision'],
    workflow: ['intake', 'system_reply', 'docs', 'expert'],
    permissions: ['customer', 'expert', 'admin'],
    aiCapabilities: ['Title Check', 'Risk Analysis'],
    agents: ['transaction-agent'],
    icon: 'Building2',
    description: 'معامله خرید/فروش با بررسی ثبتی',
    legacyServiceIds: ['s3'],
    sortOrder: 4,
  },
  {
    serviceId: 'AUCTION',
    name: 'مزایده',
    category: 'auction',
    version: '1',
    active: true,
    formSchemaId: 'auction_v1',
    caseSchemaSections: ['مزایده', 'ارزیابی', 'ریسک', 'Decision'],
    workflow: ['intake', 'system_reply', 'docs', 'expert'],
    permissions: ['customer', 'expert', 'admin'],
    aiCapabilities: ['Valuation', 'Risk Analysis'],
    agents: ['auction-agent'],
    icon: 'Gavel',
    description: 'تحلیل شرکت در مزایده',
    sortOrder: 5,
  },
  {
    serviceId: 'TENDER',
    name: 'مناقصه',
    category: 'tender',
    version: '1',
    active: true,
    formSchemaId: 'tender_v1',
    caseSchemaSections: ['مناقصه', 'Compliance', 'ریسک', 'Decision'],
    workflow: ['intake', 'system_reply', 'docs', 'expert'],
    permissions: ['customer', 'expert', 'admin'],
    aiCapabilities: ['Compliance Check', 'Competitor Analysis'],
    agents: ['tender-agent'],
    icon: 'ClipboardList',
    description: 'آماده‌سازی و تحلیل مناقصه',
    sortOrder: 6,
  },
  {
    serviceId: 'INVESTMENT_ADVISORY',
    name: 'مشاوره سرمایه‌گذاری',
    category: 'investment',
    version: '1',
    active: true,
    formSchemaId: 'investment_advisory_v1',
    caseSchemaSections: ['پروفایل', 'سناریو', 'توصیه'],
    workflow: ['intake', 'system_reply', 'expert'],
    permissions: ['customer', 'expert', 'admin'],
    aiCapabilities: ['Scenario Analysis', 'Recommendation'],
    agents: ['advisory-agent'],
    icon: 'Wallet',
    description: 'مشاوره مالی و سرمایه‌گذاری',
    legacyServiceIds: ['s8'],
    sortOrder: 7,
  },
  {
    serviceId: 'TECHNOLOGY',
    name: 'فناوری',
    category: 'technology',
    version: '1',
    active: true,
    formSchemaId: 'technology_v1',
    caseSchemaSections: ['نیاز', 'محدوده', 'تحویل'],
    workflow: ['intake', 'system_reply', 'expert'],
    permissions: ['customer', 'expert', 'admin'],
    aiCapabilities: ['Scope Extraction'],
    agents: ['tech-agent'],
    icon: 'Cpu',
    description: 'پروژه‌های نرم‌افزار و شبکه',
    legacyServiceIds: ['s7'],
    sortOrder: 8,
  },
];

export function getServiceRegistry(): ServiceTypeRegistryEntry[] {
  return [...SERVICE_REGISTRY].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getActiveServiceRegistry(): ServiceTypeRegistryEntry[] {
  return getServiceRegistry().filter((s) => s.active);
}

export function updateServiceRegistryEntry(
  serviceId: ServiceTypeId,
  patch: Partial<Pick<ServiceTypeRegistryEntry, 'name' | 'description' | 'active' | 'sortOrder' | 'version'>>
): ServiceTypeRegistryEntry | undefined {
  const idx = SERVICE_REGISTRY.findIndex((s) => s.serviceId === serviceId);
  if (idx < 0) return undefined;
  SERVICE_REGISTRY[idx] = { ...SERVICE_REGISTRY[idx], ...patch };
  return SERVICE_REGISTRY[idx];
}

export function getServiceById(serviceId: ServiceTypeId): ServiceTypeRegistryEntry | undefined {
  return SERVICE_REGISTRY.find((s) => s.serviceId === serviceId);
}

export function getFormSchema(schemaId: string): FormSchemaDef | undefined {
  return FORM_SCHEMAS[schemaId];
}

export function getFormSchemaForService(serviceTypeId: ServiceTypeId): FormSchemaDef | undefined {
  const entry = getServiceById(serviceTypeId);
  if (!entry) return undefined;
  return getFormSchema(entry.formSchemaId);
}

export function resolveServiceTypeFromLegacy(legacyServiceId: string): ServiceTypeId | undefined {
  return SERVICE_REGISTRY.find((s) => s.legacyServiceIds?.includes(legacyServiceId))?.serviceId;
}

export function buildCaseNumber(serviceTypeId: ServiceTypeId, seq: number): string {
  const prefix: Record<ServiceTypeId, string> = {
    PROPERTY_INVESTMENT: 'INV',
    PROPERTY_TRANSACTION: 'TXN',
    LEGAL_CASE: 'LEG',
    CONTRACT_ANALYSIS: 'CTR',
    AUCTION: 'AUC',
    TENDER: 'TND',
    INVESTMENT_ADVISORY: 'ADV',
    TECHNOLOGY: 'TEC',
  };
  return `${prefix[serviceTypeId]}-1405-${String(seq).padStart(6, '0')}`;
}

export function generateSystemReply(
  serviceName: string,
  title: string,
  data: Record<string, string | number | string[] | null>
): string {
  const keys = Object.entries(data)
    .filter(([, v]) => v !== null && v !== '' && !(Array.isArray(v) && v.length === 0))
    .slice(0, 5)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join('، ') : v}`)
    .join(' · ');

  return (
    `بر اساس درخواست «${title}» در خدمت «${serviceName}»، یک جمع‌بندی اولیه آماده شد. ` +
    `نکات کلیدی ثبت‌شده: ${keys || 'اطلاعات پایه دریافت شد'}. ` +
    `در این مرحله می‌توانید با همین پاسخ پیش بروید یا برای بررسی تخصصی‌تر، مشاوره کارشناس را فعال کنید.`
  );
}

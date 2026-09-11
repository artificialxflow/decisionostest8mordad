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
    title: 'هلدینگ تجاری',
    sections: [
      {
        id: 'initial',
        title: 'نظر اولیه',
        description: 'برای نظر اولیه همین کافی است — بقیه اختیاری است',
        fields: [
          {
            fieldId: 'holding_focus',
            label: 'حوزه هلدینگ',
            type: 'enum',
            required: true,
            kind: 'fact',
            options: [
              { value: 'trading', label: 'بازرگانی / تجارت' },
              { value: 'industrial', label: 'صنعتی / تولیدی' },
              { value: 'services', label: 'خدمات' },
              { value: 'mixed', label: 'ترکیبی' },
              { value: 'other', label: 'سایر' },
            ],
          },
          {
            fieldId: 'summary',
            label: 'شرح نیاز',
            type: 'textarea',
            required: true,
            kind: 'fact',
            placeholder: 'به‌اختصار بگویید چه کمکی می‌خواهید…',
          },
        ],
      },
      {
        id: 'details',
        title: 'جزئیات بیشتر (اختیاری)',
        description: 'برای فیلتر دقیق‌تر — الزامی نیست',
        fields: [
          {
            fieldId: 'request_type',
            label: 'نوع درخواست',
            type: 'enum',
            kind: 'fact',
            options: [
              { value: 'structure', label: 'ساختار هلدینگ' },
              { value: 'investment', label: 'سرمایه‌گذاری' },
              { value: 'partnership', label: 'مشارکت' },
              { value: 'expansion', label: 'توسعه کسب‌وکار' },
            ],
          },
          {
            fieldId: 'risk_appetite',
            label: 'ریسک قابل قبول',
            type: 'enum',
            kind: 'preference',
            options: [
              { value: 'low', label: 'کم' },
              { value: 'medium', label: 'متوسط' },
              { value: 'high', label: 'زیاد' },
            ],
          },
          { fieldId: 'budget_total', label: 'بودجه تقریبی (میلیارد تومان)', type: 'currency', kind: 'fact' },
          { fieldId: 'province', label: 'استان', type: 'text', kind: 'fact' },
          { fieldId: 'city', label: 'شهر', type: 'text', kind: 'fact' },
          {
            fieldId: 'property_type',
            label: 'نوع دارایی (در صورت مرتبط)',
            type: 'enum',
            kind: 'preference',
            options: [
              { value: 'commercial', label: 'تجاری' },
              { value: 'office', label: 'اداری' },
              { value: 'industrial', label: 'صنعتی' },
              { value: 'land', label: 'زمین' },
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
        id: 'initial',
        title: 'نظر اولیه',
        description: 'برای نظر اولیه همین کافی است',
        fields: [
          { fieldId: 'subject', label: 'موضوع', type: 'textarea', required: true, kind: 'fact' },
          { fieldId: 'story', label: 'شرح مختصر', type: 'textarea', required: true, kind: 'fact' },
        ],
      },
      {
        id: 'details',
        title: 'جزئیات بیشتر (اختیاری)',
        description: 'برای فیلتر دقیق‌تر — الزامی نیست',
        fields: [
          { fieldId: 'case_type', label: 'نوع پرونده', type: 'text', kind: 'fact' },
          { fieldId: 'plaintiff', label: 'خواهان', type: 'text', kind: 'fact' },
          { fieldId: 'defendant', label: 'خوانده', type: 'text', kind: 'fact' },
          { fieldId: 'claim_amount', label: 'بهای خواسته (میلیون تومان)', type: 'currency', kind: 'fact' },
          { fieldId: 'court', label: 'مرجع قضایی', type: 'text', kind: 'fact' },
          { fieldId: 'branch', label: 'شعبه', type: 'text', kind: 'fact' },
          { fieldId: 'court_case_no', label: 'شماره پرونده', type: 'text', kind: 'fact' },
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
        id: 'initial',
        title: 'نظر اولیه',
        description: 'برای نظر اولیه همین کافی است',
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
          { fieldId: 'subject', label: 'موضوع / شرح نیاز', type: 'textarea', required: true, kind: 'fact' },
        ],
      },
      {
        id: 'details',
        title: 'جزئیات بیشتر (اختیاری)',
        fields: [
          { fieldId: 'contract_number', label: 'شماره قرارداد', type: 'text', kind: 'fact' },
          { fieldId: 'contract_date', label: 'تاریخ', type: 'date', kind: 'fact' },
          { fieldId: 'parties', label: 'طرفین', type: 'textarea', kind: 'fact' },
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
        id: 'initial',
        title: 'نظر اولیه',
        description: 'برای نظر اولیه همین کافی است',
        fields: [
          {
            fieldId: 'deal_side',
            label: 'خرید یا فروش',
            type: 'enum',
            required: true,
            kind: 'fact',
            options: [
              { value: 'buy', label: 'خرید' },
              { value: 'sell', label: 'فروش' },
            ],
          },
          { fieldId: 'property_desc', label: 'شرح ملک / نیاز', type: 'textarea', required: true, kind: 'fact' },
        ],
      },
      {
        id: 'details',
        title: 'جزئیات بیشتر (اختیاری)',
        description: 'نقشه و مشخصات دقیق در صورت نیاز',
        fields: [
          { fieldId: 'buyer', label: 'خریدار', type: 'text', kind: 'fact' },
          { fieldId: 'seller', label: 'فروشنده', type: 'text', kind: 'fact' },
          { fieldId: 'price', label: 'قیمت (میلیارد)', type: 'currency', kind: 'fact' },
          { fieldId: 'deposit', label: 'بیعانه', type: 'currency', kind: 'fact' },
          { fieldId: 'transfer_date', label: 'تاریخ انتقال', type: 'date', kind: 'preference' },
          { fieldId: 'map_note', label: 'موقعیت / نقشه (توضیح)', type: 'textarea', kind: 'preference', placeholder: 'آدرس تقریبی یا لینک نقشه…' },
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
        id: 'initial',
        title: 'نظر اولیه',
        description: 'برای نظر اولیه همین کافی است',
        fields: [
          { fieldId: 'subject', label: 'موضوع / دارایی', type: 'textarea', required: true, kind: 'fact' },
        ],
      },
      {
        id: 'details',
        title: 'جزئیات بیشتر (اختیاری)',
        fields: [
          { fieldId: 'authority', label: 'مرجع مزایده', type: 'text', kind: 'fact' },
          { fieldId: 'auction_number', label: 'شماره مزایده', type: 'text', kind: 'fact' },
          { fieldId: 'base_price', label: 'قیمت پایه', type: 'currency', kind: 'fact' },
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
        id: 'initial',
        title: 'نظر اولیه',
        description: 'برای نظر اولیه همین کافی است',
        fields: [
          { fieldId: 'subject', label: 'موضوع', type: 'textarea', required: true, kind: 'fact' },
        ],
      },
      {
        id: 'details',
        title: 'جزئیات بیشتر (اختیاری)',
        fields: [
          { fieldId: 'authority', label: 'مرجع مناقصه', type: 'text', kind: 'fact' },
          { fieldId: 'tender_number', label: 'شماره', type: 'text', kind: 'fact' },
          { fieldId: 'deadline', label: 'مهلت', type: 'date', kind: 'fact' },
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
        id: 'initial',
        title: 'نظر اولیه',
        description: 'برای نظر اولیه همین کافی است',
        fields: [
          { fieldId: 'goal', label: 'هدف سرمایه‌گذاری', type: 'textarea', required: true, kind: 'fact' },
        ],
      },
      {
        id: 'details',
        title: 'جزئیات بیشتر (اختیاری)',
        fields: [
          { fieldId: 'capital', label: 'سرمایه (میلیارد)', type: 'currency', kind: 'fact' },
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
            kind: 'preference',
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
        id: 'initial',
        title: 'نظر اولیه',
        description: 'برای نظر اولیه همین کافی است',
        fields: [
          { fieldId: 'scope', label: 'شرح نیاز', type: 'textarea', required: true, kind: 'fact' },
        ],
      },
      {
        id: 'details',
        title: 'جزئیات بیشتر (اختیاری)',
        fields: [
          { fieldId: 'project_type', label: 'نوع پروژه', type: 'text', kind: 'fact' },
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
    name: 'هلدینگ تجاری',
    category: 'investment',
    version: '1',
    active: true,
    formSchemaId: 'property_investment_v1',
    caseSchemaSections: [
      'Holding Profile',
      'Requirements',
      'Candidates',
      'Documents',
      'AI Analysis',
      'Risk',
      'Decision',
    ],
    workflow: ['intake', 'system_reply', 'docs', 'match', 'decision'],
    permissions: ['customer', 'expert', 'admin'],
    aiCapabilities: ['Requirement Extraction', 'Holding Analysis', 'Financial Analysis', 'Risk Analysis'],
    agents: ['property-investment-agent'],
    icon: 'TrendingUp',
    description: 'هلدینگ تجاری / بازرگانی — ساختار، سرمایه‌گذاری و توسعه کسب‌وکار',
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

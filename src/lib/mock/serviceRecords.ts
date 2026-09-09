import { ServiceRecord, ServiceTypeId, StructuredFieldValue, PropertyCandidate } from '../../types';
import { buildCaseNumber, getFormSchemaForService } from './serviceRegistry';

let records: ServiceRecord[] = [
  {
    recordId: 'rec-seed-inv',
    caseId: 'case-101',
    serviceTypeId: 'PROPERTY_INVESTMENT',
    formSchemaId: 'property_investment_v1',
    version: 'v1',
    data: {
      request_type: 'investment',
      budget_total: 10,
      budget_max: 10,
      city: 'بابل',
      province: 'مازندران',
      property_type: 'apartment',
      parking: 'preferred',
      risk_appetite: 'medium',
    },
    structuredFields: [
      {
        fieldId: 'budget_max',
        value: 10,
        kind: 'fact',
        confidence: 'high',
        sources: [
          { kind: 'user', label: 'اظهارات مشتری' },
          { kind: 'document', label: 'رسید بانکی', page: 1, chunkId: 'c-12' },
        ],
      },
      {
        fieldId: 'parking',
        value: 'preferred',
        kind: 'preference',
        importance: 'preferred',
        confidence: 'high',
        sources: [{ kind: 'user', label: 'اظهارات مشتری' }],
      },
    ],
    createdAt: '1403/05/01',
    updatedAt: '1403/05/01',
  },
  {
    recordId: 'rec-seed-leg',
    caseId: 'case-102',
    serviceTypeId: 'LEGAL_CASE',
    formSchemaId: 'legal_case_v1',
    version: 'v1',
    data: {
      case_type: 'اختلاف قراردادی',
      subject: 'فسخ مشارکت',
      plaintiff: 'شرکت پارس امید',
      defendant: 'پیمانکار آریا',
      story: 'اختلاف در تعهدات ساخت',
    },
    createdAt: '1403/05/10',
    updatedAt: '1403/05/12',
  },
  {
    recordId: 'rec-seed-auc',
    caseId: 'case-v7-auc',
    serviceTypeId: 'AUCTION',
    formSchemaId: 'auction_v1',
    version: 'v1',
    data: {
      authority: 'اجرای احکام بابل',
      subject: 'آپارتمان توقیفی',
      base_price: 8.5,
      max_bid: 9.2,
    },
    createdAt: '1403/06/01',
    updatedAt: '1403/06/01',
  },
];

export const SEED_PROPERTY_CANDIDATES: PropertyCandidate[] = [
  {
    id: 'cand-1',
    title: 'آپارتمان ۳ خواب — بابلسر',
    areaSqm: 125,
    rooms: 3,
    ageYears: 8,
    price: 9.7,
    parking: 1,
    address: 'بابلسر، خیابان امام',
    matchScore: 86,
  },
  {
    id: 'cand-2',
    title: 'آپارتمان نوساز — بابل',
    areaSqm: 110,
    rooms: 3,
    ageYears: 2,
    price: 10.4,
    parking: 2,
    address: 'بابل، شهرک دانشگاه',
    matchScore: 78,
  },
];

let caseSeq = 200;

export function getServiceRecords(): ServiceRecord[] {
  return [...records];
}

export function getServiceRecordByCase(caseId: string): ServiceRecord | undefined {
  return records.find((r) => r.caseId === caseId);
}

export function getServiceRecordById(recordId: string): ServiceRecord | undefined {
  return records.find((r) => r.recordId === recordId);
}

export function createServiceRecord(input: {
  caseId: string;
  serviceTypeId: ServiceTypeId;
  data: Record<string, string | number | string[] | null>;
}): ServiceRecord {
  const schema = getFormSchemaForService(input.serviceTypeId);
  const ts = new Date().toLocaleDateString('fa-IR');
  const structuredFields: StructuredFieldValue[] = Object.entries(input.data).map(([fieldId, value]) => {
    const field = schema?.sections.flatMap((s) => s.fields).find((f) => f.fieldId === fieldId);
    return {
      fieldId,
      value,
      kind: field?.kind ?? 'fact',
      importance: field?.type === 'importance' ? (value as StructuredFieldValue['importance']) : undefined,
      confidence: 'high',
      sources: [{ kind: 'user', label: 'فرم درخواست' }],
    };
  });

  const record: ServiceRecord = {
    recordId: `rec-${Date.now()}`,
    caseId: input.caseId,
    serviceTypeId: input.serviceTypeId,
    formSchemaId: schema?.id ?? 'unknown',
    version: schema?.version ?? 'v1',
    data: input.data,
    structuredFields,
    createdAt: ts,
    updatedAt: ts,
  };
  records = [record, ...records];
  return record;
}

export function acceptExtractedFactToRecord(
  caseId: string,
  fact: StructuredFieldValue
): ServiceRecord | undefined {
  const rec = records.find((r) => r.caseId === caseId);
  if (!rec) return undefined;
  const existing = rec.structuredFields?.find((f) => f.fieldId === fact.fieldId);
  if (existing) {
    existing.value = fact.value;
    existing.sources = [...existing.sources, ...fact.sources];
    existing.confidence = fact.confidence;
  } else {
    rec.structuredFields = [...(rec.structuredFields ?? []), fact];
  }
  rec.data[fact.fieldId] = fact.value;
  rec.updatedAt = new Date().toLocaleDateString('fa-IR');
  return rec;
}

export function updateServiceRecordData(
  caseId: string,
  data: Record<string, string | number | string[] | null>
): ServiceRecord | undefined {
  const rec = records.find((r) => r.caseId === caseId);
  if (!rec) return undefined;
  const schema = getFormSchemaForService(rec.serviceTypeId);
  rec.data = { ...rec.data, ...data };
  rec.structuredFields = Object.entries(rec.data).map(([fieldId, value]) => {
    const prev = rec.structuredFields?.find((f) => f.fieldId === fieldId);
    const field = schema?.sections.flatMap((s) => s.fields).find((f) => f.fieldId === fieldId);
    return {
      fieldId,
      value,
      kind: prev?.kind ?? field?.kind ?? 'fact',
      importance: field?.type === 'importance' ? (value as StructuredFieldValue['importance']) : prev?.importance,
      confidence: prev?.confidence ?? 'high',
      sources: prev?.sources?.length
        ? prev.sources
        : [{ kind: 'user' as const, label: 'ویرایش پرونده' }],
    };
  });
  rec.updatedAt = new Date().toLocaleDateString('fa-IR');
  return rec;
}

export function nextCaseNumber(serviceTypeId: ServiceTypeId): string {
  caseSeq += 1;
  return buildCaseNumber(serviceTypeId, caseSeq);
}

export const MOCK_EXTRACTED_FACTS: StructuredFieldValue[] = [
  {
    fieldId: 'contract_number',
    value: '90757',
    kind: 'fact',
    confidence: 'high',
    sources: [
      {
        kind: 'extraction',
        label: 'قرارداد.pdf',
        page: 1,
        chunkId: 'chk-01',
        extractionMethod: 'ocr+ner',
      },
    ],
  },
  {
    fieldId: 'price',
    value: 10,
    kind: 'fact',
    confidence: 'medium',
    sources: [
      { kind: 'extraction', label: 'قرارداد.pdf', page: 2, chunkId: 'chk-08', extractionMethod: 'ocr+ner' },
      { kind: 'user', label: 'اظهارات مشتری' },
    ],
  },
];

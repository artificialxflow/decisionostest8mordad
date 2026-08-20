import { SatisfactionRecord } from '../../types';

const records: SatisfactionRecord[] = [
  { caseId: 'case-100', rating: 5, comment: 'خدمات عالی', submittedAt: '1403/04/20' },
  { caseId: 'case-99', rating: 4, submittedAt: '1403/04/15' },
];

export function getSatisfactionRecords(): SatisfactionRecord[] {
  return [...records];
}

export function getSatisfactionForCase(caseId: string): SatisfactionRecord | undefined {
  return records.find((r) => r.caseId === caseId);
}

export function submitSatisfaction(caseId: string, rating: number, comment?: string): SatisfactionRecord {
  const existing = records.findIndex((r) => r.caseId === caseId);
  const record: SatisfactionRecord = {
    caseId,
    rating,
    comment,
    submittedAt: new Date().toLocaleDateString('fa-IR'),
  };
  if (existing >= 0) records[existing] = record;
  else records.push(record);
  return record;
}

export function getAverageRating(): number {
  if (records.length === 0) return 0;
  return Math.round((records.reduce((s, r) => s + r.rating, 0) / records.length) * 10) / 10;
}

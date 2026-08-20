import { DocumentVersion } from '../../types';

const versionsByDoc: Record<string, DocumentVersion[]> = {
  'doc-1': [
    { id: 'v1', version: 1, uploadedAt: '1403/05/01', uploadedBy: 'مشتری', fileSize: '1.2 MB', note: 'نسخه اولیه' },
    { id: 'v2', version: 2, uploadedAt: '1403/05/06', uploadedBy: 'مشتری', fileSize: '1.3 MB', note: 'اصلاح پلاک' },
  ],
  'doc-2': [
    { id: 'v3', version: 1, uploadedAt: '1403/05/02', uploadedBy: 'کارشناس', fileSize: '800 KB' },
  ],
};

export function getDocumentVersions(documentId: string): DocumentVersion[] {
  return versionsByDoc[documentId] ?? [];
}

export function getMockOcrText(documentId: string): { text: string; confidence: number } {
  return {
    text: documentId === 'doc-1'
      ? 'بسمه تعالی\nسند مالکیت واحد مسکونی...\nپلاک ثبتی: ۱۲۳/۴۵'
      : 'متن استخراج‌شده نمایشی (OCR mock)',
    confidence: documentId === 'doc-1' ? 92 : 78,
  };
}

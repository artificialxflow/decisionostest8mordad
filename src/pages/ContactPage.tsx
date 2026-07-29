import React, { useState } from 'react';
import { Button, Input, PageHeader, Badge } from '../components/ui';

export const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [ticket, setTicket] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <PageHeader
        title="تماس با ما"
        description="فرم تماس و ثبت تیکت پشتیبانی"
        badge={<Badge tone="blue">Ticket آماده</Badge>}
      />

      <div className="flex gap-2">
        <Button size="sm" variant={!ticket ? 'primary' : 'outline'} onClick={() => setTicket(false)}>
          فرم تماس
        </Button>
        <Button size="sm" variant={ticket ? 'primary' : 'outline'} onClick={() => setTicket(true)}>
          ثبت تیکت
        </Button>
      </div>

      {sent ? (
        <div className="p-6 rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-900 text-sm">
          درخواست شما ثبت شد. به‌زودی پاسخ می‌دهیم.
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5">
          <Input label="نام" name="name" required />
          <Input label="ایمیل" name="email" type="email" required />
          <Input label="موضوع" name="subject" required placeholder={ticket ? 'موضوع تیکت' : 'موضوع پیام'} />
          <div className="space-y-1">
            <label className="block text-xs font-semibold">پیام</label>
            <textarea
              required
              rows={5}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-3 text-xs focus:border-blue-500 focus:outline-hidden"
            />
          </div>
          <Button type="submit">{ticket ? 'ارسال تیکت' : 'ارسال پیام'}</Button>
        </form>
      )}

      <div className="text-xs text-slate-500 space-y-1">
        <p>تلفن: ۰۲۱-۹۱۰۰۰۰۰۰</p>
        <p>ایمیل: info@decisionos.ir</p>
        <p>آدرس: تهران، خیابان ولیعصر · ساعات ۹ تا ۱۸</p>
      </div>
    </div>
  );
};

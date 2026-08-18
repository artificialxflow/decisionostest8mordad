import React, { useState } from 'react';
import { PageHeader, Badge, Button, Input } from '../components/ui';
import { MOCK_ORGANIZATIONS, MOCK_INVITES, HOLDING_SERVICE_CATEGORIES } from '../lib/mock/organizations';
import { Building2, Users, FolderKanban, Mail, Plus } from 'lucide-react';

export const OrganizationsPage: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState(MOCK_ORGANIZATIONS[0].id);
  const [inviteEmail, setInviteEmail] = useState('');
  const [invites, setInvites] = useState(MOCK_INVITES);

  const org = MOCK_ORGANIZATIONS.find((o) => o.id === selectedOrg);
  const children = MOCK_ORGANIZATIONS.filter((o) => o.parentId === selectedOrg);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInvites([
      ...invites,
      {
        id: `inv-${Date.now()}`,
        email: inviteEmail,
        role: 'مدیر',
        orgName: org?.name || '—',
        status: 'pending',
        sentAt: new Date().toLocaleDateString('fa-IR'),
      },
    ]);
    setInviteEmail('');
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="سازمان‌ها و Multi-tenant"
        description="هلدینگ، شرکت‌های زیرمجموعه و دسترسی سازمانی — فقط UI"
        badge={<Badge tone="amber">فقط UI — Backend بعداً</Badge>}
      />

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-xs leading-relaxed">
        <strong>مفهوم:</strong> یک هلدینگ می‌تواند چند شرکت/واحد داشته باشد. هر مشترک اپ Workspace می‌گیرد؛ Landing و Blog برای SEO جداست مگر کل سایت خریداری شود.
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-slate-500 px-1">سازمان‌ها</p>
          {MOCK_ORGANIZATIONS.map((o) => (
            <button
              key={o.id}
              onClick={() => setSelectedOrg(o.id)}
              className={`w-full text-right p-3 rounded-lg border text-xs transition-colors ${
                selectedOrg === o.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="font-bold">{o.name}</span>
              </div>
              <Badge tone="neutral" className="mt-1">{o.type === 'holding' ? 'هلدینگ' : o.type === 'company' ? 'شرکت' : 'واحد'}</Badge>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-4">
          {org && (
            <>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg border bg-white dark:bg-slate-900 flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-[10px] text-slate-500">اعضا</p>
                    <p className="text-lg font-black">{org.memberCount}</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg border bg-white dark:bg-slate-900 flex items-center gap-3">
                  <FolderKanban className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-[10px] text-slate-500">Workspace</p>
                    <p className="text-lg font-black">{org.workspaceCount}</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg border bg-white dark:bg-slate-900">
                  <Badge tone={org.status === 'active' ? 'green' : 'amber'}>{org.status === 'active' ? 'فعال' : 'در انتظار'}</Badge>
                </div>
              </div>

              {children.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold mb-2">زیرمجموعه‌ها</h3>
                  <div className="space-y-2">
                    {children.map((c) => (
                      <div key={c.id} className="p-3 rounded-lg border text-xs flex justify-between bg-white dark:bg-slate-900">
                        <span className="font-medium">{c.name}</span>
                        <span className="text-slate-400">{c.workspaceCount} workspace</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xs font-bold mb-2">دسته‌بندی خدمات هلدینگ</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {HOLDING_SERVICE_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="p-3 rounded-lg border text-[11px] bg-white dark:bg-slate-900">
                      <strong>{cat.label}</strong>
                      <p className="text-slate-500 mt-0.5">{cat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleInvite} className="p-4 rounded-lg border bg-white dark:bg-slate-900 space-y-3">
                <h3 className="text-xs font-bold flex items-center gap-2">
                  <Mail className="w-4 h-4" /> دعوت شرکت جدید (mock)
                </h3>
                <div className="flex gap-2">
                  <Input
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="email@company.ir"
                    className="flex-1"
                  />
                  <Button type="submit" size="sm">
                    <Plus className="w-4 h-4" /> ارسال
                  </Button>
                </div>
                {invites.length > 0 && (
                  <ul className="text-[11px] space-y-1 text-slate-500">
                    {invites.map((i) => (
                      <li key={i.id}>{i.email} — {i.status === 'pending' ? 'در انتظار' : 'پذیرفته'}</li>
                    ))}
                  </ul>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

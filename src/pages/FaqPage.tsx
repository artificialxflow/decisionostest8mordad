import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { ROUTES } from '../routes';
import faqData from '../content/faq.json';

export const FaqPage: React.FC = () => {
  const [openCat, setOpenCat] = useState(faqData.categories[0]?.id ?? '');
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black">سوالات متداول</h1>
        <p className="text-xs text-slate-500">دسته‌بندی‌شده — ثبت‌نام، پرونده، پرداخت و عمومی</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {faqData.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setOpenCat(cat.id)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
              openCat === cat.id ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {faqData.categories
          .find((c) => c.id === openCat)
          ?.items.map((item) => {
            const key = `${openCat}-${item.q}`;
            return (
              <div key={key} className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 overflow-hidden">
                <button
                  onClick={() => setOpenItem(openItem === key ? null : key)}
                  className="w-full flex items-center justify-between px-4 py-3 text-right text-sm font-bold"
                >
                  {item.q}
                  <ChevronDown className={`w-4 h-4 transition-transform ${openItem === key ? 'rotate-180' : ''}`} />
                </button>
                {openItem === key && (
                  <p className="px-4 pb-4 text-xs text-slate-500 leading-relaxed">{item.a}</p>
                )}
              </div>
            );
          })}
      </div>

      <p className="text-center text-xs text-slate-500">
        سؤال دیگر دارید؟{' '}
        <Link to={ROUTES.contact} className="text-blue-600 font-bold">تماس با ما</Link>
      </p>
    </div>
  );
};

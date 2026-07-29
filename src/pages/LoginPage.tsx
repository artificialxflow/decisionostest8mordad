import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthModal } from '../components/AuthModal';
import { Button } from '../components/ui';
import { ROUTES } from '../routes';
import { User } from '../types';

export const LoginPage: React.FC = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const onSuccess = (_user: User) => {
    setOpen(false);
    navigate(ROUTES.dashboard);
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-xl font-black">ورود به DecisionOS</h1>
      <p className="text-xs text-slate-500">وارد Workspace و محیط کاری پلتفرم شوید</p>
      <Button onClick={() => setOpen(true)}>باز کردن فرم ورود</Button>
      <Link to={ROUTES.home} className="text-xs text-blue-600 font-bold">
        بازگشت به صفحه اصلی
      </Link>
      <AuthModal isOpen={open} onClose={() => setOpen(false)} onLoginSuccess={onSuccess} />
    </div>
  );
};

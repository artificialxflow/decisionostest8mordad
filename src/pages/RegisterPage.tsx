import React from 'react';
import { Link } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { ROUTES } from '../routes';

/** Register uses the same form as Login with toggle */
export const RegisterPage: React.FC = () => {
  return (
    <div>
      <LoginPage />
      <p className="text-center text-xs pb-6">
        <Link to={ROUTES.login} className="text-blue-600 font-bold">
          ورود
        </Link>
      </p>
    </div>
  );
};

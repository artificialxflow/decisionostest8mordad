import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Permission } from '../../lib/permissions';
import { ROUTES } from '../../routes';
import { EmptyState } from '../ui';

interface RequireRoleProps {
  roles: UserRole[];
  children: React.ReactNode;
}

export const RequireRole: React.FC<RequireRoleProps> = ({ roles, children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user || !roles.includes(user.role)) {
    return (
      <EmptyState
        title="دسترسی غیرمجاز"
        description="شما مجوز مشاهده این بخش را ندارید."
        actionLabel="بازگشت به داشبورد"
        onAction={() => {
          window.location.href = ROUTES.dashboard;
        }}
      />
    );
  }

  return <>{children}</>;
};

interface RequirePermissionProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RequirePermission: React.FC<RequirePermissionProps> = ({
  permission,
  children,
  fallback,
}) => {
  const { can, isLoading } = useAuth();

  if (isLoading) return null;
  if (!can(permission)) {
    return (
      fallback ?? (
        <EmptyState
          title="دسترسی محدود"
          description="این عملیات برای نقش شما فعال نیست."
        />
      )
    );
  }

  return <>{children}</>;
};

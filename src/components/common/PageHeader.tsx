import React from 'react';

export interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
  breadcrumbs,
  className = '',
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1 ${className}`}>
      <div className='space-y-0.5'>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className='flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1'>
            {breadcrumbs.map((b, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span>/</span>}
                {b.href ? (
                  <a href={b.href} className='hover:text-slate-700 transition-colors'>
                    {b.label}
                  </a>
                ) : (
                  <span className='text-slate-600'>{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className='text-page-title'>{title}</h1>
        {description && (
          <p className='text-page-subtitle max-w-3xl'>{description}</p>
        )}
      </div>

      {action && <div className='flex items-center gap-2 shrink-0'>{action}</div>}
    </div>
  );
};

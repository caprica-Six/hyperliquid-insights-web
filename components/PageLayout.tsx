import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  withPadding?: boolean;
}

export function PageLayout({
  children,
  className = '',
  containerClassName = '',
  withPadding = true,
}: PageLayoutProps) {
  const paddingClass = withPadding ? 'px-6 py-4' : '';

  return (
    <div className={`w-full min-h-screen ${className}`}>
      <main className={`${paddingClass} ${containerClassName}`}>
        {children}
      </main>
    </div>
  );
}

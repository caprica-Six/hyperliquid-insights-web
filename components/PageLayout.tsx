import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function PageLayout({
  children,
  className = '',
  containerClassName = '',
}: PageLayoutProps) {
  return (
    <div className={`w-full min-h-screen ${className}`}>
      <main className={`px-6 py-4 ${containerClassName}`}>{children}</main>
    </div>
  );
}

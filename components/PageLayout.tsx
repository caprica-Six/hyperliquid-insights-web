import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  withContainer?: boolean;
  withPadding?: boolean;
}

export function PageLayout({
  children,
  className = '',
  containerClassName = '',
  withContainer = true,
  withPadding = true,
}: PageLayoutProps) {
  const paddingClass = withPadding ? 'px-6 py-4' : '';

  return (
    <div className={`w-full min-h-screen ${className}`}>
      {withContainer ? (
        <main
          className={`container mx-auto ${paddingClass} ${containerClassName}`}
        >
          {children}
        </main>
      ) : (
        <main className={`${paddingClass} ${containerClassName}`}>
          {children}
        </main>
      )}
    </div>
  );
}

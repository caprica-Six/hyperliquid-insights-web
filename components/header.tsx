'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="container-wrapper h-full">
        <div className="flex items-center gap-4">
          <SidebarTrigger />

          <Link href="/" className="font-serif font-semibold text-xl">
            <span className="font-serif font-semibold text-xl">Hyper</span>
            <span className="italic">liquid</span> Insights
          </Link>
        </div>

        <nav>
          <ThemeToggle />
          <Link
            href="/"
            className={cn('nav-link', {
              'is-active': pathname === '/',
            })}
          >
            Home
          </Link>
          <Link
            href="/markets"
            className={cn('nav-link', {
              'is-active': pathname === '/markets',
            })}
          >
            Market Data
          </Link>
        </nav>
      </div>
    </header>
  );
}

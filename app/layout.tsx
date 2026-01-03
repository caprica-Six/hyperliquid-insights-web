import type { Metadata } from 'next';
import { Geist, Geist_Mono, Cormorant } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const cormorant = Cormorant({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Hyperliquid Insights',
  description: 'Hyperliquid Insights Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="neutral"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
              <AppSidebar />
              <SidebarInset className="flex-1">{children}</SidebarInset>
            </div>
          </SidebarProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

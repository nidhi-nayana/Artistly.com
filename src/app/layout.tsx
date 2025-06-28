import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackgroundAnimation from '@/components/layout/background-animation';
import { ThemeProvider } from '@/components/layout/theme-provider';
import AnimatedSection from '@/components/layout/animated-section';
import SplashScreenWrapper from '@/components/layout/splash-screen-wrapper';

export const metadata: Metadata = {
  title: 'Artistly: Performing Artist Booking Platform',
  description:
    'The premier platform for event planners and artist managers to connect. Browse, book, and manage performing artists with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Righteous&family=Source+Code+Pro:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SplashScreenWrapper />
          <BackgroundAnimation />
          <div className="relative z-10 flex flex-col flex-grow">
            <Header />
            <main className="flex-grow">{children}</main>
            <AnimatedSection triggerOnce={false}>
              <Footer />
            </AnimatedSection>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

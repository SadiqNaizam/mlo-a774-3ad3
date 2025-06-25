import React from 'react';
import FooterNav from './footernav';
import HeaderNav from './headernav';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

/**
 * MainAppLayout provides the core structure for the application,
 * including a header, the main content area, and a footer.
 */
const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <HeaderNav />
      {/* Add pt-16 to account for fixed header height */}
      <main className="flex-grow pt-16">
        {children}
      </main>
      <FooterNav />
    </div>
  );
};

export default MainAppLayout;
import React from 'react';
import FooterNav from './footernav';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

/**
 * MainAppLayout provides the core structure for the application,
 * including the main content area and a footer.
 */
const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <div className="dark flex min-h-screen flex-col bg-background text-foreground">
      {/* Header has been removed. Main content area no longer needs top padding. */}
      <main className="flex-grow">
        {children}
      </main>
      <FooterNav />
    </div>
  );
};

export default MainAppLayout;
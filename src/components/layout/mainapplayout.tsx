import React from 'react';
import HeaderNav from './HeaderNav';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

/**
 * MainAppLayout provides the core structure for the application,
 * including a fixed header and the main content area.
 * It ensures that the main content is not obscured by the header.
 */
const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderNav />
      {/* Main content area with top padding to offset the fixed header's height */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;

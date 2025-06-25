import React from 'react';

const FooterNav: React.FC = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-center px-4 md:px-6">
        <p className="text-sm text-muted-foreground">
          Pipeline Visualization Dashboard | Dark Theme Enabled
        </p>
      </div>
    </footer>
  );
};

export default FooterNav;
import React from 'react';
import { GitFork } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const HeaderNav: React.FC = () => {
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50",
      "h-16 border-b border-border/40 bg-background/95 backdrop-blur-sm"
    )}>
      <div className="container flex h-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <GitFork className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
            <AvatarFallback>PV</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Workflow, Cpu, ImageIcon } from 'lucide-react';

// Type definition for a single step within a pipeline
export interface PipelineStep {
  id: string;
  title: string;
  description?: string;
  apiCall?: string;
  hasPreview?: boolean;
}

// Props for the PipelineCard component
export interface PipelineCardProps {
  id: string;
  title: string;
  steps: PipelineStep[];
  className?: string;
}

const StepPreview: React.FC = () => (
  <div className="w-full h-12 bg-muted/50 border border-dashed rounded-sm flex items-center justify-center">
    <ImageIcon className="w-5 h-5 text-muted-foreground" />
  </div>
);

const PipelineCard: React.FC<PipelineCardProps> = ({ id, title, steps, className }) => {
  return (
    <Card id={id} className={cn("w-full max-w-sm lg:max-w-none bg-card/80 backdrop-blur-sm border-border/80", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-card-foreground">{title}</CardTitle>
        <Workflow className="w-5 h-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-start gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex-1 min-w-0 w-full lg:w-auto">
                <div className="p-3 border rounded-lg bg-background shadow-sm h-full flex flex-col">
                  <p className="font-medium text-sm text-foreground truncate">{step.title}</p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-1 flex-grow">{step.description}</p>
                  )}
                  {step.apiCall && (
                    <div className="mt-3">
                       <Badge variant="secondary" className="text-xs font-mono">
                        <Cpu className="w-3 h-3 mr-1.5" />
                        {step.apiCall}
                      </Badge>
                    </div>
                  )}
                  {step.hasPreview && (
                     <div className="mt-3">
                      <StepPreview />
                    </div>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center h-full pt-8">
                   <div className="w-8 h-px bg-border" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PipelineCard;

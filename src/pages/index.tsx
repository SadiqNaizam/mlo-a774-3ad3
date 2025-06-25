import React, { useRef } from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import PipelineCard, { PipelineCardProps } from '@/components/PipelineOverview/PipelineCard';
import PipelineConnector from '@/components/PipelineOverview/PipelineConnector';

// Type definition for a connector between pipelines
interface ConnectorData {
  fromId: string;
  toId: string;
  label?: string;
  variant?: 'default' | 'user-request';
}

// --- Dummy Data Definitions ---

const pipelineData: readonly PipelineCardProps[] = [
  {
    id: 'p1',
    title: 'Image To Code Pipeline',
    steps: [
      { id: 'p1s1', title: 'Analyze Screenshot', description: 'Detect layout and components from image.' },
      { id: 'p1s2', title: 'Component Extraction', description: 'Isolate individual UI elements.', apiCall: 'vision_extract_v2' },
      { id: 'p1s3', title: 'Generate JSX', description: 'Convert extracted data into React code.', apiCall: 'codegen_react_v4' },
      { id: 'p1s4', title: 'Preview in Frontend', description: 'Initial render of the generated code.', hasPreview: true },
    ],
  },
  {
    id: 'p2',
    title: 'App Generation Pipeline',
    steps: [
      { id: 'p2s1', title: 'Parse User Prompt', description: 'Understand requirements from text input.' },
      { id: 'p2s2', title: 'Generate App Structure', description: 'Define file and component hierarchy.', apiCall: 'codegen_structure_v1' },
      { id: 'p2s3', title: 'Write Component Code', description: 'Generate code for all defined components.', apiCall: 'codegen_full_v3' },
      { id: 'p2s4', title: 'Deploy to Sandbox', description: 'Create a temporary deployment for review.' },
    ],
  },
  {
    id: 'p3',
    title: 'Regeneration Pipeline',
    steps: [
      { id: 'p3s1', title: 'Parse User Request', description: 'Identify code sections to modify from feedback.' },
      { id: 'p3s2', title: 'Regeneration Logic', description: 'Apply changes and ensure code integrity.', apiCall: 'codegen_regenerate_v2' },
      { id: 'p3s3', title: 'Update First-Pass Code', description: 'Integrate the regenerated code snippets.' },
    ],
  },
  {
    id: 'p4',
    title: 'Deployment Server',
    steps: [
      { id: 'p4s1', title: 'CI/CD Trigger', description: 'Automated build process initiated.' },
      { id: 'p4s2', title: 'Build & Deploy', description: 'Package and push to live environment.' },
    ],
  },
  {
    id: 'p5',
    title: 'Updated Preview in Frontend',
    steps: [
      { id: 'p5s1', title: 'Live Frontend Preview', description: 'The updated application is now visible to the user.', hasPreview: true },
    ],
  },
] as const;

const connectorData: readonly ConnectorData[] = [
  {
    fromId: 'p1',
    toId: 'p3',
    label: 'User request: fix or change',
    variant: 'user-request',
  },
  {
    fromId: 'p2',
    toId: 'p3',
    variant: 'user-request',
  },
  {
    fromId: 'p3',
    toId: 'p4',
  },
  {
    fromId: 'p4',
    toId: 'p5',
  },
  {
    fromId: 'p5',
    toId: 'p3',
    label: 'Further user requests / changes',
    variant: 'user-request',
  },
] as const;


const IndexPage: React.FC = () => {
  const pipelineContainerRef = useRef<HTMLDivElement>(null);

  // Helper function to find a pipeline card's data by its ID
  const findCardData = (id: string): PipelineCardProps | undefined => {
    return pipelineData.find((p) => p.id === id);
  };

  const p1Data = findCardData('p1');
  const p2Data = findCardData('p2');
  const p3Data = findCardData('p3');
  const p4Data = findCardData('p4');
  const p5Data = findCardData('p5');

  return (
    <MainAppLayout>
      <div className="container mx-auto px-4 py-8 md:px-8 lg:px-12">
        <div ref={pipelineContainerRef} className="relative min-h-[90vh] w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-32 gap-y-16 items-start justify-center">
            {/* Column 1: Source Pipelines */}
            <div className="flex flex-col gap-y-32 justify-center h-full pt-16">
              {p1Data && <PipelineCard {...p1Data} />}
              {p2Data && <PipelineCard {...p2Data} />}
            </div>

            {/* Column 2: Regeneration Pipeline */}
            <div className="flex items-center justify-center h-full min-h-[500px]">
              {p3Data && <PipelineCard {...p3Data} />}
            </div>

            {/* Column 3: Deployment & Output */}
            <div className="flex flex-col gap-y-48 justify-center h-full pt-16">
              {p4Data && <PipelineCard {...p4Data} />}
              {p5Data && <PipelineCard {...p5Data} />}
            </div>
          </div>

          {/* Render all connectors on top of the grid */}
          {connectorData.map((connector) => (
            <PipelineConnector
              key={`${connector.fromId}-${connector.toId}-${connector.label}`}
              parentRef={pipelineContainerRef}
              fromId={connector.fromId}
              toId={connector.toId}
              label={connector.label}
              variant={connector.variant}
            />
          ))}
        </div>
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;

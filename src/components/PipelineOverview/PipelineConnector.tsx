import React, { useState, useLayoutEffect } from 'react';

interface PipelineConnectorProps {
  fromId: string;
  toId: string;
  label?: string;
  parentRef: React.RefObject<HTMLElement>;
  variant?: 'default' | 'user-request';
}

const PipelineConnector: React.FC<PipelineConnectorProps> = ({ 
    fromId, 
    toId, 
    label, 
    parentRef, 
    variant = 'default' 
}) => {
  const [pathData, setPathData] = useState<string | null>(null);
  const [labelPosition, setLabelPosition] = useState<{ x: number; y: number } | null>(null);

  useLayoutEffect(() => {
    const calculatePath = () => {
      if (!parentRef.current) return;

      const parentRect = parentRef.current.getBoundingClientRect();
      const fromEl = document.getElementById(fromId);
      const toEl = document.getElementById(toId);

      if (!fromEl || !toEl) {
        setPathData(null);
        return;
      }

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      // Calculate coordinates relative to the parent container
      const startX = fromRect.right - parentRect.left;
      const startY = fromRect.top - parentRect.top + fromRect.height / 2;

      const endX = toRect.left - parentRect.left;
      const endY = toRect.top - parentRect.top + toRect.height / 2;

      // For user request paths, make them more curved
      const curveFactor = variant === 'user-request' ? 150 : 60;
      
      // Determine the direction of the connection (1 for LTR, -1 for RTL).
      // Default to 1 if they are vertically aligned to avoid a factor of 0.
      const direction = Math.sign(endX - startX) || 1;

      // Apply the curve factor based on the direction to create a smooth arc.
      const c1x = startX + curveFactor * direction;
      const c1y = startY;
      const c2x = endX - curveFactor * direction;
      const c2y = endY;

      setPathData(`M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`);

      if (label) {
        // Position label at the midpoint of the curve's horizontal span
        const labelX = startX + (endX - startX) / 2;
        // Position label slightly above the vertical center of the curve
        const labelY = startY + (endY - startY) / 2 - (variant === 'user-request' ? 30 : 20);
        setLabelPosition({ x: labelX, y: labelY });
      }
    };

    calculatePath();

    const resizeObserver = new ResizeObserver(calculatePath);
    if (parentRef.current) {
      resizeObserver.observe(parentRef.current);
    }
    
    // Also observe the connected elements themselves if they resize
    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);
    if (fromEl) resizeObserver.observe(fromEl);
    if (toEl) resizeObserver.observe(toEl);

    return () => {
      resizeObserver.disconnect();
    };
  }, [fromId, toId, label, parentRef, variant]);

  if (!pathData) return null;

  return (
    <>
      <svg
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'none'
        }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="8"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" className="fill-current text-muted-foreground" />
          </marker>
        </defs>
        <path
          d={pathData}
          fill="none"
          strokeWidth="1.5"
          className={variant === 'user-request' ? "stroke-current text-accent/70 stroke-dash-[4]" : "stroke-current text-muted-foreground/80"}
          markerEnd="url(#arrowhead)"
        />
      </svg>
      {label && labelPosition && (
        <div
          style={{
            position: 'absolute',
            left: `${labelPosition.x}px`,
            top: `${labelPosition.y}px`,
            transform: 'translateX(-50%)',
            pointerEvents: 'auto',
          }}
          className="px-2 py-1 text-xs text-accent-foreground bg-accent/90 rounded-md shadow-lg"
        >
          {label}
        </div>
      )}
    </>
  );
};

export default PipelineConnector;
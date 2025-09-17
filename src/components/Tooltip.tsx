import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 300,
  className,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const scrollX = window.pageXOffset;
        const scrollY = window.pageYOffset;
        
        let x = rect.left + scrollX + rect.width / 2;
        let y = rect.top + scrollY;
        
        switch (position) {
          case 'top':
            y -= 10;
            break;
          case 'bottom':
            y += rect.height + 10;
            break;
          case 'left':
            x = rect.left + scrollX - 10;
            y += rect.height / 2;
            break;
          case 'right':
            x = rect.right + scrollX + 10;
            y += rect.height / 2;
            break;
        }
        
        setTooltipPosition({ x, y });
        setIsVisible(true);
      }
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipElement = isVisible ? (
    <div
      className={clsx(
        'fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none transition-opacity duration-200',
        'before:absolute before:w-2 before:h-2 before:bg-gray-900 before:rotate-45',
        {
          'before:-bottom-1 before:left-1/2 before:-translate-x-1/2': position === 'top',
          'before:-top-1 before:left-1/2 before:-translate-x-1/2': position === 'bottom',
          'before:-right-1 before:top-1/2 before:-translate-y-1/2': position === 'left',
          'before:-left-1 before:top-1/2 before:-translate-y-1/2': position === 'right',
        },
        className
      )}
      style={{
        left: position === 'left' || position === 'right' ? tooltipPosition.x : tooltipPosition.x,
        top: tooltipPosition.y,
        transform: position === 'top' || position === 'bottom' ? 'translateX(-50%)' : 
                  position === 'left' ? 'translateX(-100%)' : 
                  position === 'right' ? 'translateX(0)' : 'translateY(-50%)',
      }}
    >
      {content}
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
      {tooltipElement && createPortal(tooltipElement, document.body)}
    </>
  );
};

// Preset tooltip variants
export const InfoTooltip: React.FC<{ content: React.ReactNode; className?: string }> = ({ 
  content, 
  className 
}) => (
  <Tooltip content={content} position="top" className={className}>
    <div className="inline-flex items-center justify-center w-4 h-4 text-xs text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-help">
      ?
    </div>
  </Tooltip>
);

export const HelpTooltip: React.FC<{ content: React.ReactNode }> = ({ content }) => (
  <Tooltip content={content} position="top">
    <svg 
      className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors cursor-help" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
      />
    </svg>
  </Tooltip>
);
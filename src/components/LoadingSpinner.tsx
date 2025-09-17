import React from 'react';
import clsx from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'spinner',
  className,
}) => {
  if (variant === 'dots') {
    return (
      <div className={clsx('flex space-x-1', className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={clsx(
              'bg-gradient-to-r from-primary-500 to-primary-600 rounded-full animate-pulse',
              sizeClasses[size]
            )}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1.4s',
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div
        className={clsx(
          'bg-gradient-to-r from-primary-500 to-primary-600 rounded-full animate-pulse',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-2 border-transparent bg-gradient-to-r from-primary-500 to-primary-600',
        sizeClasses[size],
        className
      )}
      style={{
        background: 'conic-gradient(from 0deg, transparent, #3b82f6, transparent)',
        borderRadius: '50%',
      }}
    >
      <div className="absolute inset-1 bg-white rounded-full" />
    </div>
  );
};

// Enhanced loading states for different contexts
export const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center space-y-4">
      <LoadingSpinner size="xl" />
      <p className="text-gray-600 animate-pulse">Loading dashboard...</p>
    </div>
  </div>
);

export const InlineLoader: React.FC<{ text?: string }> = ({ text = "Loading..." }) => (
  <div className="flex items-center space-x-2">
    <LoadingSpinner size="sm" />
    <span className="text-sm text-gray-600">{text}</span>
  </div>
);

interface LoadingStateProps {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  isLoading,
  children,
  fallback,
  className,
}) => {
  if (isLoading) {
    return (
      <div className={clsx('flex items-center justify-center p-8', className)}>
        {fallback || <LoadingSpinner size="lg" />}
      </div>
    );
  }

  return <>{children}</>;
};

interface SkeletonProps {
  className?: string;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, lines = 1 }) => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={clsx(
            'bg-gray-200 rounded',
            lines > 1 && index < lines - 1 && 'mb-2',
            className || 'h-4 w-full'
          )}
        />
      ))}
    </div>
  );
};
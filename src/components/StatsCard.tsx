import React from 'react';
import { clsx } from 'clsx';
import { Tooltip, InfoTooltip } from './Tooltip';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ComponentType<any>;
  className?: string;
  loading?: boolean;
  isLoading?: boolean;
  format?: 'currency' | 'number' | 'percentage';
  tooltip?: string;
  description?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: IconComponent,
  loading = false,
  isLoading = false,
  format = 'number',
  className = '',
  tooltip,
  description,
}) => {
  const isLoadingState = loading || isLoading;
  
  const formatValue = (val: string | number) => {
    if (format === 'currency') {
      return typeof val === 'number' ? `$${val.toLocaleString()}` : val;
    }
    if (format === 'percentage') {
      return typeof val === 'number' ? `${val}%` : val;
    }
    return typeof val === 'number' ? val.toLocaleString() : val;
  };

  if (isLoadingState) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
    );
  }

  const cardContent = (
    <div className={`relative bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer overflow-hidden ${className}`}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-purple-50/0 to-blue-50/0 group-hover:from-indigo-50/50 group-hover:via-purple-50/30 group-hover:to-blue-50/50 transition-all duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors duration-200">
              {title}
            </h3>
            {tooltip && <InfoTooltip content={tooltip} />}
          </div>
          {IconComponent && (
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-200">
              <IconComponent className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700 transition-all duration-200 group-hover:scale-110" />
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <p className="text-3xl font-bold tracking-tight text-gray-900 group-hover:text-indigo-800 transition-colors duration-200">
            {formatValue(value)}
          </p>
          {change && (
            <div className={clsx(
              'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200',
              {
                'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200': changeType === 'positive',
                'bg-rose-100 text-rose-700 group-hover:bg-rose-200': changeType === 'negative',
                'bg-gray-100 text-gray-700 group-hover:bg-gray-200': changeType === 'neutral',
              }
            )}>
              <span className="transition-transform duration-200 group-hover:scale-110">
                {changeType === 'positive' && '↗'}
                {changeType === 'negative' && '↘'}
                {changeType === 'neutral' && '→'}
              </span>
              {change}
            </div>
          )}
          {description && (
            <p className="text-sm text-gray-500 italic group-hover:text-gray-600 transition-colors duration-200 mt-3">
              {description}
            </p>
          )}
        </div>
      </div>
      
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-200/50 transition-all duration-300"></div>
    </div>
  );

  if (description && !tooltip) {
    return (
      <Tooltip content={description} position="top">
        {cardContent}
      </Tooltip>
    );
  }

  return cardContent;
};
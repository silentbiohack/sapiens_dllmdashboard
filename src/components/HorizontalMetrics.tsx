import React from 'react';
import { TrendingUp, DollarSign, BarChart3, Activity } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle: string;
  iconBg: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, subtitle, iconBg }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${iconBg}`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export const HorizontalMetrics: React.FC = () => {
  const metrics = [
    {
      icon: <Activity className="w-5 h-5 text-blue-600" />,
      label: "24h",
      value: "$115.6",
      subtitle: "Trading volume",
      iconBg: "bg-blue-100"
    },
    {
      icon: <DollarSign className="w-5 h-5 text-green-600" />,
      label: "24h", 
      value: "$984",
      subtitle: "Fees collected",
      iconBg: "bg-green-100"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-purple-600" />,
      label: "APR",
      value: "31.69%",
      subtitle: "Annual return",
      iconBg: "bg-purple-100"
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-orange-600" />,
      label: "TVL",
      value: "$722,25",
      subtitle: "Total value locked",
      iconBg: "bg-orange-100"
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            icon={metric.icon}
            label={metric.label}
            value={metric.value}
            subtitle={metric.subtitle}
            iconBg={metric.iconBg}
          />
        ))}
      </div>
    </div>
  );
};
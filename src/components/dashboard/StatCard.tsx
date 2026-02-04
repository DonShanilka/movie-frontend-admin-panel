import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, trendUp }) => {
    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-start justify-between transition-all hover:shadow-md">
            <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{value}</h3>
                {trend && (
                    <p className={`text-xs mt-2 font-medium ${trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {trendUp ? '↑' : '↓'} {trend} <span className="text-zinc-400 dark:text-zinc-500 font-normal">vs last month</span>
                    </p>
                )}
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
        </div>
    );
};

export default StatCard;

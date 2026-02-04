"use client";

import React from 'react';
import {
  Film,
  Tv,
  Users,
  DollarSign,
  TrendingUp,
  Activity
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import SubscriptionChart from '@/components/dashboard/SubscriptionChart';
import ContentDistributionChart from '@/components/dashboard/ContentDistributionChart';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-primary">Platform Overview</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Welcome back! Here's what's happening on your platform today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Movies"
            value="1,284"
            icon={Film}
            trend="12%"
            trendUp={true}
            iconColor="sky"
          />
          <StatCard
            title="TV Series"
            value="432"
            icon={Tv}
            trend="5%"
            trendUp={true}
            iconColor="amber"
          />
          <StatCard
            title="Active Users"
            value="24.8k"
            icon={Users}
            trend="18%"
            trendUp={true}
            iconColor="rose"
          />
          <StatCard
            title="Monthly Revenue"
            value="$42,500"
            icon={DollarSign}
            trend="8%"
            trendUp={true}
            iconColor="emerald"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <ContentDistributionChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SubscriptionChart />
          </div>
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-primary">Recent Activity</h3>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">View all</button>
            </div>
            <div className="space-y-6">
              {[
                { user: 'Alex Morgan', action: 'Subscribed to Premium', time: '2 mins ago', icon: Activity },
                { user: 'Sarah Chen', action: 'Watched "Interstellar"', time: '15 mins ago', icon: Film },
                { user: 'Mike Ross', action: 'New TV Series Added: "The Bear"', time: '1 hour ago', icon: Tv },
                { user: 'Jessica Day', action: 'Upgraded to Family Plan', time: '3 hours ago', icon: TrendingUp },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <item.icon className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.user}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.action}</p>
                  </div>
                  <span className="ml-auto text-xs text-zinc-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

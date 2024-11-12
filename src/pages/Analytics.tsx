import React from 'react';
import { BarChart, DollarSign, Users, TrendingUp, Package } from 'lucide-react';
import { MetricCard } from '../components/analytics/MetricCard';
import { RevenueChart } from '../components/analytics/RevenueChart';
import { CustomerTable } from '../components/analytics/CustomerTable';

export function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$124,592"
          change="+12.5%"
          trend="up"
          icon={DollarSign}
        />
        <MetricCard
          title="Active Customers"
          value="1,284"
          change="+3.2%"
          trend="up"
          icon={Users}
        />
        <MetricCard
          title="Conversion Rate"
          value="24.8%"
          change="-1.5%"
          trend="down"
          icon={TrendingUp}
        />
        <MetricCard
          title="Products Sold"
          value="856"
          change="+8.9%"
          trend="up"
          icon={Package}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
          <RevenueChart />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Customers</h2>
          <CustomerTable />
        </div>
      </div>
    </div>
  );
}
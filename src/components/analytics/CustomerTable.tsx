import React from 'react';

const topCustomers = [
  { name: 'Acme Corp', revenue: '$12,450', orders: 45 },
  { name: 'TechStart Inc', revenue: '$9,872', orders: 38 },
  { name: 'Global Solutions', revenue: '$8,341', orders: 31 },
  { name: 'Innovate Ltd', revenue: '$7,824', orders: 29 },
];

export function CustomerTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Revenue
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Orders
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {topCustomers.map((customer, index) => (
            <tr key={index}>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                {customer.name}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                {customer.revenue}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                {customer.orders}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
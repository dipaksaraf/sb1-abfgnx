import React from 'react';
import { Customer } from '../../types/customer';
import { Phone, Mail, Building2, Calendar } from 'lucide-react';

interface CustomerCardProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
}

export function CustomerCard({ customer, onEdit }: CustomerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
          <p className="text-sm text-gray-500">{customer.company}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          customer.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {customer.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <a href={`mailto:${customer.email}`} className="text-sm hover:text-blue-600">
            {customer.email}
          </a>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          <a href={`tel:${customer.phone}`} className="text-sm hover:text-blue-600">
            {customer.phone}
          </a>
        </div>
        <div className="flex items-center text-gray-600">
          <Building2 className="w-4 h-4 mr-2" />
          <span className="text-sm">{customer.company}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {customer.last_contact 
              ? new Date(customer.last_contact).toLocaleDateString()
              : 'No recent contact'}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {customer.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={() => onEdit(customer)}
        className="mt-4 w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
      >
        Edit Details
      </button>
    </div>
  );
}
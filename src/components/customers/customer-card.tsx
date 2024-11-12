import { Customer } from "@/types/customer";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Mail, Phone, Calendar } from "lucide-react";

interface CustomerCardProps {
  customer: Customer;
  onEdit?: (customer: Customer) => void;
}

export function CustomerCard({ customer, onEdit }: CustomerCardProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{customer.name}</h3>
          <p className="text-sm text-gray-500">{customer.company}</p>
        </div>
        <Badge variant={customer.status === "active" ? "success" : "secondary"}>
          {customer.status}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm">
          <Mail className="h-4 w-4 mr-2 text-gray-500" />
          <a href={`mailto:${customer.email}`} className="text-blue-600 hover:underline">
            {customer.email}
          </a>
        </div>
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 mr-2 text-gray-500" />
          <a href={`tel:${customer.phone}`} className="text-blue-600 hover:underline">
            {customer.phone}
          </a>
        </div>
        <div className="flex items-center text-sm">
          <Building2 className="h-4 w-4 mr-2 text-gray-500" />
          <span>{customer.address.city}, {customer.address.country}</span>
        </div>
        {customer.lastContact && (
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>Last contact: {formatDate(customer.lastContact)}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {customer.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>

      {onEdit && (
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => onEdit(customer)}
        >
          Edit Details
        </Button>
      )}
    </Card>
  );
}
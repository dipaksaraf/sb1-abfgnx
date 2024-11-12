import { Order } from "@/types/order";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, Truck, Calendar, DollarSign } from "lucide-react";
import { useUpdateOrderStatus } from "@/hooks/use-orders";

const statusColors = {
  pending: "warning",
  processing: "info",
  shipped: "primary",
  delivered: "success",
  cancelled: "destructive",
} as const;

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const updateStatus = useUpdateOrderStatus();

  const handleStatusUpdate = (newStatus: Order["status"]) => {
    updateStatus.mutate({ id: order.id, status: newStatus });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">Order #{order.id.slice(0, 8)}</h3>
          <p className="text-sm text-gray-500">
            {order.customer?.name} - {order.customer?.company}
          </p>
        </div>
        <Badge variant={statusColors[order.status]}>
          {order.status}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm">
          <Package className="h-4 w-4 mr-2 text-gray-500" />
          <span>{order.items.length} items</span>
        </div>
        <div className="flex items-center text-sm">
          <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
          <span>{formatCurrency(order.total)}</span>
        </div>
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
          <span>{formatDate(order.createdAt)}</span>
        </div>
        {order.trackingNumber && (
          <div className="flex items-center text-sm">
            <Truck className="h-4 w-4 mr-2 text-gray-500" />
            <span>Tracking: {order.trackingNumber}</span>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {order.status === "pending" && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleStatusUpdate("processing")}
          >
            Mark as Processing
          </Button>
        )}
        {order.status === "processing" && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleStatusUpdate("shipped")}
          >
            Mark as Shipped
          </Button>
        )}
        {order.status === "shipped" && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleStatusUpdate("delivered")}
          >
            Mark as Delivered
          </Button>
        )}
      </div>
    </Card>
  );
}
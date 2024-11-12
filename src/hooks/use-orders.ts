import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Order } from "@/types/order";
import * as orderService from "@/services/order-service";
import { useToast } from "@/components/ui/use-toast";

export function useOrders(params?: Parameters<typeof orderService.getOrders>[0]) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => orderService.getOrders(params),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => orderService.getOrderById(id),
    enabled: !!id,
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Order["status"] }) =>
      orderService.updateOrderStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", variables.id] });
      toast({
        title: "Order updated",
        description: `Order status changed to ${variables.status}`,
      });
    },
  });
}

export function useUpdateTrackingNumber() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, trackingNumber }: { id: string; trackingNumber: string }) =>
      orderService.updateTrackingNumber(id, trackingNumber),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", variables.id] });
      toast({
        title: "Tracking updated",
        description: "Tracking number has been updated",
      });
    },
  });
}
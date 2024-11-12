import { supabase } from "@/lib/supabase";
import { Order } from "@/types/order";

export async function getOrders(params?: {
  customerId?: string;
  status?: Order["status"];
  limit?: number;
  offset?: number;
}) {
  let query = supabase
    .from("orders")
    .select(`
      *,
      customer:customers(id, name, company),
      items:order_items(
        *,
        product:products(id, name, sku)
      )
    `, { count: "exact" });

  if (params?.customerId) {
    query = query.eq("customerId", params.customerId);
  }

  if (params?.status) {
    query = query.eq("status", params.status);
  }

  if (params?.limit) {
    query = query.limit(params.limit);
  }

  if (params?.offset) {
    query = query.range(params.offset, params.offset + (params.limit || 10) - 1);
  }

  const { data, error, count } = await query;

  if (error) throw error;
  return { data: data as Order[], count };
}

export async function getOrderById(id: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      customer:customers(id, name, company),
      items:order_items(
        *,
        product:products(id, name, sku)
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Order;
}

export async function updateOrderStatus(id: string, status: Order["status"]) {
  const { data, error } = await supabase
    .from("orders")
    .update({
      status,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Order;
}

export async function updateTrackingNumber(id: string, trackingNumber: string) {
  const { data, error } = await supabase
    .from("orders")
    .update({
      trackingNumber,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Order;
}
import { supabase } from "@/lib/supabase";
import { Customer, CustomerFormData } from "@/types/customer";

export async function getCustomers(params?: {
  search?: string;
  status?: Customer["status"];
  limit?: number;
  offset?: number;
}) {
  let query = supabase
    .from("customers")
    .select("*", { count: "exact" });

  if (params?.search) {
    query = query.or(`name.ilike.%${params.search}%,email.ilike.%${params.search}%,company.ilike.%${params.search}%`);
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
  return { data: data as Customer[], count };
}

export async function getCustomerById(id: string) {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Customer;
}

export async function createCustomer(customer: CustomerFormData) {
  const { data, error } = await supabase
    .from("customers")
    .insert([{
      ...customer,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) throw error;
  return data as Customer;
}

export async function updateCustomer(id: string, customer: Partial<CustomerFormData>) {
  const { data, error } = await supabase
    .from("customers")
    .update({
      ...customer,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Customer;
}

export async function deleteCustomer(id: string) {
  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
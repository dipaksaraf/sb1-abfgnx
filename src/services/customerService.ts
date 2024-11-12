import { supabase } from '../lib/supabase';
import { Customer, CustomerFormData } from '../types/customer';

export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createCustomer(customerData: CustomerFormData): Promise<Customer> {
  const { data, error } = await supabase
    .from('customers')
    .insert([{
      ...customerData,
      created_at: new Date().toISOString(),
      last_contact: null,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCustomer(id: string, customerData: CustomerFormData): Promise<Customer> {
  const { data, error } = await supabase
    .from('customers')
    .update(customerData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCustomer(id: string): Promise<void> {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
import { supabase } from "@/lib/supabase";
import { Quote } from "@/types/sales";

export async function getQuotes(customerId?: string) {
  let query = supabase
    .from("quotes")
    .select(`
      *,
      customer:customers(id, name, company),
      items:quote_items(
        *,
        product:products(id, name, price)
      )
    `);

  if (customerId) {
    query = query.eq("customerId", customerId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Quote[];
}

export async function getQuoteById(id: string) {
  const { data, error } = await supabase
    .from("quotes")
    .select(`
      *,
      customer:customers(id, name, company),
      items:quote_items(
        *,
        product:products(id, name, price)
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Quote;
}

export async function createQuote(quote: Omit<Quote, "id" | "createdAt" | "updatedAt">) {
  const { data, error } = await supabase
    .from("quotes")
    .insert([{
      ...quote,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) throw error;
  return data as Quote;
}

export async function updateQuote(id: string, quote: Partial<Quote>) {
  const { data, error } = await supabase
    .from("quotes")
    .update({
      ...quote,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Quote;
}

export async function deleteQuote(id: string) {
  const { error } = await supabase
    .from("quotes")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
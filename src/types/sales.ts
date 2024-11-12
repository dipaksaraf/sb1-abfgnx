import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  description: z.string(),
  price: z.number().positive(),
  sku: z.string(),
  inStock: z.number().int().min(0),
  category: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const QuoteItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
  discount: z.number().min(0).max(100).default(0),
});

export const QuoteSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
  items: z.array(QuoteItemSchema),
  status: z.enum(["draft", "sent", "accepted", "rejected"]),
  validUntil: z.string().datetime(),
  notes: z.string().optional(),
  terms: z.string().optional(),
  subtotal: z.number().positive(),
  discount: z.number().min(0),
  tax: z.number().min(0),
  total: z.number().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Product = z.infer<typeof ProductSchema>;
export type QuoteItem = z.infer<typeof QuoteItemSchema>;
export type Quote = z.infer<typeof QuoteSchema>;
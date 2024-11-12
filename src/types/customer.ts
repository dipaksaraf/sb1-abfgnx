import { z } from "zod";

export const CustomerSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().min(2).max(100),
  status: z.enum(["active", "inactive", "lead"]),
  tags: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
  notes: z.string().optional(),
  assignedTo: z.string().uuid().optional(),
  lastContact: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Customer = z.infer<typeof CustomerSchema>;

export const CustomerFormSchema = CustomerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CustomerFormData = z.infer<typeof CustomerFormSchema>;
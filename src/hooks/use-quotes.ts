import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Quote } from "@/types/sales";
import * as quoteService from "@/services/quote-service";
import { useToast } from "@/components/ui/use-toast";

export function useQuotes(customerId?: string) {
  return useQuery({
    queryKey: ["quotes", { customerId }],
    queryFn: () => quoteService.getQuotes(customerId),
  });
}

export function useQuote(id: string) {
  return useQuery({
    queryKey: ["quotes", id],
    queryFn: () => quoteService.getQuoteById(id),
    enabled: !!id,
  });
}

export function useCreateQuote() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (quote: Parameters<typeof quoteService.createQuote>[0]) =>
      quoteService.createQuote(quote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      toast({
        title: "Quote created",
        description: "The quote has been created successfully.",
      });
    },
  });
}

export function useUpdateQuote() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Quote> }) =>
      quoteService.updateQuote(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      queryClient.invalidateQueries({ queryKey: ["quotes", variables.id] });
      toast({
        title: "Quote updated",
        description: "The quote has been updated successfully.",
      });
    },
  });
}

export function useDeleteQuote() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: quoteService.deleteQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      toast({
        title: "Quote deleted",
        description: "The quote has been deleted successfully.",
      });
    },
  });
}
import { QuoteBuilder } from "@/components/sales/quote-builder";

export default function NewQuotePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Create New Quote</h1>
      </div>
      <QuoteBuilder />
    </div>
  );
}
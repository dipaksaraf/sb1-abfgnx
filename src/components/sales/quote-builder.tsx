import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuoteSchema, type Quote } from "@/types/sales";
import { useCreateQuote } from "@/hooks/use-quotes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { generateQuotePDF } from "./quote-pdf-generator";
import { Plus, Trash2, FileText, Send } from "lucide-react";

export function QuoteBuilder() {
  const [items, setItems] = useState<Quote["items"]>([]);
  const createQuote = useCreateQuote();

  const { register, handleSubmit, formState: { errors } } = useForm<Quote>({
    resolver: zodResolver(QuoteSchema),
  });

  const addItem = () => {
    setItems([...items, { productId: "", quantity: 1, unitPrice: 0, discount: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((acc, item) => 
      acc + (item.unitPrice * item.quantity), 0);
    const discount = items.reduce((acc, item) => 
      acc + (item.unitPrice * item.quantity * (item.discount / 100)), 0);
    const tax = (subtotal - discount) * 0.1; // 10% tax
    const total = subtotal - discount + tax;

    return { subtotal, discount, tax, total };
  };

  const handlePreviewPDF = (data: Quote) => {
    const quoteData = {
      ...data,
      items,
      ...calculateTotals(),
      createdAt: new Date().toISOString(),
      customer: {
        name: "Customer Name", // This would come from selected customer
        company: "Company Name",
      },
    };

    const doc = generateQuotePDF(quoteData);
    doc.output('dataurlnewwindow');
  };

  const onSubmit = async (data: Quote) => {
    const quoteData = {
      ...data,
      items,
      ...calculateTotals(),
    };

    await createQuote.mutate(quoteData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input
                type="date"
                id="validUntil"
                {...register("validUntil")}
              />
              {errors.validUntil && (
                <p className="text-sm text-red-500 mt-1">{errors.validUntil.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                {...register("status")}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              {errors.status && (
                <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Add any notes or special instructions..."
            />
          </div>

          <div>
            <Label htmlFor="terms">Terms and Conditions</Label>
            <Textarea
              id="terms"
              {...register("terms")}
              placeholder="Add terms and conditions..."
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Line Items</h3>
            <Button type="button" onClick={addItem} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4">
                <Label>Product</Label>
                <select
                  value={item.productId}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].productId = e.target.value;
                    setItems(newItems);
                  }}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="">Select a product...</option>
                  {/* Product options will be populated from the database */}
                </select>
              </div>
              <div className="col-span-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].quantity = parseInt(e.target.value);
                    setItems(newItems);
                  }}
                />
              </div>
              <div className="col-span-2">
                <Label>Unit Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].unitPrice = parseFloat(e.target.value);
                    setItems(newItems);
                  }}
                />
              </div>
              <div className="col-span-2">
                <Label>Discount %</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={item.discount}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].discount = parseFloat(e.target.value);
                    setItems(newItems);
                  }}
                />
              </div>
              <div className="col-span-1 pt-6">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeItem(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(calculateTotals().subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discount:</span>
                <span>-{formatCurrency(calculateTotals().discount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>{formatCurrency(calculateTotals().tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(calculateTotals().total)}</span>
              </div>
            </div>
          </div>
        )}
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleSubmit(handlePreviewPDF)}
        >
          <FileText className="w-4 h-4 mr-2" />
          Preview PDF
        </Button>
        <Button type="submit">
          <Send className="w-4 h-4 mr-2" />
          Create Quote
        </Button>
      </div>
    </form>
  );
}
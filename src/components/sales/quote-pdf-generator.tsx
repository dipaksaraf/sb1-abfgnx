import { jsPDF } from 'jspdf';
import { Quote } from '@/types/sales';
import { formatCurrency, formatDate } from '@/lib/utils';

export function generateQuotePDF(quote: Quote) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;

  // Header
  doc.setFontSize(20);
  doc.text('Quote', pageWidth / 2, margin, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Quote #: ${quote.id}`, margin, margin + 10);
  doc.text(`Date: ${formatDate(quote.createdAt)}`, margin, margin + 15);
  doc.text(`Valid Until: ${formatDate(quote.validUntil)}`, margin, margin + 20);

  // Customer Information
  doc.setFontSize(12);
  doc.text('Customer Information', margin, margin + 30);
  doc.setFontSize(10);
  doc.text([
    `${quote.customer?.name || 'N/A'}`,
    `${quote.customer?.company || 'N/A'}`,
  ], margin, margin + 40);

  // Items Table
  const tableStartY = margin + 60;
  const columns = ['Item', 'Quantity', 'Unit Price', 'Discount', 'Total'];
  const columnWidths = [70, 25, 30, 25, 30];
  
  // Table Header
  let currentX = margin;
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, tableStartY - 5, pageWidth - (margin * 2), 8, 'F');
  doc.setFont('helvetica', 'bold');
  
  columns.forEach((column, index) => {
    doc.text(column, currentX, tableStartY);
    currentX += columnWidths[index];
  });

  // Table Content
  let currentY = tableStartY + 10;
  doc.setFont('helvetica', 'normal');

  quote.items.forEach((item, index) => {
    if (currentY > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      currentY = margin + 10;
    }

    currentX = margin;
    const lineTotal = item.quantity * item.unitPrice * (1 - item.discount / 100);

    [
      item.product?.name || 'Unknown Product',
      item.quantity.toString(),
      formatCurrency(item.unitPrice),
      `${item.discount}%`,
      formatCurrency(lineTotal),
    ].forEach((text, colIndex) => {
      doc.text(text, currentX, currentY);
      currentX += columnWidths[colIndex];
    });

    currentY += 8;
  });

  // Totals
  currentY += 10;
  doc.line(margin, currentY - 5, pageWidth - margin, currentY - 5);
  
  const totalsStartX = pageWidth - margin - 60;
  [
    ['Subtotal:', formatCurrency(quote.subtotal)],
    ['Discount:', formatCurrency(quote.discount)],
    ['Tax:', formatCurrency(quote.tax)],
    ['Total:', formatCurrency(quote.total)],
  ].forEach(([label, value]) => {
    doc.text(label, totalsStartX, currentY);
    doc.text(value, totalsStartX + 30, currentY, { align: 'right' });
    currentY += 6;
  });

  // Notes
  if (quote.notes) {
    currentY += 10;
    doc.setFontSize(12);
    doc.text('Notes:', margin, currentY);
    doc.setFontSize(10);
    doc.text(quote.notes, margin, currentY + 8);
  }

  // Terms
  if (quote.terms) {
    currentY += 30;
    doc.setFontSize(12);
    doc.text('Terms and Conditions:', margin, currentY);
    doc.setFontSize(10);
    doc.text(quote.terms, margin, currentY + 8);
  }

  // Footer
  const footerText = 'Thank you for your business!';
  doc.setFontSize(10);
  doc.text(
    footerText,
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - margin,
    { align: 'center' }
  );

  return doc;
}
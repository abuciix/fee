import InvoicesView from "@/components/finance/InvoicesView";
import { getInvoices } from "@/lib/finance-queries";

export const metadata = { title: "Invoices & Payments" };

export default async function InvoicesPage() {
  const invoices = await getInvoices();
  return <InvoicesView invoices={invoices} />;
}

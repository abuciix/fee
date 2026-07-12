import ExpensesView from "@/components/finance/ExpensesView";
import { getExpenses } from "@/lib/finance-queries";

export const metadata = { title: "Expenses" };

export default async function ExpensesPage() {
  const expenses = await getExpenses();
  return <ExpensesView expenses={expenses} />;
}

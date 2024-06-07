import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ExpenseSheet } from "../sheet-expense";
import { getCategories, getTypeExpenses } from "../../_actions";

export const AddExpenses = async () => {
  const categories = await getCategories();
  const typeExpenses = await getTypeExpenses();
  return (
    <ExpenseSheet categories={categories} typeExpenses={typeExpenses}>
      <Button className="flex items-center gap-2">
        <PlusCircle size={16} />
        Adicionar
      </Button>
    </ExpenseSheet>
  );
};

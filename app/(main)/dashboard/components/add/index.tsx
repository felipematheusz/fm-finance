import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getCategories, getTypeExpenses } from "../../_actions";
import { AddSheet } from "./components";

export const Add = async () => {
  const categories = await getCategories();
  const typeExpenses = await getTypeExpenses();
  return (
    <AddSheet categories={categories} typeExpenses={typeExpenses}>
      <Button className="flex items-center gap-2">
        <PlusCircle size={16} />
        Adicionar
      </Button>
    </AddSheet>
  );
};

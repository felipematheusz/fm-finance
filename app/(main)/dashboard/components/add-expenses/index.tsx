import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const AddExpenses = () => {
  return (
    <Button className="flex items-center gap-2">
      <PlusCircle size={16} />
      Adicionar
    </Button>
  );
};

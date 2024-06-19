import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { getTotalValueOfExpenses } from "../../_actions";
import {
  getTotalValueOfAllIncome,
  getTotalValueOfIncome,
} from "../../_actions/income";

export const FinancialSumary = () => {
  const totalValueOfExpenses = getTotalValueOfExpenses();
  const totalValueOfIncome = getTotalValueOfIncome();
  const totalValueOfAllIncome = getTotalValueOfAllIncome();

  return (
    <div className="flex gap-5">
      <Card className="w-full flex items-center gap-4 p-4">
        <div className="border border-gray-200 rounded-lg w-max h-max p-2 bg-blue-500/20">
          <DollarSign color="#3b82f6" />
        </div>
        <div>
          <h1 className="text-base font-semibold">Saldo Total</h1>
          <p className="text-sm text-gray-500">{totalValueOfAllIncome}</p>
        </div>
      </Card>
      <Card className="w-full flex items-center gap-4 p-4">
        <div className="border border-gray-200 rounded-lg w-max h-max p-2 bg-green-500/20">
          <DollarSign color="#10b981" />
        </div>
        <div>
          <h1 className="text-base font-semibold">Entradas do Mês</h1>
          <p className="text-sm text-gray-500">{totalValueOfIncome}</p>
        </div>
      </Card>
      <Card className="w-full flex items-center gap-4 p-4">
        <div className="border border-gray-200 rounded-lg w-max h-max p-2 bg-red-500/20">
          <DollarSign color="#ef4444" />
        </div>
        <div>
          <h1 className="text-base font-semibold">Saídas do Mês</h1>
          <p className="text-sm text-gray-500">{totalValueOfExpenses}</p>
        </div>
      </Card>
    </div>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getTypeExpenses } from "../../_actions";

export const CardsTypeExpense = async () => {
  const typeExpenses = await getTypeExpenses();
  return (
    <div className="flex justify-between flex-wrap md:flex-nowrap gap-5">
      {typeExpenses.map((typeExpense) => (
        <Card key={typeExpense.id} className="w-full">
          <div className="flex flex-col justify-start h-full">
            <CardHeader className="border-b">
              <CardTitle>{typeExpense.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="pt-4">
                <div className="flex items-center justify-between">
                  <span>{`Meta (${typeExpense?.targetPercentage}% do salário)`}</span>
                  <span className="font-medium">
                    {typeExpense?.targetPercentageValue.toLocaleString(
                      "pt-BR",
                      { style: "currency", currency: "BRL" }
                    )}
                  </span>
                </div>
                <div className="mt-4">
                  <Progress
                    value={typeExpense?.targetPercentageMonthValue ?? 0}
                  />
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                    <span>{`${(
                      typeExpense?.targetPercentageMonthValue ?? 0 * 100
                    ).toFixed(0)}% da meta`}</span>

                    <span>{`${typeExpense?.totalValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })} / ${typeExpense?.targetPercentageValue.toLocaleString(
                      "pt-BR",
                      { style: "currency", currency: "BRL" }
                    )}`}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};

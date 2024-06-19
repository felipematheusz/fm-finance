import { getTotalExpensesByDay } from "@/app/(main)/dashboard/_actions/type-expense";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("./react-apexcharts"), { ssr: false });

export const SpendingChart = async () => {
  const rawData = await getTotalExpensesByDay();

  const categories = rawData.map((item) =>
    new Date(item.date).toLocaleDateString("pt-BR")
  );
  const data = rawData.map((item) => item.totalValue || 0);

  const spendingData = {
    categories: categories,
    series: [
      {
        name: "Despesas",
        data: data,
      },
    ],
  };

  return (
    <Card>
      <div className="flex justify-between items-center border-b">
        <CardHeader>
          <CardTitle>Despesas por Período</CardTitle>
        </CardHeader>
      </div>
      <div className="h-[300px]">
        <Chart data={spendingData} />
      </div>
    </Card>
  );
};

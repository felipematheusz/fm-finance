import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("./react-apexcharts"), { ssr: false });

import { getTotalExpensesByCategory } from "@/app/(main)/dashboard/_actions/category";

export const CategoryChart = async () => {
  const backendData = await getTotalExpensesByCategory();

  const spendingData = {
    categories: backendData.map((item) => item?.categoryName || "Desconhecido"),
    series: [
      {
        name: "Despesas",
        data: backendData.map((item) => item.totalValue || 0),
      },
    ],
  };

  return (
    <Card>
      <div className="flex justify-between items-center border-b">
        <CardHeader>
          <CardTitle>Despesas por Categoria</CardTitle>
        </CardHeader>
      </div>

      <div className="h-[288px] flex flex-col justify-center">
        {backendData.length > 0 ? (
          <Chart data={spendingData} />
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-sm text-gray-500">Nenhum dado encontrado</p>
          </div>
        )}
      </div>
    </Card>
  );
};

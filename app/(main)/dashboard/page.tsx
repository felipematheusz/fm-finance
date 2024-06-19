import { Metadata } from "next";
import {
  Add,
  CardProfile,
  CategoryChart,
  FinancialSumary,
  SpendingChart,
  TableExpenses,
} from "./components";
import { getLastSixExpenses } from "./_actions/type-expense";

export const metadata: Metadata = {
  title: "Dashboard | FM Finance",
};

export default async function Dashboard() {
  const lastSixExpenses = await getLastSixExpenses();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <Add />
      </div>
      <div className="flex gap-5">
        <CardProfile />
        <div className="flex flex-col gap-5 w-full">
          <FinancialSumary />
          <SpendingChart />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <TableExpenses lastSixExpenses={lastSixExpenses} />
        </div>
        <div className="col-span-1">
          <CategoryChart />
        </div>
      </div>
    </div>
  );
}

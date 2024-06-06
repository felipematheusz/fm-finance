import { Metadata } from "next";
import { AddExpenses, CardsTypeExpense } from "./components";

export const metadata: Metadata = {
  title: "Dashboard | FM Finance",
};

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <AddExpenses />
      </div>
      <CardsTypeExpense />
    </div>
  );
}

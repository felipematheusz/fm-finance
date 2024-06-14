import { Metadata } from "next";
import { AddExpenses, CardsTypeExpense, Graphics } from "./components";
import { Card } from "@/components/ui/card";

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
      <div className="flex gap-5">
        <div className="w-[450px]">
          <Card className="h-full"></Card>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <CardsTypeExpense />
          <Graphics />
        </div>
      </div>
    </div>
  );
}

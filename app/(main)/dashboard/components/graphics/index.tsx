import { CategoryChart, DaySpendingChart } from "./components";

export const Graphics = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2">
        <DaySpendingChart />
      </div>
      <div className="col-span-1">
        <CategoryChart />
      </div>
    </div>
  );
};

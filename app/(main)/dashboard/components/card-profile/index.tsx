import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { getTypeExpenses } from "../../_actions";
import { Progress } from "@/components/ui/progress";
import { CircleAlert } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const CardProfile = async () => {
  const session = await auth();
  const typeExpenses = await getTypeExpenses();

  return (
    <div className="w-[450px]">
      <Card className="h-full">
        <div className="flex items-center gap-3 p-4">
          <div className="border p-2 w-max rounded-full">
            <Avatar className="w-16 h-16">
              <AvatarImage src="" alt="Avatar do usuário" />
              <AvatarFallback className="bg-primary text-white text-2xl">
                {session?.user?.name?.charAt(0) || ""}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h1 className="text-lg font-bold">Olá, {session?.user?.name}</h1>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4 px-4">
          <p className="text-base font-semibold">Suas Metas</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleAlert color="gray" size={18} />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Acompanhe suas metas e como você<br></br> está se comportando
                  financeiramente.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div
          className={`flex flex-col md:flex-nowrap gap-4 max-h-[284px] p-4 ${
            typeExpenses.length > 3 ? "overflow-y-auto" : ""
          }`}
        >
          {typeExpenses.map((typeExpense, index) => (
            <div
              key={typeExpense?.id}
              className={`${
                index !== 0 ? "border-t border-gray-200 pt-2" : ""
              }`}
            >
              <span className="font-medium text-sm">{`${typeExpense?.name} (${typeExpense?.targetPercentage}%)`}</span>

              <div className="mt-2">
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
          ))}
        </div>
      </Card>
    </div>
  );
};

import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { getTypeExpenses } from "../../_actions";
import { Progress } from "@/components/ui/progress";

export const CardProfile = async () => {
  const session = await auth();
  const typeExpenses = await getTypeExpenses();

  return (
    <div className="w-[450px]">
      <Card className="h-full p-4">
        <div className="flex items-center gap-3 pb-4">
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

        <div className="flex flex-col md:flex-nowrap gap-4">
          {typeExpenses.map((typeExpense) => (
            <div
              key={typeExpense?.id}
              className="border-t border-gray-2000 pt-4"
            >
              <span className="font-medium text-sm">{`${typeExpense?.name} (${typeExpense?.targetPercentage}%)`}</span>

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
          ))}
        </div>
      </Card>
    </div>
  );
};

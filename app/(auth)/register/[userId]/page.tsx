import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import registerPercentages from "../_actions/percentages";
import { Separator } from "@/components/ui/separator";

export default function PercentagesForm({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex items-center justify-center gap-4">
        <div className="h-10 w-10 rounded-full  bg-slate-400 flex items-center justify-center">
          <p className="text-white text-xl font-bold">1</p>
        </div>
        <Separator className="w-10 bg-primary" />
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
          <p className="text-white text-xl font-bold">2</p>
        </div>
      </div>
      <form action={registerPercentages}>
        <Card className="w-full md:w-[650px]">
          <CardHeader>
            <CardTitle className="text-2xl">Passo 2</CardTitle>
            <CardDescription>
              Insira seu salário e despesas para calcular o seu Plano
              Financeiro.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="salary">Salário</Label>
              <Input
                name="salary"
                type="number"
                placeholder="Insira seu salário"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input type="hidden" name="userId" value={params.userId} />
              <div className="grid gap-2">
                <Label htmlFor="fixed-expenses">Despesas Fixas</Label>
                <Input
                  name="fixed-expenses"
                  type="number"
                  placeholder="Insira a porcentagem"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="variable-expenses">Despesas Variáveis</Label>
                <Input
                  name="variable-expenses"
                  type="number"
                  placeholder="Insira a porcentagem"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="investments">Investimentos</Label>
                <Input
                  name="investments"
                  type="number"
                  placeholder="Insira a porcentagem"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goals">Metas</Label>
                <Input
                  name="goals"
                  type="number"
                  placeholder="Insira a porcentagem"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full">Cadastrar</Button>
            <Link className="text-sm underline" href="/login">
              Já possui conta?
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
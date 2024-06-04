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
import register from "../_actions/register";
import { Separator } from "@/components/ui/separator";

export const PercentagesForm = () => {
  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex items-center justify-center gap-4">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
          <p className="text-white text-xl font-bold">1</p>
        </div>
        <Separator className="w-10 bg-primary" />
        <div className="h-10 w-10 rounded-full bg-slate-400 flex items-center justify-center">
          <p className="text-white text-xl font-bold">2</p>
        </div>
      </div>
      <form action={register}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Registrar</CardTitle>
            <CardDescription>
              Insira seu salário e despesas para calcular o seu Plano
              Financeiro.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex gap-2">
              <div className="grid gap-2">
                <Label htmlFor="salary">Salário</Label>
                <Input
                  name="salary"
                  type="number"
                  placeholder="Insira seu salário"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fixed-expenses">Despesas Fixas</Label>
                <Input
                  name="fixed-expenses"
                  type="number"
                  placeholder="Insira as despesas fixas"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="variable-expenses">Despesas Variáveis</Label>
              <Input
                name="variable-expenses"
                type="number"
                placeholder="Insira as despesas variáveis"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full">Próximo passo</Button>
            <Link className="text-sm underline" href="/login">
              Já possui conta?
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

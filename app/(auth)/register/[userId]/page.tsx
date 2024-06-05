"use client";

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
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { PercentagesSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { registerPercentages } from "../_actions/percentages";

export default function PercentagesForm({
  params,
}: {
  params: { userId: string };
}) {
  const form = useForm<z.infer<typeof PercentagesSchema>>({
    resolver: zodResolver(PercentagesSchema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const result = await registerPercentages({
        salary: data.salary,
        fixedExpensesPercentage: data.fixedExpensesPercentage,
        variableExpensesPercentage: data.variableExpensesPercentage,
        investmentsPercentage: data.investmentsPercentage,
        goalsPercentage: data.goalsPercentage,
        userId: params.userId,
      });
      if (result?.error) {
        toast({
          title: "Erro",
          description: result.error,
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

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
      <form onSubmit={handleSubmit}>
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
                {...form.register("salary")}
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
                  {...form.register("fixedExpensesPercentage")}
                  type="number"
                  placeholder="Insira a porcentagem"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="variable-expenses">Despesas Variáveis</Label>
                <Input
                  {...form.register("variableExpensesPercentage")}
                  type="number"
                  placeholder="Insira a porcentagem"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="investments">Investimentos</Label>
                <Input
                  {...form.register("investmentsPercentage")}
                  type="number"
                  placeholder="Insira a porcentagem"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goals">Metas</Label>
                <Input
                  {...form.register("goalsPercentage")}
                  type="number"
                  placeholder="Insira a porcentagem"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? "Calculando..." : "Cadastrar"}
            </Button>
            <Link className="text-sm underline" href="/login">
              Já possui conta?
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

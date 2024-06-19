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
import login from "../_actions/login";
import { toast } from "@/components/ui/use-toast";
import { useTransition } from "react";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        toast({
          title: result.error,
          description: "Ocorreu um erro ao tentar fazer login.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Bem-vindo de volta!",
          description: "Você está logado.",
        });
      }
    });
  }

  return (
    <form action={handleSubmit}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">FM Finance</CardTitle>
          <CardDescription>
            Gerencie suas finanças pessoais com facilidade.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Insira seu email"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Insira sua senha"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-4">
          <Button className="w-full" disabled={isPending}>
            {isPending ? "Entrando..." : "Entrar"}
          </Button>
          <Link className="text-sm underline" href="/register">
            Não possui conta?
          </Link>
        </CardFooter>
      </Card>
    </form>
  );
};

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
import { register } from "../_actions/register";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const result = await register(data);

      if (result?.error) {
        toast({
          title: "Erro",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro de Conexão",
        description: "Não foi possível conectar ao servidor.",
        variant: "destructive",
      });
    }
  });

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
      <form onSubmit={handleSubmit}>
        <Card className="w-full md:w-[650px]">
          <CardHeader>
            <CardTitle className="text-2xl">Passo 1</CardTitle>
            <CardDescription>
              Insira seus dados para ir para o próximo passo.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 w-full">
            <div className="flex gap-2 w-full">
              <div className="grid gap-2 w-full">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  type="text"
                  placeholder="Insira seu nome"
                  required
                  {...form.register("name")}
                />
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...form.register("email")}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" required {...form.register("password")} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? "Carregando..." : "Próximo passo"}
            </Button>
            <Link className="text-sm underline" href="/login">
              Já possui conta?
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

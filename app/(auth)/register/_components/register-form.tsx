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
import { useForm } from "react-hook-form";
import { CredentialsSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useFormContext } from "@/contexts";
import { verifyUser } from "../_actions/register";

type RegisterFormProps = {
  setStep: (step: number) => void;
};

export const RegisterForm = ({ setStep }: RegisterFormProps) => {
  const { updateFormData, formData } = useFormContext()!;

  const form = useForm<z.infer<typeof CredentialsSchema>>({
    resolver: zodResolver(CredentialsSchema),
    defaultValues: {
      registerData: {
        name: formData.registerData?.name,
        email: formData.registerData?.email,
        password: formData.registerData?.password,
      },
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const user = await verifyUser(data.registerData.email);

    if (user?.error) {
      toast({
        title: "Usuário já existe",
        description: "Já existe um usuário cadastrado com essa conta.",
      });
      return;
    }

    updateFormData("registerData", {
      name: data.registerData.name,
      email: data.registerData.email,
      password: data.registerData.password,
    });
    setStep(2);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full md:w-[650px]">
        <CardHeader>
          <CardTitle className="text-2xl">Passo 1</CardTitle>
          <CardDescription>
            Crie primeiro os dados de acesso para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 w-full">
          <div className="flex gap-2 w-full">
            <div className="grid gap-2 w-full">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Insira seu nome"
                required
                {...form.register("registerData.name")}
              />
            </div>
            <div className="grid gap-2 w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...form.register("registerData.email")}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              required
              {...form.register("registerData.password")}
            />
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
  );
};

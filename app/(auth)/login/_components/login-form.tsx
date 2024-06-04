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
import { useFormStatus } from "react-dom";

export const LoginForm = () => {
  return (
    <form
      action={async (formData: FormData) => {
        const result = await login(formData);
        if (result?.error) {
          toast({
            title: result.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Bem-vindo de volta!",
            description: "Você está logado.",
          });
        }
      }}
    >
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
              placeholder="m@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input name="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-4">
          <Button className="w-full">Entrar</Button>
          <Link className="text-sm underline" href="/register">
            Não possui conta?
          </Link>
        </CardFooter>
      </Card>
    </form>
  );
};

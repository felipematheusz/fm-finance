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
import { useForm } from "react-hook-form";
import { SalarySchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContext } from "@/contexts";

type SalaryFormProps = {
  setStep: (step: number) => void;
};

export const SalaryForm = ({ setStep }: SalaryFormProps) => {
  const { updateFormData, formData } = useFormContext()!;

  const form = useForm<z.infer<typeof SalarySchema>>({
    resolver: zodResolver(SalarySchema),
    defaultValues: {
      salaryData: formData?.salaryData,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setStep(3);
    updateFormData("salaryData", data.salaryData);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full md:w-[650px]">
        <CardHeader>
          <CardTitle className="text-2xl">Passo 2</CardTitle>
          <CardDescription>Insira seu salário para proseguir.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="salary">Salário</Label>
            <Input
              {...form.register("salaryData.salary")}
              type="number"
              placeholder="Insira seu salário"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-4">
          <Button type="button" onClick={() => setStep(1)} variant="secondary">
            Voltar
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Calculando..." : "Próximo passo"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

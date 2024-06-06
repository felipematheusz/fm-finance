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
import { useForm, useFieldArray } from "react-hook-form";
import { TypeExpenseArraySchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext } from "@/contexts";
import { PlusCircle, X } from "lucide-react";

type TypeExpenseFormProps = {
  setStep: (step: number) => void;
};

export const TypeExpenseForm = ({ setStep }: TypeExpenseFormProps) => {
  const { updateFormData, formData } = useFormContext()!;
  const form = useForm({
    resolver: zodResolver(TypeExpenseArraySchema),
    defaultValues: {
      typeExpenseData:
        formData?.typeExpenseData?.length > 0
          ? formData.typeExpenseData
          : [{ name: "", percentage: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "typeExpenseData",
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setStep(4);
    updateFormData("typeExpenseData", data.typeExpenseData);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full md:w-[650px]">
        <CardHeader>
          <CardTitle className="text-2xl">Passo 3</CardTitle>
          <CardDescription>
            Informe até 4 tipos de despesas e suas porcentagens para montarmos
            seu Plano Financeiro. Ex: Despesas variáveis, Despesas fixas, etc.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-2">
              <div className="grid gap-2 w-full">
                <Label htmlFor={`typeExpenseData.${index}.name`}>
                  Nome da despesa
                </Label>
                <Input
                  {...form.register(`typeExpenseData.${index}.name`)}
                  type="text"
                  placeholder="Insira o nome da despesa"
                  required
                />
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor={`typeExpenseData.${index}.percentage`}>
                  Porcentagem
                </Label>
                <div className="flex gap-2">
                  <Input
                    {...form.register(`typeExpenseData.${index}.percentage`)}
                    type="number"
                    placeholder="Insira a porcentagem"
                    required
                  />
                  {index > 0 && (
                    <Button
                      className="w-10"
                      variant="secondary"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <X className="min-w-4" size={16} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {fields.length < 4 && (
            <Button
              className="w-max text-sm flex items-center gap-2"
              variant="ghost"
              type="button"
              onClick={() => append({ name: "", percentage: "" })}
            >
              <PlusCircle size={16} />
              Adicionar Despesa
            </Button>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-4">
          <Button onClick={() => setStep(2)} variant="secondary">
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

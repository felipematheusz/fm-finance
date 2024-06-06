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
import { CategoriesArraySchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext } from "@/contexts";
import { PlusCircle, X } from "lucide-react";
import { register } from "../_actions/register";

type CategoriesFormProps = {
  setStep: (step: number) => void;
};

export const CategoriesForm = ({ setStep }: CategoriesFormProps) => {
  const { updateFormData, formData } = useFormContext()!;

  const form = useForm({
    resolver: zodResolver(CategoriesArraySchema),
    defaultValues: {
      categoriesData:
        formData?.categoriesData?.length > 0
          ? formData.categoriesData
          : [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "categoriesData",
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    updateFormData("categoriesData", data.categoriesData);

    await register({
      name: formData.registerData.name,
      email: formData.registerData.email,
      password: formData.registerData.password,
      categories: data.categoriesData,
      typeExpenses: formData.typeExpenseData,
      salary: formData.salaryData.salary,
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full md:w-[650px]">
        <CardHeader>
          <CardTitle className="text-2xl">Passo 4</CardTitle>
          <CardDescription>
            Adicione até 6 categorias para classificar seus gastos. Ex:
            Alimentação, Transporte, etc.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid gap-2">
              <Label htmlFor={`categoriesData.${index}.name`}>
                Nome da Categoria
              </Label>
              <div className="flex gap-2">
                <Input
                  {...form.register(`categoriesData.${index}.name`)}
                  type="text"
                  placeholder="Insira o nome da categoria"
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
          ))}
          {fields.length < 6 && (
            <Button
              className="w-max text-sm flex items-center gap-2"
              variant="ghost"
              type="button"
              onClick={() => append({ name: "" })}
            >
              <PlusCircle size={16} />
              Adicionar Categoria
            </Button>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-4">
          <Button type="button" onClick={() => setStep(3)} variant="secondary">
            Voltar
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "Calculando..."
              : "Finalizar Cadastro"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

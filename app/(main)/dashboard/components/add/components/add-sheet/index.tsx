"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useRef } from "react";

import {
  CategorySchema,
  ExpenseSchema,
  incomeSchema,
  TypeExpenseSchema,
} from "@/schemas";

import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIncome } from "@/app/(main)/dashboard/_actions/income";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createExpense } from "@/app/(main)/dashboard/_actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

type ExpenseSheetProps = {
  children?: React.ReactNode;
  categories: z.infer<typeof CategorySchema>[];
  typeExpenses: z.infer<typeof TypeExpenseSchema>[];
};

export function AddSheet({
  children,
  categories,
  typeExpenses,
}: ExpenseSheetProps) {
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const formIncome = useForm<z.infer<typeof incomeSchema>>({
    resolver: zodResolver(incomeSchema),
  });

  const formExpense = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
  });

  const onSubmitExpense = formExpense.handleSubmit(async (data) => {
    await createExpense({
      name: data.name,
      value: data.value,
      date: data.date,
      categoryId: data.categoryId,
      typeExpenseId: data.typeExpenseId,
    });
    router.refresh();

    ref.current?.click();

    formExpense.reset();

    toast({
      title: "Sucesso",
      description: "Seu gasto foi criado com sucesso.",
    });
  });

  const onSubmitIncome = formIncome.handleSubmit(async (data) => {
    await createIncome({
      name: data.name,
      value: data.value,
    });
    router.refresh();

    ref.current?.click();

    formIncome.reset();

    toast({
      title: "Sucesso",
      description: "Sua receita foi criada com sucesso.",
    });
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div ref={ref} onClick={() => console.log("Div clicado!")}>
          {children}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <Tabs>
            <TabsList className="mb-2">
              <TabsTrigger value="expense">Despesa</TabsTrigger>
              <TabsTrigger value="income">Receita</TabsTrigger>
            </TabsList>
            <TabsContent value="expense">
              <SheetTitle>Criar Despesa</SheetTitle>
              <SheetDescription className="mb-4">
                Adicione uma despesa aqui. Clique em salvar quando estiver
                pronto.
              </SheetDescription>
              <Form {...formExpense}>
                <form onSubmit={onSubmitExpense} className="space-y-4 h-screen">
                  <FormField
                    control={formExpense.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Insira o nome do gasto"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formExpense.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Insira o valor do gasto"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formExpense.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger aria-label="Categoria">
                              <SelectValue placeholder="Selecione a categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id || ""}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formExpense.control}
                    name="typeExpenseId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger aria-label="Tipo">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              {typeExpenses.map((typeExpense) => (
                                <SelectItem
                                  key={typeExpense.id}
                                  value={typeExpense.id || ""}
                                >
                                  {typeExpense.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formExpense.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-col gap-1 w-full">
                          <FormLabel>Data</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="secondary"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span>Selecione a data</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={(date: Date | undefined) => {
                                    if (date) {
                                      field.onChange(date);
                                    }
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <SheetFooter className="mt-auto">
                    <Button
                      disabled={formExpense.formState.isSubmitting}
                      type="submit"
                    >
                      {formExpense.formState.isSubmitting
                        ? "Salvando..."
                        : "Salvar"}
                    </Button>
                  </SheetFooter>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="income">
              <SheetTitle>Criar Receita</SheetTitle>
              <SheetDescription className="mb-4">
                Adicione uma receita aqui. Clique em salvar quando estiver
                pronto.
              </SheetDescription>
              <Form {...formIncome}>
                <form onSubmit={onSubmitIncome} className="space-y-4 h-screen">
                  <FormField
                    control={formIncome.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Insira o nome da receita"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formIncome.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Insira o valor da receita"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <SheetFooter className="mt-auto">
                    <Button
                      disabled={formIncome.formState.isSubmitting}
                      type="submit"
                    >
                      {formIncome.formState.isSubmitting
                        ? "Salvando..."
                        : "Salvar"}
                    </Button>
                  </SheetFooter>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

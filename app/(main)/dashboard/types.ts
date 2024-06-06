import { ReturnTypeWithoutPromise } from "@/types";
import { getTypeExpenses } from "./_actions";

export type TypeExpense = ReturnTypeWithoutPromise<typeof getTypeExpenses>[0]


import { ReturnTypeWithoutPromise } from "@/types";
import { getTypeExpenses } from "./_actions";
import { getTotalExpensesByCategory } from "./_actions/category";
import { getLastSixExpenses } from "./_actions/type-expense";

export type TypeExpense = ReturnTypeWithoutPromise<typeof getTypeExpenses>[0]

export type TotalExpensesByCategory = ReturnTypeWithoutPromise<typeof getTotalExpensesByCategory>[0]

export type LastSixExpenses = ReturnTypeWithoutPromise<typeof getLastSixExpenses>[0]




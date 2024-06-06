type RegisterData = {
  name: string;
  email: string;
  password: string;
}

type SalaryData = {
  salary: number;
}

type TypeExpenseData = {
  name: string;
  percentage: number;
}

type CategoriesData = {
  name: string;
}

type FormData = {
  registerData: RegisterData;
  salaryData: SalaryData;
  typeExpenseData: TypeExpenseData[];
  categoriesData: CategoriesData[];
}


export type { RegisterData, SalaryData, TypeExpenseData, FormData, CategoriesData };



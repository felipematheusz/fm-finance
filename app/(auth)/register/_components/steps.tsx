"use client";

import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { RegisterForm } from "./register-form";
import { TypeExpenseForm } from "./type-expense-form";
import { SalaryForm } from "./salary-form";
import { RegisterStepsProvider } from "@/contexts";
import { CategoriesForm } from "./categories-form";

export const Steps = () => {
  const [step, setStep] = useState(1);

  return (
    <RegisterStepsProvider>
      <div className="flex flex-col justify-center gap-4">
        <div className="flex items-center justify-center gap-4">
          <div
            className={`h-10 w-10 rounded-full ${
              step === 1 ? "bg-primary" : "bg-slate-400"
            } flex items-center justify-center`}
          >
            <p className="text-white text-xl font-bold">1</p>
          </div>
          <Separator className="w-10 bg-primary" />
          <div
            className={`h-10 w-10 rounded-full ${
              step === 2 ? "bg-primary" : "bg-slate-400"
            } flex items-center justify-center`}
          >
            <p className="text-white text-xl font-bold">2</p>
          </div>
          <Separator className="w-10 bg-primary" />
          <div
            className={`h-10 w-10 rounded-full ${
              step === 3 ? "bg-primary" : "bg-slate-400"
            } flex items-center justify-center`}
          >
            <p className="text-white text-xl font-bold">3</p>
          </div>
          <Separator className="w-10 bg-primary" />
          <div
            className={`h-10 w-10 rounded-full ${
              step === 4 ? "bg-primary" : "bg-slate-400"
            } flex items-center justify-center`}
          >
            <p className="text-white text-xl font-bold">4</p>
          </div>
        </div>
        {step === 1 && <RegisterForm setStep={setStep} />}
        {step === 2 && <SalaryForm setStep={setStep} />}
        {step === 3 && <TypeExpenseForm setStep={setStep} />}
        {step === 4 && <CategoriesForm setStep={setStep} />}
      </div>
    </RegisterStepsProvider>
  );
};

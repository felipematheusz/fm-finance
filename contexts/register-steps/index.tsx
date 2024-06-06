import { FormData } from "@/types";
import { createContext, useContext, useState, ReactNode } from "react";

interface FormContextType {
  formData: FormData;
  updateFormData: (step: keyof FormData, data: any) => void;
}

const FormContext = createContext<FormContextType | null>(null);

export const useFormContext = () => useContext(FormContext);

interface RegisterStepsProviderProps {
  children: ReactNode;
}

export const RegisterStepsProvider = ({
  children,
}: RegisterStepsProviderProps) => {
  const [formData, setFormData] = useState<FormData>({} as FormData);

  const updateFormData = (step: keyof FormData, data: any) => {
    setFormData((prev) => ({ ...prev, [step]: data }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

import { Separator } from "@/components/ui/separator";
import { RegisterForm } from "./_components";

export default function RegisterPage() {
  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex items-center justify-center gap-4">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
          <p className="text-white text-xl font-bold">1</p>
        </div>
        <Separator className="w-10 bg-primary" />
        <div className="h-10 w-10 rounded-full bg-slate-400 flex items-center justify-center">
          <p className="text-white text-xl font-bold">2</p>
        </div>
      </div>
      <RegisterForm />
    </div>
  );
}

import Image from "next/image";

export const NotFound = () => {
  return (
    <div className="h-full text-center  flex items-center justify-center flex-col font-medium gap-4">
      <Image
        src="/not-found.svg"
        alt="Nenhum dado encontrado"
        width={150}
        height={150}
      />
      <p className="text-sm text-primary">Nenhum dado encontrado</p>
    </div>
  );
};

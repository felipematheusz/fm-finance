import { Header } from "@/components/shared";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="p-4">{children}</div>
    </div>
  );
}

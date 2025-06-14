import { redirect } from "next/navigation";
import { Header } from "./_components/header";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }
  return (
    <>
      <Header />
      <main className="w-full max-w-7xl mx-auto">{children}</main>
    </>
  );
}

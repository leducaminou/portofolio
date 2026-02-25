import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar lang={lang} />
      <main className="flex-1 p-6 lg:p-10 overflow-auto">{children}</main>
    </div>
  );
}

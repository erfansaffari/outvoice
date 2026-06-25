import Nav from "@/components/Nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="max-w-2xl mx-auto px-4 py-6">{children}</main>
    </>
  );
}

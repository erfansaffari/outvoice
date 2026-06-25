import Nav from "@/components/Nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "24px 18px",
        }}
      >
        {children}
      </main>
    </>
  );
}

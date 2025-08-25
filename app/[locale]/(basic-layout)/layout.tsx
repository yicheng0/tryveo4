import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center bg-white dark:bg-bgMain text-gray-900 dark:text-textMain">{children}</main>
      <Footer />
    </>
  );
}

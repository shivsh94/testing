import Navbar from "@/components/Header/Navbar";


export default function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };  
}>) {
  return (
    <div className="min-h-screen bg-white shadow-xl relative flex flex-col w-full max-w-sm">
      <div>
        <Navbar slug={params.slug} />
      </div>
      <div className="flex flex-col flex-grow">{children}</div>
    </div>
  );
}

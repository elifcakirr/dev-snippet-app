import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/app/lib/utils";
import { Navbar } from "./components/layout/navbar";
import { Sidebar } from "./components/layout/sidebar";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <div className="h-screen flex flex-col overflow-hidden">

          {/* Navbar */}
          <div className="h-14 border-b shrink-0">
            <Navbar />
          </div>

          {/* Body */}
          <div className="flex flex-1 overflow-hidden">

            {/* Sidebar */}
            <div className="w-64 border-r flex flex-col overflow-hidden">
              <Sidebar />
            </div>

            {/* Content */}
            <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
              {children}
            </main>

          </div>

        </div>
      </body>
    </html>
  );
}
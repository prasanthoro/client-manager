// import { Home, IndianRupee, Users, Briefcase } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export const description =
//   "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

// const SideBar = ({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) => {
//   const pathname = usePathname();
//   return (
//     <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
//       <div className="hidden border-r bg-muted/40 md:block">
//         <div className="flex h-full max-h-screen flex-col gap-2">
//           <div className="flex-1">
//             <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
//               <Link
//                 className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
//               > ${pathname.includes("dashboard") ? "font-bold" : ""}`}
//                 href="/dashboard"
//               >
//                 <Home className="h-4 w-4" />
//                 Dashboard
//               </Link>
//               <div className="mt-4">
//                 <Link
//                   className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
//                     pathname.includes("clients") ? "font-bold" : ""
//                   }`}
//                   href="/clients"
//                 >
//                   Clients
//                 </Link>

//                 <Link
//                   className={`flex items-center gap-3 rounded-lg pl-6 px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
//                     pathname.includes("clients/addclient") ? "font-bold" : ""
//                   }`}
//                   href="/clients/addclient"
//                 >
//                   <Users className="h-4 w-4" />
//                   Add Client
//                 </Link>
//               </div>
//               <div className="mt-4">
//                 <Link
//                   className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
//                     pathname.includes("invoices") ? "font-bold" : ""
//                   }`}
//                   href="/invoices"
//                 >
//                   Invoices
//                 </Link>

//                 <Link
//                   className={`flex items-center gap-3 rounded-lg pl-6 px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
//                     pathname.includes("add-invoice") ? "font-bold" : ""
//                   }`}
//                   href="/add-invoice"
//                 >
//                   <IndianRupee className="h-4 w-4" />
//                   Add Invoice
//                 </Link>
//               </div>
//               <div className="mt-4">
//                 <Link
//                   className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
//                     pathname.includes("services") ? "font-bold" : ""
//                   }`}
//                   href="/services"
//                 >
//                   Services
//                 </Link>

//                 <Link
//                   className={`flex items-center gap-3 rounded-lg pl-6 px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
//                     pathname.includes("services/add-service") ? "font-bold" : ""
//                   }`}
//                   href="/services/add-service"
//                 >
//                   <Briefcase className="h-4 w-4" />
//                   Add Service
//                 </Link>
//               </div>
//             </nav>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col w-full overflow-x-auto">
//         <div>{children}</div>
//       </div>
//     </div>
//   );
// };
// export default SideBar;
import {
  Home,
  IndianRupee,
  Users,
  Briefcase,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

const SideBar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
      <div className="hidden border-r bg-blue-800 text-white md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-white ${
                  pathname.includes("dashboard") ? "font-bold" : ""
                }`}
                href="/dashboard"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-white ${
                  pathname.includes("clients") ? "font-bold" : ""
                }`}
                href="/clients"
              >
                <Users className="h-4 w-4" />
                Clients
              </Link>
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-white ${
                  pathname.includes("invoices") ? "font-bold" : ""
                }`}
                href="/invoices"
              >
                <IndianRupee className="h-4 w-4" />
                Invoices
              </Link>
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-white ${
                  pathname.includes("services") ? "font-bold" : ""
                }`}
                href="/services"
              >
                <Home className="h-4 w-4" />
                Services
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full overflow-x-auto bg-white">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default SideBar;

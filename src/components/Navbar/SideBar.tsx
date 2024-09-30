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
  const [isClientsOpen, setClientsOpen] = useState(false);
  const [isInvoicesOpen, setInvoicesOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);
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

              <div className="mt-4">
                <div
                  className="flex items-center justify-between cursor-pointer px-3 py-2"
                  onClick={() => setClientsOpen(!isClientsOpen)}
                >
                  <div
                    className={`flex items-center gap-3 ${
                      pathname.includes("clients") ? "font-bold" : ""
                    }`}
                  >
                    <Users className="h-4 w-4" />
                    <Link
                      className={`block rounded-lg px-3 py-2 transition-all hover:text-primary text-white ${
                        pathname.includes("clients") ? "font-bold" : ""
                      }`}
                      href="/clients"
                    >
                      Clients
                    </Link>
                  </div>
                  {isClientsOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>

                {isClientsOpen && (
                  <div className="pl-6 space-y-1">
                    <Link
                      className={`block rounded-lg px-3 py-2 transition-all hover:text-primary text-white ${
                        pathname.includes("clients/addclient")
                          ? "font-bold"
                          : ""
                      }`}
                      href="/clients/addclient"
                    >
                      Add Client
                    </Link>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <div
                  className="flex items-center justify-between cursor-pointer px-3 py-2"
                  onClick={() => setInvoicesOpen(!isInvoicesOpen)}
                >
                  <div
                    className={`flex items-center gap-3 ${
                      pathname.includes("invoices") ? "font-bold" : ""
                    }`}
                  >
                    <IndianRupee className="h-4 w-4" />
                    <Link
                      className={`block rounded-lg px-3 py-2 transition-all hover:text-primary text-white ${
                        pathname.includes("invoices") ? "font-bold" : ""
                      }`}
                      href="/invoices"
                    >
                      Invoices
                    </Link>
                  </div>
                  {isInvoicesOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>

                {isInvoicesOpen && (
                  <div className="pl-6 space-y-1">
                    <Link
                      className={`block rounded-lg px-3 py-2 transition-all hover:text-primary text-white ${
                        pathname.includes("add-invoice") ? "font-bold" : ""
                      }`}
                      href="/add-invoice"
                    >
                      Add Invoice
                    </Link>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <div
                  className="flex items-center justify-between cursor-pointer px-3 py-2"
                  onClick={() => setServicesOpen(!isServicesOpen)}
                >
                  <div
                    className={`flex items-center gap-3 ${
                      pathname.includes("services") ? "font-bold" : ""
                    }`}
                  >
                    <Briefcase className="h-4 w-4" />
                    <Link
                      className={`block rounded-lg px-3 py-2 transition-all hover:text-primary text-white ${
                        pathname.includes("services") ? "font-bold" : ""
                      }`}
                      href="/services"
                    >
                      Services
                    </Link>
                  </div>
                  {isServicesOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>

                {isServicesOpen && (
                  <div className="pl-6 space-y-1">
                    <Link
                      className={`block rounded-lg px-3 py-2 transition-all hover:text-primary text-white${
                        pathname.includes("services/add-service")
                          ? "font-bold"
                          : ""
                      }`}
                      href="/services/add-service"
                    >
                      Add Service
                    </Link>
                  </div>
                )}
              </div>
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
